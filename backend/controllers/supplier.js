import supplier from "../models/supplier.js";

const registerSupplier = async (req, res) => {
  if (!req.body.name || !req.body.address)
  return res.status(400).send("Incomplete data");

  const existingSupplier = await supplier.findOne({ name: req.body.name });
  if (existingSupplier) return res.status(400).send("The Supplier already exist");

  const supplierSchema = new supplier({
    name: req.body.name,
    address: req.body.address,
  });

  const result = await supplierSchema.save();
  if (!result) return res.status(400).send("Failed to register Supplier");

  return res.status(200).send({ result });
};

const listSupplier = async (req, res) => {
  const supplierSchema = await supplier.find();
  if(!supplierSchema || supplierSchema.length == 0) return res.status(400). send("Empty Supplier list");
  return res.status(200).send({supplierSchema})
}

export default {
    registerSupplier, listSupplier
}