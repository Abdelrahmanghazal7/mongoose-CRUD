import { Router } from "express";
import * as authors from "./author.controller.js";

const router = Router();

router.get("/", authors.getAuthors);

router.get("/:id", authors.getAuthorById);

router.post("/", authors.addAuthor);

router.patch("/:id", authors.updateAuthor);

router.delete("/:id", authors.deleteAuthor);

export default router;
