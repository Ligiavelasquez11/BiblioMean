//Clientes
import express, { Router } from "express";
import customer from "../controllers/customer.js";
const router = express.Router();

//http://localhost:3002/api/customer/registerCustomer
router.post("/registerCustomer", customer.registerCustomer);
router.post("/login", customer.login);
router.get("/listCustomer", customer.listCustomer);
router.get("/findCustomer/:_id", customer.findCustomer);
router.put("/updateCustomer", customer.updateCustomer);
router.delete("/deleteCustomer/:_id", customer.deleteCustomer);

export default router;