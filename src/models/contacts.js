const { readFile, writeFile } = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contacts = await readFile(contactsPath, "utf-8");

    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);

    return contacts[index] || null;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const isContact = Boolean(
      contacts.find((contact) => contact.name === body.name)
    );

    if (isContact) return null;

    const contact = { id: uuidv4(), ...body };

    contacts.push(contact);

    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    console.log("index: ", index);

    if (index === -1) return null;

    contacts[index] = { ...contacts[index], ...body };

    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return contacts[index];
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactToDelete = contacts.find(({ id }) => id === contactId);

    if (!contactToDelete) return null;

    const newContacts = contacts.filter((contact) => contact.id !== contactId);

    await writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

    return { message: "contact deleted" };
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
