import express from "express";
import reservationController from "../controller/reservation_controller.js";
import { verifyToken } from "../middleware/verify_token.js";

const reservations = express.Router();

reservations.get("/", reservationController.getAllReservations);
reservations.post("/", verifyToken, reservationController.addReservation);
reservations.get("/mine", verifyToken, reservationController.getMyReservations);

export default reservations;
