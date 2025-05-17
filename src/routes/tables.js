import express from "express";
import tablesController from "../controller/tables_controller.js";
import { verifyIsSuperAdmin, verifyToken } from "../middleware/verify_token.js";

const tables = express.Router();

tables.get("/", verifyIsSuperAdmin, tablesController.getAllTables);
tables.post("/", verifyIsSuperAdmin, tablesController.addTable);
tables.put("/:id", verifyIsSuperAdmin, tablesController.updateTable);
tables.delete("/:id", verifyIsSuperAdmin, tablesController.deleteTable);
tables.get("/available-tables", verifyToken, tablesController.availableTable);

export default tables;
