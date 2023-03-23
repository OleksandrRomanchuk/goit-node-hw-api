const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../models/contacts.js");

const getAll = async (_, res) => {
  try {
    const contacts = await listContacts();

    res.status(200).json(contacts);
  } catch (error) {
    console.log("error: ", error.message);
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
    console.log("error: ", error.message);
  }
};

const add = async (req, res, next) => {
  try {
    const body = req.body;

    const contact = await addContact(body);

    if (!contact)
      return res
        .status(400)
        .json({ message: "A contact with such name already exists." });

    res.status(201).json(contact);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;

    if (!Object.keys(body).length)
      return res.status(400).json({ message: "missing fields" });

    const updatedContact = await updateContact(id, body);

    if (!updatedContact) return res.status(404).json({ message: "Not found" });

    res.status(200).json(updatedContact);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const result = await removeContact(id);

    if (!result) return res.status(404).json({ message: "Not found" });

    res.status(200).json(result);
  } catch (error) {
    console.log("error: ", error.message);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
