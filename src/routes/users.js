import express from "express";
import usersController from "../controller/users_controller.js";

const users = express.Router();

users.get("/", usersController.getAllUsers);
users.post("/registration", usersController.userRegistration);
users.post("/login", usersController.userLogin);

export default users;
