import express from "express";
import bookRouter from "./src/modules/books/book.routes.js";
import authorRouter from "./src/modules/authors/author.routes.js";
import connectionDB from "./db/connectionDB.js";

const app = express();
const port = 3000;

connectionDB();

app.use(express.json());

app.use("/books", bookRouter);
app.use("/authors", authorRouter);

app.get("/", (req, res) => res.send("Welcome to my project"));

app.use("*", (req, res) => res.status(404).send("404 page not found"));

app.listen(port, () => console.log(`app running on port ${port}`));
