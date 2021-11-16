import customer from "../models/customer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerCustomer = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const existingCustomer = await customer.findOne({ name: req.body.name });
  if (existingCustomer)
    return res.status(400).send({ message: "The Customer already exist" });

  const hash = await bcrypt.hash(req.body.password, 10);

  const customerName = await customer.findOne({ name: "user" });
  if (!customer)
    return res.status(400).send({ message: "No customer was assigned" });

  const customerRegister = new user({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    customerId: customerName,
  });

  const result = await customerRegister.save();
  return !result
    ? res.status(400).send({ message: "Failed to register customer" })
    : res.status(200).send({ result });
};

const listCustomer = async (req, res) => {
  const customerList = await customer.find();
  return customerList.length === 0
    ? res.status(400).send({ message: "Empty Customer list" })
    : res.status(200).send({ customerList });
};

const updateCustomer = async (req, res) => {
  if ((!req.body.name, !req.body.email, !req.body.roleId))
    return res.status(400).send({ message: "Incomplete data" });

  let pass = "";

  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10);
  } else {
    const customerFind = await user.findOne({ email: req.body.email });
    pass = customerFind.password;
  }

  const existingCustomer = await customer.findOne({
    name: req.body.name,
    email: req.body.email,
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
    ? res.status(400).send({ message: "Error editing user" })
    : res.status(200).send({ message: "User updated" });
};

const deleteCustomer = async (req, res) => {
  const customerDelete = await customer.findByIdAndDelete({
    _id: req.params["_id"],
  });
  return !customerDelete
    ? res.status(400).send("Customer no found")
    : res.status(200).send("Customer deleted");
};

// ejecución interna (cuando se hace login para saber que rol tiene el usuario)
const findCustomer = async (req, res) => {
  const customerId = await customer.findById({ _id: req.params["_id"] });
  return !customerId
    ? res.status(400).send("No search results")
    : res.status(200).send({ roleId });
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const customerLogin = await customer.findOne({ email: req.body.email });
  if (!customerLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  //El incripta y compara las contraseñas, el compara la contrasela nuestra bd
  const hash = await bcrypt.compare(req.body.password, userLogin.password);
  if (!hash)
    return res.status(400).send({ message: "Wrong email or password" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: userLogin._id,
          name: userLogin.name,
          role: userLogin.roleId,
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
  listCustomer,
  updateCustomer,
  deleteCustomer,
  findCustomer,
  login,
};
