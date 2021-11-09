import book from "../models/book.js";

const registerBook = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.author ||
    !req.body.yearPublication ||
    !req.body.pages ||
    !req.body.gender ||
    !req.body.price
  )
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
  if (!bookSchema || bookSchema.length == 0)
    return res.status(400).send("Empty Books list");
  return res.status(200).send({ bookSchema });
};

const updateBook = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.author ||
    !req.body.yearPublication ||
    !req.body.pages ||
    !req.body.gender ||
    !req.body.price
  )
    return res.status(400).send("Incomplete data");

  const existingBook = await book.findOne({
    name: req.body.name,
    author: req.body.author,
    yearPublication: req.body.yearPublication,
    pages: req.body.pages,
    gender: req.body.gender,
    price: req.body.price,
  });
  if (existingBook) return res.status(400).send("The book already exist");

  const bookUpdate = await book.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    author: req.body.author,
    yearPublication: req.body.yearPublication,
    pages: req.body.pages,
    gender: req.body.gender,
    price: req.body.price,
  });

  return !bookUpdate
    ? res.status(400).send("Error editing book")
    : res.status(200).send({ bookUpdate });
};

const deleteBook = async (req, res) => {
  const bookDelete = await book.findByIdAndDelete({ _id: req.params["_id"] });
  return !bookDelete
    ? res.status(400).send("Book no found")
    : res.status(200).send("Book deleted");
};

// ejecución interna (cuando se hace login para saber que rol tiene el usuario)
const findBook = async (req, res) => {
  const bookId = await book.findById({ _id: req.params["_id"] });
  return !bookId
    ? res.status(400).send("No search results")
    : res.status(200).send({ roleId });
};

export default {
  registerBook,
  listBook,
  updateBook,
  deleteBook,
  findBook,
};
