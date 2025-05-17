import initModels from "../models/init-models.js";
import sequelize from "../config/sequelize.js";
import { QueryTypes } from "sequelize";

const tablesController = {
  getAllTables: async (req, res) => {
    const { status } = req.query;
    let qs = `
      SELECT t.*, ts.name as status_name FROM tables t
      JOIN table_status ts ON t.table_status_id = ts.table_status_id
    `;

    if (status) {
      qs += ` WHERE t.table_status_id = ${parseInt(status)}`;
    }

    try {
      const data = await sequelize.query(qs, {
        type: QueryTypes.SELECT,
      });

      res
        .status(200)
        .json({ message: "berhasil mendapatkan data tables", data });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  addTable: async (req, res) => {
    try {
      const { name, table_status_id } = req.body;
      await initModels(sequelize).tables.create({
        name,
        table_status_id,
      });

      res.status(201).json({ message: "berhasil menambahkan data tables" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  updateTable: async (req, res) => {
    const { id } = req.params;
    const { name, table_status_id } = req.body;

    try {
      await initModels(sequelize).tables.update(
        { name, table_status_id },
        { where: { table_id: id } }
      );

      res.status(200).json({ message: "berhasil mengupdate data tables" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  deleteTable: async (req, res) => {
    const { id } = req.params;

    try {
      await initModels(sequelize).tables.destroy({
        where: { table_id: id },
      });

      res.status(200).json({ message: "berhasil menghapus data tables" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  availableTable: async (req, res) => {
    const { date } = req.query;

    const qs = `
    WITH bookedTable AS (
      SELECT
        t.table_id,
        r.reservation_id
      FROM
        tables t
      LEFT JOIN
        reservations r ON r.table_id = t.table_id
      WHERE
        r.booked_at = '${date}'
    )
    SELECT
      t.table_id, t.name, 
      CASE 
        WHEN bt.reservation_id IS NULL THEN 1 
        ELSE 0 
      END AS status,
      CASE 
        WHEN bt.reservation_id IS NULL THEN 'available' 
        ELSE 'not available' 
      END AS status_name
    FROM
      tables t
    LEFT JOIN
      bookedTable bt ON bt.table_id = t.table_id
    WHERE t.table_status_id != 3
    `;

    try {
      // cek apakah ada data reservasi pada tanggal dan jam yang sama
      const data = await sequelize.query(qs, {
        type: QueryTypes.SELECT,
      });

      res
        .status(200)
        .json({ message: "berhasil mendapatkan data available-tables", data });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default tablesController;
