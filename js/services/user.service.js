import { utilService } from './util.service.js';
import { storageService } from './storage.service.js';

export const userService = {
  query,
  getUserById,
};
const USER_KEY = 'userDB';
let gUsers = [];
_createUsers();

function query() {
  return Promise.resolve(gUsers);
}

function _createUsers() {
  let users = storageService.loadFromStorage(USER_KEY);
  if (!users || !users.length) {
    users = [];
    users.push(
      _createUser('On Chetrit', 'onchetrit@gmail.com', [
        _createMail('Welcome', 'Enjoy from our features'),
      ])
    );
    users.push(
      _createUser('Adir Cohen', 'adircohen@gmail.com', [
        _createMail('Welcome', 'Enjoy from our features'),
      ])
    );
  }
  gUsers = users;
  storageService.saveToStorage(USER_KEY, gUsers);
}

function _createUser(username, emailAddress, mails) {
  return {
    id: utilService.makeId(),
    username,
    emailAddress,
    mails,
    notes: [],
  };
}

function _createMail(subject, body) {
  return {
    id: utilService.makeId(),
    subject,
    body,
    isRead: false,
    sentAt: Date.now(),
  };
}

function _createNote() {
  return {
    id: utilService.makeId(),
    type,
    isPinned: true,
    info: {
      txt,
    },
  };
}

function getUserById(userId) {
  const user = gUsers.find((user) => {
    return userId === user.id;
  });
  return Promise.resolve(user);
}
