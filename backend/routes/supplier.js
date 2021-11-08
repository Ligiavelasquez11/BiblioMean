//Proveedores
import express from "express";
import supplier from "../controllers/supplier.js";
const router = express.Router()

//http://localhost:3002/api/supplier/registerSupplier
router.post("/registerSupplier", supplier.registerSupplier);
router.get("/listSupplier", supplier.listSupplier);

export default router