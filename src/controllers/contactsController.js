const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../models/contacts.js");
const { HTTPError } = require("../helpers");

const getAll = async (_, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getById = async ({ params }, res, next) => {
  try {
    const id = params.contactId;
    const contact = await getContactById(id);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const body = req.body;

    const contact = await addContact(body);

    if (!contact)
      throw HTTPError(400, "A contact with such name already exists.");

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;

    const updatedContact = await updateContact(id, body);

    if (!updatedContact) throw HTTPError(404, "Not found");

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const result = await removeContact(id);

    if (!result) throw HTTPError(404, "Not found");

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
