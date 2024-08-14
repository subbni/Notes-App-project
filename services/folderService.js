import { DEFAULT_FOLDER } from '../constants/folderConfig.js';
import { STORAGE_KEYS } from '../constants/storageConfig.js';
import { updateComponents } from '../index.js';
import {
  defaultFolders,
  defaultNotes,
  getFromLocalStorage,
  setToLocalStorage,
} from './dataService.js';
import {
  deleteNotesByFolderId,
  udpateFolderNameToNotes,
  updateNotesToLocalStorage,
} from './noteService.js';

let folders = getFromLocalStorage(STORAGE_KEYS.FOLDERS, defaultFolders);
let currentFolderId = getFromLocalStorage(STORAGE_KEYS.CURRENT_FOLDER_ID, 3);

export const getFolders = () => folders;

export const createFolder = (folderName) => {
  const newFolder = {
    id: currentFolderId,
    name: folderName,
    numberOfNotes: 0,
  };
  currentFolderId += 1;
  folders.push(newFolder);

  updateFoldersToLocalStorage();
  updateComponents();
};

export const updateFoldersToLocalStorage = () => {
  setToLocalStorage(STORAGE_KEYS.FOLDERS, folders);
  setToLocalStorage(STORAGE_KEYS.CURRENT_FOLDER_ID, currentFolderId);
};

export const updateNumberOfNotes = (folderId, diff) => {
  if (folderId !== DEFAULT_FOLDER.ALL.ID) {
    const folderToUpdate = folders.find(
      (folder) => folder.id === Number(folderId)
    );
    folderToUpdate.numberOfNotes += diff;
  }
  const masterFolder = folders.find(
    (folder) => folder.id === DEFAULT_FOLDER.ALL.ID
  );
  masterFolder.numberOfNotes += diff;
};

export const updateFolderName = (folderId, newFolderName) => {
  // TODO: default folder 검증하는 로직 추가할 것
  const folderIndex = folders.findIndex(
    (folder) => folder.id === Number(folderId)
  );
  if (folderIndex !== -1 && folders[folderIndex].name !== newFolderName) {
    folders[folderIndex].name = newFolderName;
  }
  // note 내 folder 이름 수정
  udpateFolderNameToNotes(folderId, newFolderName);
  updateFoldersToLocalStorage();
  updateComponents();
};

export const deleteFolderById = (folderId) => {
  // folder 삭제
  const folderToDelete = folders.find(
    (folder) => folder.id === Number(folderId)
  );
  folders = folders.filter((folder) => folder.id !== Number(folderId));
  // note 삭제
  deleteNotesByFolderId(folderId);
  // 'All' 디렉토리의 numberOfNotes 업데이트
  updateNumberOfNotes(DEFAULT_FOLDER.ALL.ID, -folderToDelete.numberOfNotes);
  // localstorage에 반영
  updateNotesToLocalStorage();
  updateFoldersToLocalStorage();
  updateComponents();
};
