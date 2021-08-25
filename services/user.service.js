import { utilService } from './util.service.js';
import { storageService } from './storage.service.js';

export const userService = {
  query,
  getUserById,
  setStar
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
        _createMail('Our Mail','Welcome', 'Enjoy from our Animals'),
        _createMail('Adir Cohen','Shalom', 'hey how are you'),
        _createMail('Ebay','Hey!', 'You want buy it?'),
        _createMail('Adir Cohen','AHIII', 'Holeh lihyot tirof'),
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
    bgc: utilService.getRandomColor(),
    notes: [],
  };
}

function _createMail(from,subject, body) {
  return {
    id: utilService.makeId(),
    from,
    subject,
    body,
    isRead: false,
    isStared:false,
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
function getMailIdxById(userMails,mailId) {
  const mailIdx = userMails.findIndex((mail) => {
    return mailId === mail.id;
  });
  return mailIdx
}

function setStar(userId, mailId) {
  console.log('mailId',mailId);
  getUserById(userId)
    .then(user => {
      const mailIdx = getMailIdxById(user.mails, mailId)
      user.mails[mailIdx].isStared = !user.mails[mailIdx].isStared;
    })
    console.log(gUsers);
  storageService.saveToStorage(USER_KEY,gUsers)
}
