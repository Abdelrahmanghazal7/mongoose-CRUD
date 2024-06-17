import { Router } from "express";
import * as books from "./book.controller.js";

const router = Router();

router.get("/", books.getBooks);

router.get("/:id", books.getBookById);

router.post("/", books.addBook);

router.patch("/:id", books.updateBookById);

router.delete("/:id", books.deleteBook);

export default router;
