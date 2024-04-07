import express from "express";
import { getAllContacts, deleteContact, createContact } from "../controllers/contactsControllers.js";
import {validToken} from "../middlewares/isValidToken.js"
import { isValidId } from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", validToken, getAllContacts);

contactsRouter.delete("/:id", isValidId ,validToken , deleteContact);

contactsRouter.post("/", validToken,createContact);

export default contactsRouter;
