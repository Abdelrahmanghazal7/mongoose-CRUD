import { Schema, model } from "mongoose";

const authorSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  bio: String,
  birthDate: Date,

  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "book",
    },
  ],
});

const authorModel = model("author", authorSchema);

export default authorModel;
