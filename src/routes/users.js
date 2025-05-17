import express from "express";
import usersController from "../controller/users_controller.js";
import { verifyIsSuperAdmin } from "../middleware/verify_token.js";

const users = express.Router();

users.get("/", verifyIsSuperAdmin, usersController.getAllUsers);
users.post("/registration", usersController.userRegistration);
users.post("/login", usersController.userLogin);

export default users;
