import initModels from "../models/init-models.js";
import sequelize from "../config/sequelize.js";
import { QueryTypes } from "sequelize";

const reservationController = {
  getAllReservations: async (req, res) => {
    const qs1 = `
        select r.*, t.name as table_name, u.username as user_name, rs.name as reservation_status 
        from reservations r
        join tables t on r.table_id = t.table_id
        join users u on r.user_id = u.user_id
        join reservation_status rs on r.reservation_status_id = rs.reservation_status_id 
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
};

export default reservationController;
