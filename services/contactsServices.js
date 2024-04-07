import { Contact } from "../db/models/Contact.js";



export const getAllContactsService = async (owner) => {
    const contacts = await Contact.find({owner})
    return contacts
}

export const addContact = async (payload, owner) => {
    const contact = await Contact.create({...payload, owner})
    return contact
}

export const deleteContactService = async (owner,_id) => {
    const deleteContact = await Contact.findOneAndDelete({_id, owner})
    return deleteContact
}