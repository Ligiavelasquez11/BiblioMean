//Clientes
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import moment from "moment";

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roleId: { type: mongoose.Schema.ObjectId, ref: "customer" },
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

customerSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      roleId: this.roleId,
      iat: moment().unix(),
    },
    process.env.SK_JWT
  );
};


const customer = mongoose.model("customer", customerSchema);

export default customer