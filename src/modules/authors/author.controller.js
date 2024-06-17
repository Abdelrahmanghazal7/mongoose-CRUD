import authorModel from "../../../db/models/author.model.js";

// =========================================== GET AUTHORS ===========================================

export const getAuthors = async (req, res) => {
  const { page = 1, limit = 10, name, bio } = req.query;

  const query = {};
  if (name) query.name = new RegExp(name, "i");
  if (bio) query.bio = new RegExp(bio, "i");

  try {
    const authors = await authorModel
      .find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await authorModel.countDocuments(query);

    res.status(200).send({
      authors,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// =========================================== GET AUTHORS BY ID ===========================================

export const getAuthorById = async (req, res) => {
  const { id } = req.params;

  const data = await authorModel.findById({ _id: id }).populate("books");
  if (!data) {
    return res.json({ msg: "author not found" });
  }
  return res.json({ msg: "done", data });
};

// =========================================== ADD AUTHOR ===========================================

export const addAuthor = async (req, res) => {
  try {
    const { name, bio, birthDate, books } = req.body;

    const bookExist = await authorModel.findOne({ books });
    if (bookExist) {
      return res
        .status(400)
        .json({
          msg: "One or more of the books are already associated with an author",
        });
    }

    const data = await authorModel.create({ name, bio, birthDate, books });

    return res.status(201).json({ msg: "done", data });
  } catch (error) {
    return res.json(error);
  }
};

// =========================================== UPDATE AUTHOR ===========================================

export const updateAuthor = async (req, res) => {
  const { id } = req.params;

  const data = await authorModel.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!data) {
    return res.json({ msg: "author not found" });
  }

  return res.json({ msg: "done", data });
};

// =========================================== DELETE AUTHOR ===========================================

export const deleteAuthor = async (req, res) => {
  const { id } = req.params;

  const authorExist = await authorModel.findByIdAndDelete({ _id: id });
  if (!authorExist) {
    return res.json({ msg: "author not found" });
  }

  return res.status(200).json({ msg: "Deleted" });
};
