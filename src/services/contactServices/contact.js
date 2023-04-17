const Contact = require("./contactSchemas.js");

const getAllContacts = (filter, params) =>
  Contact.find(filter, "-owner", params);

const getContactById = (contactId) => Contact.findById(contactId);

const addContact = (contact) => Contact.create(contact);

const updateContact = (contactId, body) =>
  Contact.findByIdAndUpdate(contactId, body, { returnDocument: "after" });

const deleteContact = (contactId) => Contact.findByIdAndDelete(contactId);

const updateStatusContact = (contactId, body) =>
  Contact.findByIdAndUpdate(contactId, body, { returnDocument: "after" });

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
  updateStatusContact,
};
