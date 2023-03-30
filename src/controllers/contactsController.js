const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../models/contacts.js");
const { HTTPError } = require("../helpers");

const getAll = async (_, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
};

const getById = async ({ params }, res) => {
  const id = params.contactId;
  const contact = await getContactById(id);

  if (!contact) throw HTTPError(404, "Not found");

  res.status(200).json(contact);
};

const add = async (req, res) => {
  const body = req.body;

  const contact = await addContact(body);

  if (!contact)
    throw HTTPError(400, "A contact with such name already exists.");

  res.status(201).json(contact);
};

const update = async (req, res) => {
  const id = req.params.contactId;
  const body = req.body;

  const updatedContact = await updateContact(id, body);

  if (!updatedContact) throw HTTPError(404, "Not found");

  res.status(200).json(updatedContact);
};

const remove = async (req, res) => {
  const id = req.params.contactId;

  const result = await removeContact(id);

  if (!result) throw HTTPError(404, "Not found");

  res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
