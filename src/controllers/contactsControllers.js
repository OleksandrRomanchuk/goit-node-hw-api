const {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} = require("../services/contactServices/contact");
const { HTTPError, asyncControlersWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const paginationParams = { skip, limit };

  const filter = !favorite ? { owner } : { owner, favorite };

  const contacts = await getAllContacts(filter, paginationParams);

  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) throw HTTPError(404, "Not found");

  res.status(200).json(contact);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = await addContact({ ...req.body, owner });

  res.status(201).json(contact);
};

const update = async (req, res) => {
  const id = req.params.contactId;

  const updatedContact = await updateContact(id, req.body);

  if (!updatedContact) throw HTTPError(404, "Not found");

  res.status(200).json(updatedContact);
};

const remove = async (req, res) => {
  const id = req.params.contactId;

  const result = await deleteContact(id);

  if (!result) throw HTTPError(404, "Not found");

  res.status(200).json({ message: "Contact deleted." });
};

const updateStatus = async (req, res) => {
  const id = req.params.contactId;

  const updatedContact = await updateContact(id, req.body);

  if (!updatedContact) throw HTTPError(404, "Not found");

  res.status(200).json(updatedContact);
};

module.exports = {
  getAll: asyncControlersWrapper(getAll),
  getById: asyncControlersWrapper(getById),
  add: asyncControlersWrapper(add),
  update: asyncControlersWrapper(update),
  remove: asyncControlersWrapper(remove),
  updateStatus: asyncControlersWrapper(updateStatus),
};
