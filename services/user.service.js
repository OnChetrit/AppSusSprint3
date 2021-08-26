import { utilService } from './util.service.js';
import { storageService } from './storage.service.js';

export const userService = {
  query,
  getUserById,
  addUser,
  findUserByMail,
  queryMails,
  setStar,
  setArchive,
  getEmailTimeSent,
  removeMail,
  queryMails,
  composeMail,
  restoreMail,
  addKeep,
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
    if (filterBy === 'archive') {
      const mailsAfterFilter = user.archive;
      return Promise.resolve(mailsAfterFilter);
    }
    if (filterBy === 'trash') {
      const mailsAfterFilter = user.trashEmails;
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
        'Reddit',
        'How much of your day do you spend googling?',
        "I think I spend at minimum 30 minutes per day googling – sometimes as much as a couple of hours. A lot of the time it's for things I've already googled in the past ,Do you ever get to a point where you don't have to google much anymore? Like, you just have most things memorized?",
        'noreply@redditmail.com'
      ),
      _createMail(
        'AMD',
        'AMD Radeon™ Software Adrenalin',
        'This release adds support for Aliens™: Fireteam Elite and Myst, This release contains stability improvements for end user reported issues',
        'memberservices@amd-member.com'
      ),
      _createMail(
        'LinkedIn Job Alerts',
        "1 new job for 'fullStack developer",
        'new jobs in Central, Israel match your preferences',
        'jobalerts-noreply@linkedin.com‏'
      ),
      _createMail(
        'Discord ',
        'Verify Discord Login from New Location',
        "It looks like someone tried to log into your Discord account from a new location. If this is you, follow the link below to authorize logging in from this location on your account. If this isn't you, we suggest changing your password as soon as possible.",
        'noreply@discord.com'
      ),
      _createMail(
        'Apple',
        'Add an email account to your iOS device',
        'There are two ways you can set up an email account in the Mail app on your iPhone, iPad, or iPod touch — automatically or manually. Learn which option is best for you.',
        'no_reply@email.apple.com‏'
      ),
    ],
    archive: [],
    sentEmails: [],
    trashEmails: [],
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
    isArchive: false,
    isTrash: false,
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
  if (!sendToUser) {
    user.sentEmails.unshift(mailToSend);
  } else {
    sendToUser.mails.unshift(mailToSend);
    user.sentEmails.unshift(mailToSend);
  }
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

function removeMail(mailId, mails, user) {
  const mailIdx = getMailIdxById(mails, mailId);
  const mail = mails[mailIdx];
  if (mail.isTrash) {
    user.trashEmails.splice(mailIdx, 1);
  } else {
    console.log(user.trashEmails);
    user.mails.splice(mailIdx, 1);
    user.trashEmails.unshift(mail);
    mail.isTrash = true;
  }
  storageService.saveToStorage(USER_KEY, gUsers);
}

function restoreMail(mailId, mails, user) {
  const mailIdx = getMailIdxById(mails, mailId);
  const mail = mails[mailIdx];
  mail.isTrash = false;
  user.mails.unshift(mail);
  user.trashEmails.splice(mailIdx, 1);
  storageService.saveToStorage(USER_KEY, gUsers);
}

function filterByStars(mails) {
  const mailsToDisplay = mails.filter((mail) => mail.isStared === true);
  return mailsToDisplay;
}

function setArchive(user, mail) {
  const mails = user.mails;
  const mailId = mail.id;
  const mailIdx = getMailIdxById(mails, mailId);
  if (mail.isArchive) {
    const archiveMailIdx = getMailIdxById(user.archive, mailId);
    mails.unshift(user.Archive[archiveMailIdx]);
    user.archive.splice(archiveMailIdx, 1);
    mail.isArchive = false;
  } else {
    user.archive.push(mails[mailIdx]);
    mails.splice(mailIdx, 1);
    mail.isArchive = true;
  }
  storageService.saveToStorage(USER_KEY, gUsers);
}

/////////////////////////////////////////////////////
function _createKeep(type, info) {
  return {
    id: utilService.makeId(),
    type,
    isPinned: false,
    info,
  };
}

function addKeep(user, keep) {
  const newKeep = _createKeep(user, keep);
  user.keeps.unshift(newKeep);
  // storageService.saveToStorage(USER_KEY, gUsers);
  return Promise.resolve();
}

function getKeepIdxById(user, keepId) {
  const keepIdx = user.keeps.findIndex((keep) => {
    return keepId === keep.id;
  });
  return keepIdx;
}
