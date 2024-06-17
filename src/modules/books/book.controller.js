import bookModel from "../../../db/models/book.model.js";

// =========================================== GET BOOKS ===========================================

export const getBooks = async (req, res) => {
  const { page = 1, limit = 10, title, author } = req.query;

  const query = {};
  if (title) query.title = new RegExp(title, "i");
  if (author) query.author = new RegExp(author, "i");

  try {
    const books = await bookModel
      .find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await bookModel.countDocuments(query);

    res.status(200).send({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// =========================================== GET BOOK BY ID ===========================================

export const getBookById = async (req, res) => {
  const { id } = req.params;

  const data = await bookModel.findById({ _id: id });
  if (!data) {
    return res.json({ msg: "book not found" });
  }
  return res.json({ msg: "done", data });
};

// =========================================== ADD BOOK ===========================================

export const addBook = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const bookExist = await bookModel.findOne({ title });
    if (bookExist) {
      return res.status(400).json({ msg: "book already exist" });
    }

    const data = await bookModel.create({ title, content, author });

    return res.status(201).json({ msg: "done", data });
  } catch (error) {
    return res.json(error);
  }
};

// =========================================== UPDATE BOOK BY ID ===========================================

export const updateBookById = async (req, res) => {
  const { id } = req.params;

  const data = await bookModel.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!data) {
    return res.json({ msg: "book not found" });
  }
  return res.json({ msg: "done", data });
};

// =========================================== DELETE BOOK ===========================================

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  const data = await bookModel.findByIdAndDelete({ _id: id });
  if (!data) {
    return res.json({ msg: "book not found" });
  }
  return res.status(200).json({ msg: "Deleted" });
};
