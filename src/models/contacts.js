const Contacts = require("./schemas.js");

const getAllContacts = () => Contacts.find();

const getContactById = (contactId) => Contacts.findById(contactId);

const addContact = (contact) => Contacts.create(contact);

const updateContact = (contactId, body) =>
  Contacts.findByIdAndUpdate(contactId, body, { returnDocument: "after" });

const deleteContact = (contactId) => Contacts.findByIdAndDelete(contactId);

const updateStatusContact = (contactId, body) =>
  Contacts.findByIdAndUpdate(contactId, body, { returnDocument: "after" });

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
  updateStatusContact,
};
