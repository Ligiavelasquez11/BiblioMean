import customer from "../models/customer.js";
import role from "../models/role.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerCustomer = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const existingCustomer = await customer.findOne({ email: req.body.email });
  if (existingCustomer)
    return res.status(400).send({ message: "The customer is already registered" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const admin = await role.findOne({ name: "customer" });
  if (!role) return res.status(400).send({ message: "No role was assigned" });

  const customerRegister = new customer({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    roleId: admin,
    dbStatus: true,
  });

  const result = await customerRegister.save();

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          roleId: result.roleId,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "Login error" });
  }
};

const registerAdminCustomer = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId
  )
    return res.status(400).send({ message: "Incomplete data" });

  const existingCustomer = await customer.findOne({ email: req.body.email });
  if (existingCustomer)
    return res.status(400).send({ message: "The customer is already registered" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const customerRegister = new customer({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    roleId: req.body.roleId,
    dbStatus: true,
  });

  const result = await customerRegister.save();
  return !result
    ? res.status(400).send({ message: "Failed to register customer" })
    : res.status(200).send({ result });
};

const listCustomer = async (req, res) => {
  const customerList = await customer.find();
  return customerList.length === 0
    ? res.status(400).send({ message: "Empty customer list" })
    : res.status(200).send({ customerList });
};

const findCustomer = async (req, res) => {
  const customerfind = await customer.findById({ _id: req.params["_id"] });
  return !customerfind
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ customerfind });
};

const updateCustomer = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.roleId)
    return res.status(400).send({ message: "Incomplete data" });

  const changeEmail = await customer.findById({ _id: req.body._id });
  if (req.body.email !== changeEmail.email)
    return res
      .status(400)
      .send({ message: "The email should never be changed" });

  let pass = "";

  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10);
  } else {
    const customerFind = await customer.findOne({ email: req.body.email });
    pass = customerFind.password;
  }

  const existingCustomer = await customer.findOne({
    name: req.body.name,
    email: req.body.email,
    password: pass,
    roleId: req.body.roleId,
  });
  if (existingCustomer)
    return res.status(400).send({ message: "you didn't make any changes" });

  const customerUpdate = await customer.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: pass,
    roleId: req.body.roleId,
  });

  return !customerUpdate
    ? res.status(400).send({ message: "Error editing customer" })
    : res.status(200).send({ message: "customer updated" });
};

const deleteCustomer = async (req, res) => {
  const customerDelete = await customer.findByIdAndDelete({ _id: req.params["_id"] });
  return !customerDelete
    ? res.status(400).send({ message: "Customer no found" })
    : res.status(200).send({ message: "Customer deleted" });
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const customerLogin = await customer.findOne({ email: req.body.email });
  if (!customerLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  const hash = await bcrypt.compare(req.body.password, customerLogin.password);
  if (!hash)
    return res.status(400).send({ message: "Wrong email or password" });

  //return !userLogin
  // ? res.status(400).send({ message: "User no found" })
  // : res.status(200).send({ userLogin });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: customerLogin._id,
          name: customerLogin.name,
          roleId: customerLogin.roleId,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "Login error" });
  }
};

export default {
  registerCustomer,
  registerAdminCustomer,
  listCustomer,
  findCustomer,
  updateCustomer,
  deleteCustomer,
  login,
};
