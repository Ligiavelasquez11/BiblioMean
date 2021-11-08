import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,  //ningun momento muestre la url de conexión
      useUnifiedTopology: true, //evita que saque cosas innecesarias en el log
    });
    console.log("Connection with MongoDB: OK"); //conexión estable
  } catch (e) {
      console.log("Error connecting to Mongo DB: \n" + e); // no conexión
  }
};

export default { dbConnection };
