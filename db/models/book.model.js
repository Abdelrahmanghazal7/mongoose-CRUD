import { Schema, model } from "mongoose";

const bookSchema = Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

const bookModel = model("book", bookSchema);

export default bookModel;
