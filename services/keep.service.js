import { storageService } from './storage.service.js';
import { utilService } from './util.service.js';

export const keepService = {
  addKeep,
};

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
