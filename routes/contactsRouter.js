import express from "express";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", createContact);

export default contactsRouter;
