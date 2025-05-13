import express from "express";
import users from "./users.js";
import tables from "./tables.js";
import reservations from "./reservations.js";

const routes = express.Router();

routes.use("/users", users);
routes.use("/tables", tables);
routes.use("/reservations", reservations);

export default routes;
