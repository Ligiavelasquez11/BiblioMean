import express from "express";
import customer from "../controllers/customer.js";
const router = express.Router();

router.post("/registerCustomer", customer.registerCustomer);
router.post("/registerAdminCustomer", customer.registerAdminCustomer);
router.post("/login", customer.login);
router.get("/listCustomer", customer.listCustomer);
router.get("/findCustomer/:_id", customer.findCustomer);
router.put("/updateCustomer", customer.updateCustomer);
router.delete("/deleteCustomer/:_id", customer.deleteCustomer);

export default router;