import express from "express";
import tablesController from "../controller/tables_controller.js";
import { verifyToken } from "../middleware/verify_token.js";

const tables = express.Router();

tables.get("/", tablesController.getAllTables);
tables.post("/", tablesController.addTable);
tables.get("/available-tables", verifyToken, tablesController.availableTable);

export default tables;
