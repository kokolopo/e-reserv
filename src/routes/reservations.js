import express from "express";
import reservationController from "../controller/reservation_controller.js";
import { verifyIsSuperAdmin, verifyToken } from "../middleware/verify_token.js";

const reservations = express.Router();

reservations.get(
  "/",
  verifyIsSuperAdmin,
  reservationController.getAllReservations
);
reservations.post("/", verifyToken, reservationController.addReservation);
reservations.get("/mine", verifyToken, reservationController.getMyReservations);
reservations.post("/check-in", verifyToken, reservationController.checkInTable);

export default reservations;
