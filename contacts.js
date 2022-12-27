const fs = require("node:fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.resolve(__dirname, "./db/contacts.json");
console.log(contactsPath);

async function readDb() {
  try {
    const dataRaw = await fs.readFile(contactsPath, { encoding: "utf8" });
    const data = JSON.parse(dataRaw);
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

async function listContacts() {
  try {
    const data = await readDb();
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await readDb();
    const contact = data.find(
      (contact) => contact.id === JSON.stringify(contactId)
    );
    console.log(contact);
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  const db = await readDb();
  const newDb = db.filter(
    (contact) => contact.id !== JSON.stringify(contactId)
  );
  await fs.writeFile(contactsPath, JSON.stringify(newDb));
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone };
  const db = await readDb();
  db.push(contact);

  fs.writeFile(contactsPath, JSON.stringify(db));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
