import HttpError from "../helpers/HttpError.js";
import { getAllContactsService, addContact, deleteContactService } from "../services/contactsServices.js";


export const getAllContacts = async (req, res) => {
    const {_id} = req.user
    const contactUser = await getAllContactsService(_id)

    res.json(contactUser)

};

export const deleteContact = async (req, res, next) => {
try {
    const {_id} = req.user
    const {id} = req.params
    const removeContact = await deleteContactService(_id, id)
    if(!id){
        throw HttpError(404, "Contact not found")
    }
    res.status(200).json(removeContact)
} catch (error) {
    next(error)
}
};

export const createContact = async (req, res) => {
    const contact = req.body
    const {_id} = req.user
    const newContact = await addContact(contact, _id)

    res.status(201).json(newContact)
};

