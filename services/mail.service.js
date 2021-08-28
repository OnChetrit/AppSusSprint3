import { utilService } from './util.service.js';
import { storageService } from './storage.service.js';
import { userService } from './user.service.js';

export const mailService = {
  queryMails,
  getMailIdxById,
  setStar,
  composeMail,
  getEmailTimeSent,
  removeMail,
  filterByStars,
  setSpam,
};

const USER_KEY = 'userDB';

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

function getMailIdxById(userMails, mailId) {
  const mailIdx = userMails.findIndex((mail) => {
    return mailId === mail.id;
  });
  return mailIdx;
}

function setStar(userId, mailId) {
  userService.getUserById(userId).then((user) => {
    const mailIdx = getMailIdxById(user.mails, mailId);
    user.mails[mailIdx].isStared = !user.mails[mailIdx].isStared;
  });
  _saveToStorage();
}
function composeMail(user, mail) {
  const sendToUser = userService.findUserByMail(mail.sendTo);
  const from = user.username;
  const fromMail = user.emailAddress;
  const subject = mail.subject;
  const body = mail.body;
  const mailToSend = userService.createMail(from, subject, body, fromMail);
  sendToUser.mails.unshift(mailToSend);
  user.sentEmails.unshift(mailToSend);
  _saveToStorage();
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
  _saveToStorage();
}
function filterByStars(mails) {
  const mailsToDisplay = mails.filter((mail) => mail.isStared === true);
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
  _saveToStorage();
}

function _saveToStorage() {
  userService.query().then((users) => {
    storageService.saveToStorage(USER_KEY, users);
  });
}
