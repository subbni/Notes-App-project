import { initializeFolders } from '../components/Folders.js';
import { initializeNotes } from '../components/Notes.js';
import { updateComponents } from '../index.js';

const STORAGE_KEYS = {
  FOLDERS: 'folders',
  NOTES: 'notes',
  CURRENT_NOTE_ID: 'currentNoteId',
  CURRENT_FOLDER_ID: 'currentFolderId',
};

const defaultFolders = [
  {
    id: 1,
    name: 'All',
    numberOfNotes: 1,
  },
  {
    id: 2,
    name: 'Notes',
    numberOfNotes: 1,
  },
];

const defaultNotes = [
  {
    id: 1,
    title: 'Be A Writer',
    content: 'Write whatever you want, whenever you want.',
    folder: { name: 'Notes', id: 2 },
  },
];

const getFromLocalStorage = (key, defaultValue) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

let folders = getFromLocalStorage(STORAGE_KEYS.FOLDERS, defaultFolders);
let notes = getFromLocalStorage(STORAGE_KEYS.NOTES, defaultNotes);
let currentFolderId = getFromLocalStorage(STORAGE_KEYS.CURRENT_FOLDER_ID, 3);
let currentNoteId = getFromLocalStorage(STORAGE_KEYS.CURRENT_NOTE_ID, 2);

export const getFolders = () => folders;

export const getNotes = (folder) => {
  if (folder.name === 'All') return notes;
  else {
    return notes.filter((note) => note.folder.id === Number(folder.id));
  }
};

export const getNoteById = (id) => {
  // id는 string으로 들어옴
  return notes.find((note) => note.id === Number(id));
};

// ===== CREATE PART ===== //
export const createNewNote = (newNote) => {
  // 'All'인 상태면 생성 시엔 'Notes'로 바꿔주기
  if (newNote.folder.name === 'All') {
    newNote.folder.name = 'Notes';
    newNote.folder.id = 2;
  }

  newNote = {
    ...newNote,
    id: currentNoteId,
  };
  currentNoteId += 1;
  notes.push(newNote);

  updateNumberOfNotes(newNote.folder.id, 1);
  updateNotesToLocalStorage();
  updateFoldersToLocalStorage();
  updateComponents();
};

export const createNewFolder = (folderName) => {
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

// ===== DELETE PART ====== //
export const deleteNoteById = (noteId) => {
  // note 삭제
  const noteToDelete = notes.find((note) => note.id === Number(noteId));
  notes = notes.filter((note) => note.id !== Number(noteId));

  updateNumberOfNotes(noteToDelete.folder.id, -1);

  // localstorage에 반영
  updateNotesToLocalStorage();
  updateFoldersToLocalStorage();
  updateComponents();
};

export const deleteFolderById = (folderId) => {
  // folder 삭제
  const folderToDelete = folders.find((folder) => folder.id === folderId);
  folders = folders.filter((folder) => folder.id !== folderId);
  // note 삭제
  notes = notes.filter((note) => note.folder.id !== folderId);

  // 'All' 디렉토리의 numberOfNotes 업데이트
  updateNumberOfNotes(1, -folderToDelete.numberOfNotes);
  // localstorage에 반영
  updateNotesToLocalStorage();
  updateFoldersToLocalStorage();
  updateComponents();
};

// ===== UPDATE PART ====== //
const updateNotesToLocalStorage = () => {
  setToLocalStorage(STORAGE_KEYS.NOTES, notes);
  setToLocalStorage(STORAGE_KEYS.CURRENT_NOTE_ID, currentNoteId);
};

const updateFoldersToLocalStorage = () => {
  setToLocalStorage(STORAGE_KEYS.FOLDERS, folders);
  setToLocalStorage(STORAGE_KEYS.CURRENT_FOLDER_ID, currentFolderId);
};

const updateNumberOfNotes = (folderId, diff) => {
  if (folderId !== 1) {
    // !== 'All'
    const folderToUpdate = folders.find(
      (folder) => folder.id === Number(folderId)
    );
    folderToUpdate.numberOfNotes += diff;
  }
  const folderOfAll = folders.find((folder) => folder.name === 'All');
  folderOfAll.numberOfNotes += diff;
};
