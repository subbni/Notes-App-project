import { initializeFolders } from '../components/Folders.js';
import { initializeNotes } from '../components/Notes.js';
import { updateComponents } from '../index.js';

const STORAGE_KEYS = {
  FOLDERS: 'folders',
  NOTES: 'notes',
  CURRENT_NOTE_ID: 'currentNoteId',
  CURRENT_FOLD_ID: 'currentFolderId',
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
    folder: 'Notes',
  },
];

const getFromLocalStorage = (key, defaultValue) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const folders = getFromLocalStorage(STORAGE_KEYS.FOLDERS, defaultFolders);
const notes = getFromLocalStorage(STORAGE_KEYS.NOTES, defaultNotes);
let currentFolderId = getFromLocalStorage(STORAGE_KEYS.CURRENT_FOLD_ID, 3);
let currentNoteId = getFromLocalStorage(STORAGE_KEYS.CURRENT_NOTE_ID, 2);

export const getFolders = () => folders;

export const getNotes = (folder) => {
  if (folder === 'All') return notes;
  else {
    return notes.filter((note) => note.folder == folder);
  }
};

export const getNoteById = (id) => {
  // id는 string으로 들어옴
  return notes.find((note) => note.id === Number(id));
};

export const createNewNote = (newNote) => {
  newNote = {
    ...newNote,
    id: currentNoteId,
  };
  currentNoteId += 1;
  notes.push(newNote);
  const folder = folders.find((folder) => folder.name === newNote.folder);
  const all = folders.find((folder) => folder.name === 'All');
  all.numberOfNotes += 1;
  folder.numberOfNotes += 1;
  updateNotesToLocalStorage();
  updateFoldersToLocalStorage();
  updateComponents();
};

export const createNewFolder = (folderName) => {
  const newFolder = {
    name: folderName,
    id: currentFolderId,
    numberOfNotes: 0,
  };
  currentFolderId += 1;
  folders.push(newFolder);
  updateFoldersToLocalStorage();
  updateComponents();
};

const updateNotesToLocalStorage = () => {
  setToLocalStorage(STORAGE_KEYS.NOTES, notes);
  setToLocalStorage(STORAGE_KEYS.CURRENT_NOTE_ID, currentNoteId);
};

const updateFoldersToLocalStorage = () => {
  setToLocalStorage(STORAGE_KEYS.FOLDERS, folders);
  setToLocalStorage(STORAGE_KEYS.CURRENT_FOLD_ID, currentFolderId);
};
