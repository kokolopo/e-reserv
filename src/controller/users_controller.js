import initModels from "../models/init-models.js";
import sequelize from "../config/sequelize.js";
import { hashPassword, comparePassword } from "../utility/gen_password.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { log } from "console";
import { get } from "http";
import getTanggalJakartaFormatted from "../utility/get_date_now.js";

dotenv.config();

const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const data = await initModels(sequelize).users.findAll();

      res.status(200).json({ message: "berhasil mendapatkan data user", data });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  userRegistration: async (req, res) => {
    console.log(req.body);
    try {
      const password = await hashPassword(req.body.password);

      await initModels(sequelize).users.create({
        email: req.body.email,
        whatsapp: req.body.whatsapp,
        password: password,
        role_id: 2,
      });

      res.status(200).json({ message: "berhasil registrasi user" });
    } catch (error) {
      console.log(error);

      if (error.errors[0].message !== null) {
        res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ error });
    }
  },

  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await initModels(sequelize).users.findOne({
        where: { email },
        include: [
          {
            model: initModels(sequelize).roles,
            as: "role",
          },
        ],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // create jwt token
      const { user_id, role_id, whatsapp } = user;
      const accessToken = jwt.sign(
        { user_id, email, role_id, whatsapp },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      // cek booked today
      const dateToday = getTanggalJakartaFormatted();

      const bookedToday = await sequelize.query(
        `SELECT * FROM reservations WHERE user_id = ${user.user_id} AND booked_at = '${dateToday}' and reservation_status_id = 1`,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );

      const data = {
        email: user.email,
        whatsapp: user.whatsapp,
        role: user.role.name,
        access_token: accessToken,
        booked_today: bookedToday,
      };

      res.status(200).json({ message: "Login successful", data });
    } catch (error) {
      log(error);
      res.status(500).json({ error });
    }
  },
};

export default usersController;
