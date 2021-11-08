import book from "../models/book.js";

const registerBook = async (req, res) => {
  if (!req.body.name || !req.body.author || !req.body.yearPublication || !req.body.pages || !req.body.gender || !req.body.price)
  return res.status(400).send("Incomplete data");

  const existingBook = await book.findOne({ name: req.body.name });
  if (existingBook) return res.status(400).send("The Books already exist");

  const bookSchema = new book({
    name: req.body.name,
    author: req.body.author,
    yearPublication: req.body.yearPublication,
    pages: req.body.pages,
    gender: req.body.gender,
    price: req.body.price,
  });

  const result = await bookSchema.save();
  if (!result) return res.status(400).send("Failed to register Books");

  return res.status(200).send({ result });
};

const listBook = async (req, res) => {
  const bookSchema = await book.find();
  if(!bookSchema || bookSchema.length == 0) return res.status(400). send("Empty Books list");
  return res.status(200).send({bookSchema})
}
//el .length me da la oportunidad de sacar los items
export default {
    registerBook, listBook
}