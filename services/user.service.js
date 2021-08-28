import { utilService } from './util.service.js';
import { storageService } from './storage.service.js';

export const userService = {
  query,
  queryImg,
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
  setRead,
  ValidateEmail,
  setSelectedMail,
  removeSelectedMail,
  timeSendDetails,
  removeKeep,
  AddKeep,
  keepColorChange,
  duplicateKeep,
  moveSelectedToArchive,
  selectedRead,
  restoreSelectedMail,
  createDraftMail,
  checkDraftMail,
  getMailById,
  updateDraftMail,
  isDraftMailExist,
  getUnReadMails,
  queryPin,
  queryKeeps,
  togglePin,
  sendMail,
  selectAll,
  setMailAsKeep,
  getSelectedMails,
  removeSelectedMailfromTrash,
  toggleTodo,
  queryKeep,
  deleteTodo,
  goBack,
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
const gDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const gImgs = [
  'background0.jpg',
  'background1.jpg',
  'background2.jpg',
  'background3.jpg',
  'background4.jpg',
  'background5.jpg',
  'background6.jpg',
  'background7.jpg',
  'background8.jpg',
  'background9.jpg',
  'background10.jpg',
];
const gKeeps = [
  {
    id: utilService.makeId(),
    type: 'txt',
    isPinned: false,
    color: '#fdcfe8',
    info: {
      title: 'Title of text',
      txt: 'txt txt txt txt!',
    },
  },
  {
    id: utilService.makeId(),
    type: 'img',
    isPinned: true,
    color: '#fdcfe8',
    info: {
      // title: 'Image title',
      title: 'image description',
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
    color: '#fdcfe8',
    info: {
      title: 'To Do List',
      todos: [
        { id: utilService.makeId(), txt: 'Driving liscence', doneAt: null },
        { id: utilService.makeId(), txt: 'Coding power', doneAt: 187111111 },
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

function queryMails(user, searchBy, filterBy, sortedBy) {
  if (sortedBy) {
    if (sortedBy === 'title') {
      const mailsAfterSort = sortBy(sortedBy, user.mails);
      return Promise.resolve(mailsAfterSort);
    }
    if (sortedBy === 'subject') {
      const mailsAfterSort = sortBy(sortedBy, user.mails);
      return Promise.resolve(mailsAfterSort);
    }
    if (sortedBy === 'date') {
      const mailsAfterSort = sortBy(sortedBy, user.mails);
      return Promise.resolve(mailsAfterSort);
    }
  }

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
    if (filterBy === 'draft') {
      return Promise.resolve(user.draftEmails);
    }
    if (filterBy === 'read' || filterBy === 'unread') {
      const mailsAfterFilter = filterByRead(filterBy, user.mails);
      return Promise.resolve(mailsAfterFilter);
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

function queryImg() {
  return Promise.resolve(gImgs);
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
        'Adir & On',
        'Welcome!!!!!!',
        "We're glad you were registered\nNow you can user all our features,\nEnjoy! ❤️",
        'adircohen@gmail.com, onchetrit@gmail.com'
      ),

      _createMail(
        'Reddit',
        'How much of your day do you spend googling?',
        "I think I spend at minimum 30 minutes per day googling – sometimes as much as a couple of hours. A lot of the time it's for things I've already googled in the past ,Do you ever get to a point where you don't have to google much",
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
        "It looks like someone tried to log into your Discord account from a new location. If this is you, follow the link below to authorize logging in from this location on your account. If this isn't you",
        'noreply@discord.com'
      ),
      _createMail(
        'Apple',
        'Add an email account to your iOS device',
        'There are two ways you can set up an email account in the Mail app on your iPhone, iPad, or iPod touch — automatically or manually. Learn which option is best for you.',
        'no_reply@email.apple.com‏'
      ),
      _createMail(
        'Reddit',
        'How much of your day do you spend googling?',
        "I think I spend at minimum 30 minutes per day googling – sometimes as much as a couple of hours. A lot of the time it's for things I've already googled in the past ,Do you ever get to a point where you don't have to google much",
        'noreply@redditmail.com'
      ),
      _createMail(
        'Discord ',
        'Verify Discord Login from New Location',
        "It looks like someone tried to log into your Discord account from a new location. If this is you, follow the link below to authorize logging in from this location on your account. If this isn't you",
        'noreply@discord.com'
      ),
      _createMail(
        'LinkedIn Job Alerts',
        "1 new job for 'fullStack developer",
        'new jobs in Central, Israel match your preferences',
        'jobalerts-noreply@linkedin.com‏'
      ),
      _createMail(
        'Reddit',
        'How much of your day do you spend googling?',
        "I think I spend at minimum 30 minutes per day googling – sometimes as much as a couple of hours. A lot of the time it's for things I've already googled in the past ,Do you ever get to a point where you don't have to google much",
        'noreply@redditmail.com'
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
        "It looks like someone tried to log into your Discord account from a new location. If this is you, follow the link below to authorize logging in from this location on your account. If this isn't you",
        'noreply@discord.com'
      ),
      _createMail(
        'Quora Digest',
        'Are HTML, CSS, JavaScript, and Node.js with a little SQL',
        'Not quite. That combination of technology is enough to write full stack code, but it doesn’t address everything. There’s far more to being a full stack developer First, you need to be familiar with infrastructure. After all, if you have no place to run the code, then knowing how to write it is pointless. For example, you may know SQL but if you can’t setup the database, then you have no place to run your code. Sure, you could use a cloud service, but that may not be what every job calls for (and you still need to understand how to design a database). The good news is infrastructure can often be learned as you go, and most employers have already done the hard part. It’s important to be aware of your own limitations and have a plan for removing such knowledge gaps',
        'english-digest-noreply@quora.com'
      ),
      _createMail(
        'Call of Duty',
        'Call of Duty®: Vanguard: Pre-Order is LIVE. 💥‏‏',
        '© 2021 Activision Publishing, Inc. ACTIVISION, CALL OF DUTY, MODERN WARFARE, WARZONE, CALL OF DUTY WARZONE, CALL OF DUTY®: VANGUARD, and CALL OF DUTY®: BLACK OPS COLD WAR are trademarks of Activision Publishing, Inc. All other trademarks and trade names are the properties of their respective owners.',
        'callofduty@marketing.activision.com'
      ),
      _createMail(
        'GeeksforGeeks',
        "It's our birthday, did you know?😳",
        'You see a chappal ad right after it breaks & you talk to your friend about getting a new pair, this app’s for you. HalloApp, a new social media net work claims to have no bots, ads,trolls, likes, followers or photo filters.Say ‘Hallo’ to a good sort of social medium, right?',
        'no-reply@geeksforgeeks.org'
      ),
    ],
    archive: [],
    sentEmails: [],
    trashEmails: [],
    draftEmails: [],
    bgc: utilService.getRandomColor(),
    keeps: gKeeps,
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
    isSelected: false,
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

function getMailById(mails, mailId) {
  const mailIdx = mails.find((mail) => {
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

function goBack(mail) {
  console.log(mail);
  mail.isRead = true;
  storageService.saveToStorage(USER_KEY, gUsers);
}
function getUnReadMails(mails) {
  let counter = 0;
  mails.forEach((mail) => {
    if (!mail.isRead) {
      counter++;
    }
  });
  return Promise.resolve(counter);
}
function updateDraftMail(draftMailId, draftMail, mails) {
  let mail = getMailById(mails, draftMailId);
  mail.from = draftMail.from;
  mail.subject = draftMail.subject;
  mail.body = draftMail.body;
  mail.fromMail = draftMail.fromMail;
}
function createDraftMail(from, subject, body, fromMail) {
  return _createMail(from, subject, body, fromMail);
}
function isDraftMailExist(id, mails) {
  if (!mails) {
    return false;
  }
  const isExist = mails.find((mail) => {
    mail.id === id;
  });

  if (isExist === 'undefine') {
    return false;
  }
  return true;
}

function checkDraftMail(mails, draftMail) {
  return mails.find((mail) => {
    mail.id === draftMail.id;
  });
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
    mail.isTrash = false;
  } else {
    user.mails.splice(mailIdx, 1);
    user.trashEmails.unshift(mail);
    mail.isSelected = false;
    mail.isTrash = true;
  }
  storageService.saveToStorage(USER_KEY, gUsers);
}

function removeSelectedMailfromTrash(mails, user) {
  console.log('all mail', mails);
  const selected = getSelectedMails(mails);
  console.log('selecetd', selected);
  selected.forEach((mail) => {
    console.log(mail);
    if (mail.isTrash && mail.isSelected) {
      console.log('trash', user.trashEmails);
      const mailIdx = getMailIdxById(user.trashEmails, mail.id);
      user.trashEmails.splice(mailIdx, 1);
    }
  });
  storageService.saveToStorage(USER_KEY, gUsers);
}

function restoreMail(mailId, mails, user) {
  const mailIdx = getMailIdxById(mails, mailId);
  const mail = mails[mailIdx];
  mail.isTrash = false;
  mail.isSelected = false;
  user.mails.unshift(mail);
  user.trashEmails.splice(mailIdx, 1);
  storageService.saveToStorage(USER_KEY, gUsers);
}
function filterByStars(mails) {
  const mailsToDisplay = mails.filter((mail) => mail.isStared === true);
  return mailsToDisplay;
}
function filterByRead(filterBy, mails) {
  const mailsToDisplay =
    filterBy === 'read'
      ? mails.filter((mail) => mail.isRead === true)
      : mails.filter((mail) => mail.isRead === false);
  return mailsToDisplay;
}
function sortBy(sortedBy, mails) {
  if (sortedBy === 'title') {
    return mails.sort((mailA, mailB) => {
      return mailA.from.toLowerCase().localeCompare(mailB.from.toLowerCase());
    });
  }
  if (sortedBy === 'subject') {
    return mails.sort((mailA, mailB) => {
      return mailA.subject
        .toLowerCase()
        .localeCompare(mailB.subject.toLowerCase());
    });
  }
  if (sortedBy === 'date') {
    return mails.sort((mailA, mailB) => {
      return mailA.sentAt - mailB.sentAt;
    });
  }
}
function setArchive(user, mail) {
  const mails = user.mails;
  const mailId = mail.id;
  const mailIdx = getMailIdxById(mails, mailId);
  if (mail.isArchive) {
    mail.isSelected = false;
    const archiveMailIdx = getMailIdxById(user.archive, mailId);
    mails.unshift(user.archive[archiveMailIdx]);
    user.archive.splice(archiveMailIdx, 1);
    mail.isArchive = false;
  } else {
    mail.isSelected = false;
    user.archive.push(mails[mailIdx]);
    mails.splice(mailIdx, 1);
    mail.isArchive = true;
  }
  storageService.saveToStorage(USER_KEY, gUsers);
}
function setRead(mail) {
  if (mail.isRead) {
    mail.isRead = false;
    mail.isSelected = false;
  } else {
    mail.isSelected = false;
    mail.isRead = true;
  }
  storageService.saveToStorage(USER_KEY, gUsers);
  return Promise.resolve();
}
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}
function setSelectedMail(mail) {
  if (mail.isSelected) {
    mail.isSelected = false;
  } else {
    mail.isSelected = true;
  }
  storageService.saveToStorage(USER_KEY, gUsers);
}
function getSelectedMails(mails) {
  const selectedMails = [];
  for (let i = 0; i < mails.length; i++) {
    if (mails[i].isSelected) {
      selectedMails.push(mails[i]);
    }
  }
  return selectedMails;
}
function removeSelectedMail(mails, user) {
  const mailsToRemove = getSelectedMails(mails);
  mailsToRemove.forEach((mail) => {
    removeMail(mail.id, user.mails, user);
  });
}
function restoreSelectedMail(mails, user) {
  const mailsToRestore = getSelectedMails(mails);
  mailsToRestore.forEach((mail) => {
    restoreMail(mail.id, user.trashEmails, user);
  });
}
function selectedRead(mails, user) {
  const mailsToReadUnRead = getSelectedMails(mails);
  mailsToReadUnRead.forEach((mail) => {
    setRead(mail);
  });
}
function timeSendDetails(timestamp) {
  const fullTime = new Date(timestamp);
  const month = gMonths[fullTime.getMonth()];
  const year = fullTime.getFullYear();
  const day = fullTime.getUTCDate();
  const dayName = gDay[fullTime.getDay()];
  const hour = fullTime.getHours();
  const minutes = fullTime.getMinutes();
  return `${day} ${month} ${year} ${dayName}, ${hour}:${minutes}`;
}
function moveSelectedToArchive(mails, user) {
  const mailToMove = getSelectedMails(mails);
  mailToMove.forEach((mail) => {
    setArchive(user, mail);
  });
}

function selectAll(mails, user) {
  const selectedMails = getSelectedMails(mails);
  if (!selectedMails.length) {
    mails.forEach((mail) => {
      mail.isSelected = true;
    });
  } else {
    mails.forEach((mail) => {
      mail.isSelected = false;
    });
  }
  storageService.saveToStorage(USER_KEY, gUsers);
}

function setMailAsKeep(mail, user) {
  if (!mail) return;
  const type = 'txt';
  const title = mail.subject;
  const val = mail.body;
  const keep = createKeep(type, title, val);
  user.keeps.unshift(keep);
  storageService.saveToStorage(USER_KEY, gUsers);
}

///////////////////////////////// KEEPS /////////////////////////////////

function queryKeeps(user) {
  return Promise.resolve(user.keeps);
}

function queryKeep(user, keepId) {
  return Promise.resolve(_getKeepById(user, keepId));
}

function queryPin(keeps) {
  const pinnedKeeps = [];
  const unPinnedKeeps = [];

  keeps.forEach((keep) => {
    keep.isPinned === true ? pinnedKeeps.push(keep) : unPinnedKeeps.push(keep);
  });
  return Promise.resolve({ pin: pinnedKeeps, unpin: unPinnedKeeps });
}
// function queryUnPin(keeps) {
//   keeps.forEach((keep) => {
//     if (keep.isPinned === false) unPinnedKeeps.push(keep);
//   });
//   return Promise.resolve(unPinnedKeeps);
// }

function createKeep(type, title, val) {
  let newKeep = {};

  switch (type) {
    case 'txt':
      newKeep = {
        id: utilService.makeId(),
        type,
        isPinned: false,
        color: '#fdcfe8',
        info: {
          title: title,
          txt: val,
        },
      };

      break;

    case 'img':
      newKeep = {
        id: utilService.makeId(),
        type,
        color: '#fdcfe8',
        isPinned: false,
        info: {
          title,
          url: val,
        },
      };
      break;

    case 'todo':
      newKeep = {
        id: utilService.makeId(),
        type,
        color: '#fdcfe8',
        isPinned: false,
        info: {
          title,
          todos: [
            {
              id: utilService.makeId(),
              txt: val,
              doneAt: null,
            },
          ],
        },
      };

      break;
    default:
      break;
  }
  return newKeep;
}

function AddKeep(user, type, title, txt) {
  const keep = createKeep(type, title, txt);
  user.keeps.unshift(keep);
  storageService.saveToStorage(USER_KEY, gUsers);
}

function deleteTodo(keep, todoId) {
  const todoIdx = keep.info.todos.findIndex((todo) => todo.id === todoId);
  keep.info.todos.splice(todoIdx, 1);
  storageService.saveToStorage(USER_KEY, gUsers);
  return Promise.resolve();
}

function sendMail(user, keep) {
  console.log(`keep`, keep);
  const type = keep.type;

  const body =
    type === 'txt'
      ? keep.info.txt
      : type === 'img'
      ? keep.info.url
      : getTodo(keep);
  const subject = keep.info.title;
  const from = user.username;
  const fromMail = user.emailAddress;
  const mail = _createMail(from, subject, body, fromMail);
  return Promise.resolve(mail);
}

function toggleTodo(keep, todoId) {
  console.log(`keep`, keep);
  const currTodoIdx = keep.info.todos.findIndex((todo) => {
    return todo.id === todoId;
  });

  const currTodo = keep.info.todos[currTodoIdx];

  currTodo.doneAt = currTodo.doneAt ? null : Date.now();
  storageService.saveToStorage(USER_KEY, gUsers);
}

function getTodo(keep) {
  const todos = keep.info.todos;
  if (!todos) return '';
  let strHtml = '';
  todos
    .map((todo) => {
      strHtml += `${todo.txt}\n`;
    })
    .join(',');
  return strHtml;
}

function togglePin(keep) {
  keep.isPinned = !keep.isPinned;
  storageService.saveToStorage(USER_KEY, gUsers);
}

function removeKeep(user, id) {
  const idx = _getKeepIdxById(user, id);
  user.keeps.splice(idx, 1);
  storageService.saveToStorage(USER_KEY, gUsers);
  return Promise.resolve();
}

function duplicateKeep(user, keep) {
  const keepJson = JSON.parse(JSON.stringify(keep));
  keepJson.id = utilService.makeId();
  user.keeps.unshift(keepJson);
  storageService.saveToStorage(USER_KEY, gUsers);
  return Promise.resolve();
}

function keepColorChange(user, id, color) {
  const idx = _getKeepIdxById(user, id);
  user.keeps[idx].color = color;
  storageService.saveToStorage(USER_KEY, gUsers);
  return Promise.resolve();
}

function _getKeepIdxById(user, keepId) {
  const keepIdx = user.keeps.findIndex((keep) => {
    return keepId === keep.id;
  });
  return keepIdx;
}

function _getKeepById(user, keepId) {
  const keep = user.keeps.find((keep) => {
    return keepId === keep.id;
  });
  return keep;
}
