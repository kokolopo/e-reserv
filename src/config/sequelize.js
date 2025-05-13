import dotenv from "dotenv";
import { readFileSync } from "fs"; // Mengimpor readFileSync dari fs
dotenv.config();

import Sequelize from "sequelize";

// Membuat koneksi ke TiDB
const sequelize = new Sequelize({
  dialect: "mysql",
  host:
    process.env.TIDB_HOST || "gateway01.ap-southeast-1.prod.aws.tidbcloud.com", // TiDB host
  port: Number(process.env.TIDB_PORT) || 4000, // TiDB port, default: 4000
  username: process.env.TIDB_USER || "bS59pmRZg1KfLtr.root", // TiDB user
  password: process.env.TIDB_PASSWORD || "05A0uwahHQT25hDL", // TiDB password
  database: process.env.TIDB_DB_NAME || "e-reserv", // TiDB database name, default: test
  dialectOptions: {
    ssl: {
      minVersion: "TLSv1.2", // Versi minimum SSL
      rejectUnauthorized: true, // Menolak koneksi dengan sertifikat yang tidak sah
      ca: process.env.TIDB_CA_PATH // Path ke file CA
        ? readFileSync("./isrgrootx1.pem") // Membaca file CA jika path tersedia
        : undefined,
    },
    // Tidak menggunakan SSL jika tidak diaktifkan
  },
});

// Fungsi untuk memeriksa koneksi
const checkConnection = async () => {
  try {
    // Mengecek koneksi ke database
    await sequelize.authenticate();
    console.log("Koneksi ke database berhasil!");
  } catch (error) {
    console.error("Tidak dapat terhubung ke database:", error);
  }
};

// Panggil fungsi untuk memeriksa koneksi
checkConnection();

export default sequelize;
