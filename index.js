import express from "express";
import bodyParser from "body-parser";
import router from "./src/routes/index.js";
import cron from "node-cron";
import {
  getJamJakarta,
  getTanggalJakartaFormatted,
} from "./src/utility/get_date_now.js";
import initModels from "./src/models/init-models.js";
import sequelize from "./src/config/sequelize.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use(router);

cron.schedule("* * * * *", async () => {
  console.log("Cek reservasi expire...");

  const now = getJamJakarta();
  const dateToday = getTanggalJakartaFormatted();

  const bookedToday = await sequelize.query(
    `SELECT * FROM reservations WHERE booked_at = '${dateToday}' and reservation_status_id = 1`,
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );

  for (const data of bookedToday) {
    if (data.booked_time < now) {
      await sequelize.query(
        `UPDATE reservations SET reservation_status_id = 3 WHERE reservation_id = ${data.reservation_id}`
      );
    }
  }

  console.log(`${now} transaksi diupdate.`);
});

app.listen(port, () => console.log(`run and serve on port : ${port}`));
