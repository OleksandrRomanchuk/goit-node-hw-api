const {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} = require("../db/contactsModel/contacts");
const { HTTPError } = require("../helpers");
const mongoose = require("mongoose");

const getAll = async (_, res) => {
  const contacts = await getAllContacts();

  res.status(200).json(contacts);
};

const getById = async ({ params }, res, _) => {
  const id = params.contactId;

  if (!mongoose.isValidObjectId(id)) throw HTTPError(404, "Not found");

  const contact = await getContactById(id);

  if (!contact) throw HTTPError(404, "Not found");

  res.status(200).json(contact);
};

const add = async (req, res, _) => {
  const body = req.body;

  const contact = await addContact(body);

  res.status(201).json(contact);
};

const update = async (req, res, _) => {
  const id = req.params.contactId;
  const body = req.body;

  if (!mongoose.isValidObjectId(id)) throw HTTPError(404, "Not found");

  const updatedContact = await updateContact(id, body);

  if (!updatedContact) throw HTTPError(404, "Not found");

  res.status(200).json(updatedContact);
};

const remove = async (req, res, _) => {
  const id = req.params.contactId;

  if (!mongoose.isValidObjectId(id)) throw HTTPError(404, "Not found");

  const result = await deleteContact(id);

  if (!result) throw HTTPError(404, "Not found");

  res.status(200).json({ message: "Contact deleted." });
};

const updateStatus = async (req, res) => {
  const id = req.params.contactId;
  const { favorite } = req.body;

  if (!mongoose.isValidObjectId(id)) throw HTTPError(404, "Not found");

  const updatedContact = await updateContact(id, { favorite });

  if (!updatedContact) throw HTTPError(404, "Not found");

  res.status(200).json(updatedContact);
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
  updateStatus,
};
