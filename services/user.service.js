import { utilService } from './util.service.js';
import { storageService } from './storage.service.js';

export const userService = {
  query,
  getUserById,
  addUser,
  findUserByMail,
  queryMails,
  setStar,
  setSpam,
  getEmailTimeSent,
  removeMail,
  queryMails,
  composeMail,
};

const gMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const gNotes = [
  {
    id: utilService.makeId(),
    type: 'txt',
    isPinned: true,
    info: {
      title: 'Title of text',
      txt: 'txt txt txt txt!',
    },
  },
  {
    id: utilService.makeId(),
    type: 'img',
    isPinned: false,
    info: {
      title: 'Image title',
      txt: 'image description',
      url: 'https://picsum.photos/200/200',
    },
    style: {
      backgroundColor: '#00d',
    },
  },
  {
    id: utilService.makeId(),
    type: 'todo',
    isPinned: false,
    info: {
      title: 'To Do List',
      todos: [
        { id: utilService.makeId(), txt: ' - Driving liscence', doneAt: null },
        { id: utilService.makeId(), txt: ' - Coding power', doneAt: 187111111 },
      ],
    },
  },
];
const USER_KEY = 'userDB';
let gUsers = [];
_createUsers();

function query() {
  return Promise.resolve(gUsers);
}

function queryMails(user, searchBy, filterBy) {
  if (filterBy) {
    if (filterBy === 'stars') {
      const mailsAfterFilter = filterByStars(user.mails);
      return Promise.resolve(mailsAfterFilter);
    }
    if (filterBy === 'spam') {
      const mailsAfterFilter = user.spam;
      return Promise.resolve(mailsAfterFilter);
    }
    if (filterBy === 'inbox') {
      return Promise.resolve(user.mails);
    }
    if (filterBy === 'sent') {
      return Promise.resolve(user.sentEmails);
    }
  }
  if (searchBy) {
    const mailToShow = user.mails.filter(
      (mail) =>
        mail.from.toLowerCase().includes(searchBy) ||
        mail.subject.toLowerCase().includes(searchBy) ||
        mail.body.toLowerCase().includes(searchBy) ||
        mail.fromMail.toLowerCase().includes(searchBy)
    );
    return Promise.resolve(mailToShow);
  }
  return Promise.resolve(user.mails);
}

function _createUsers() {
  let users = storageService.loadFromStorage(USER_KEY);
  if (!users || !users.length) {
    users = [];
    users.push(_createUser('On Chetrit', 'onchetrit@gmail.com'));
    users.push(_createUser('Adir Cohen', 'adircohen@gmail.com'));
  }
  gUsers = users;
  storageService.saveToStorage(USER_KEY, gUsers);
}

function _createUser(username, emailAddress) {
  return {
    id: utilService.makeId(),
    username,
    emailAddress,
    mails: [
      _createMail(
        'AdirOn',
        'Welcome!',
        'welcome to our app',
        'adircohen@gmail.com'
      ),
      _createMail(
        'Ron Bochris',
        'Heyy',
        'Ma kore havrim?',
        'onchetrit@gmail.com'
      ),
      _createMail('Avishai etah', 'Cool', 'awesomeeee', 'adircohen@gmail.com'),
      _createMail(
        'Daniel Radia',
        'ahiiiiiii',
        'ata lo mavin',
        'adircohen@gmail.com'
      ),
    ],
    spam: [],
    sentEmails: [],
    bgc: utilService.getRandomColor(),
    keeps: gNotes,
  };
}

function _createMail(from, subject, body, fromMail) {
  return {
    id: utilService.makeId(),
    from,
    subject,
    body,
    fromMail,
    isRead: false,
    isStared: false,
    isSpam: false,
    sentAt: Date.now(),
  };
}

function getUserById(userId) {
  const user = gUsers.find((user) => {
    return userId === user.id;
  });
  return Promise.resolve(user);
}
function getMailIdxById(userMails, mailId) {
  const mailIdx = userMails.findIndex((mail) => {
    return mailId === mail.id;
  });
  return mailIdx;
}

function setStar(userId, mailId) {
  getUserById(userId).then((user) => {
    const mailIdx = getMailIdxById(user.mails, mailId);
    user.mails[mailIdx].isStared = !user.mails[mailIdx].isStared;
  });
  storageService.saveToStorage(USER_KEY, gUsers);
}

function findUserByMail(emailAddress) {
  const user = gUsers.find((user) => {
    return user.emailAddress === emailAddress;
  });
  return user;
}

function composeMail(user, mail) {
  const sendToUser = findUserByMail(mail.sendTo);
  const from = user.username;
  const fromMail = user.emailAddress;
  const subject = mail.subject;
  const body = mail.body;
  const mailToSend = _createMail(from, subject, body, fromMail);
  sendToUser.mails.unshift(mailToSend);
  user.sentEmails.unshift(mailToSend);
  storageService.saveToStorage(USER_KEY, gUsers);
}

function addUser(userToAdd) {
  const username = userToAdd.username;
  const emailAddress = userToAdd.emailAddress;
  const user = _createUser(username, emailAddress);
  gUsers.push(user);
  storageService.saveToStorage(USER_KEY, gUsers);
}

function getEmailTimeSent(timestamp) {
  const nowTime = Date.now();
  const pathDay = new Date(timestamp - nowTime).getHours();
  const date = new Date(timestamp);
  const month = gMonths[date.getMonth()];
  const day = date.getUTCDate();
  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  const timeSent =
    hours + pathDay > 24 ? `${day} ${month}` : `${hours}:${minutes.substr(-2)}`;
  return timeSent;
}

function removeMail(user, mailId) {
  const mailIdx = getMailIdxById(user.mails, mailId);
  const mails = user.mails;
  mails.splice(mailIdx, 1);
  storageService.saveToStorage(USER_KEY, gUsers);
}

function filterByStars(mails) {
  const mailsToDisplay = mails.filter((mail) => mail.isStared === true);
  console.log('mails', mailsToDisplay);
  return mailsToDisplay;
}

function setSpam(user, mail) {
  const mails = user.mails;
  const mailId = mail.id;
  const mailIdx = getMailIdxById(mails, mailId);
  if (mail.isSpam) {
    const spamMailIdx = getMailIdxById(user.spam, mailId);
    mails.unshift(user.spam[spamMailIdx]);
    user.spam.splice(spamMailIdx, 1);
    mail.isSpam = false;
  } else {
    user.spam.push(mails[mailIdx]);
    mails.splice(mailIdx, 1);
    mail.isSpam = true;
  }
  storageService.saveToStorage(USER_KEY, gUsers);
}
