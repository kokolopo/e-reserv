import initModels from "../models/init-models.js";
import sequelize from "../config/sequelize.js";
import { QueryTypes } from "sequelize";

const reservationController = {
  getAllReservations: async (req, res) => {
    const { status } = req.query;

    let qs1 = `
        select r.*, t.name as table_name, u.email as user_email, rs.name as reservation_status 
        from reservations r
        join tables t on r.table_id = t.table_id
        join users u on r.user_id = u.user_id
        join reservation_status rs on r.reservation_status_id = rs.reservation_status_id 
    `;

    if (status) {
      qs1 += ` where r.reservation_status_id = ${parseInt(status)}`;
    }

    try {
      const data = await sequelize.query(qs1, {
        type: QueryTypes.SELECT,
      });

      res
        .status(200)
        .json({ message: "berhasil mendapatkan data reservations", data });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  addReservation: async (req, res) => {
    try {
      const { table_id, booked_at, booked_time, fullname, whatsapp, people } =
        req.body;
      const user_id = req.user_id;
      await initModels(sequelize).reservations.create({
        user_id,
        table_id,
        booked_at,
        booked_time,
        fullname,
        whatsapp,
        people,
      });

      res.status(201).json({
        message: "berhasil menambahkan data reservations",
        data: req.body,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getMyReservations: async (req, res) => {
    const user_id = req.user_id;
    const qs1 = `
        SELECT
          r.reservation_id, r.fullname, r.whatsapp, r.people, r.booked_at, r.booked_time, r.table_id,
          t.name as table_name, rs.reservation_status_id, rs.name as reservation_status
        FROM
          reservations r
        LEFT JOIN
          reservation_status rs on r.reservation_status_id = rs.reservation_status_id
        LEFT JOIN
          tables t on r.table_id = t.table_id
        WHERE
          r.user_id = ${user_id}
    `;
    try {
      const data = await sequelize.query(qs1, {
        type: QueryTypes.SELECT,
      });

      res
        .status(200)
        .json({ message: "berhasil mendapatkan data reservations", data });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  checkInTable: async (req, res) => {
    const { table_id, reservation_id } = req.body;

    try {
      const data = await sequelize.query(
        `SELECT * FROM reservations r WHERE r.reservation_id = ${reservation_id} AND r.table_id = ${table_id} AND r.reservation_status_id = 1`
      );
      if (!data[0].length) {
        return res.status(400).json({ message: "reservation not found" });
      }
      await sequelize.query(
        `UPDATE reservations SET reservation_status_id = 2 WHERE reservation_id = ${reservation_id}`
      );
      res
        .status(200)
        .json({ message: "berhasil check in table", data: data[0] });
    } catch (error) {
      console.log(error);

      res.status(500).json({ error });
    }
  },
};

export default reservationController;
