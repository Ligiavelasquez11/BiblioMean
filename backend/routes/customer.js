//Clientes
import express, { Router } from "express";
import customer from "../controllers/customer.js";
const router = express.Router()

//http://localhost:3002/api/customer/registerCustomer
router.post("/registerCustomer", customer.registerCustomer);
router.get("/listCustomer", customer.listCustomer);

export default router