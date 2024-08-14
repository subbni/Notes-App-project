import { DEFAULT_FOLDER } from '../constants/folderConfig.js';
import { STORAGE_KEYS } from '../constants/storageConfig.js';
import { updateComponents } from '../index.js';

export const defaultFolders = [
  {
    id: DEFAULT_FOLDER.ALL.ID,
    name: DEFAULT_FOLDER.ALL.NAME,
    numberOfNotes: 1,
  },
  {
    id: DEFAULT_FOLDER.NOTES.ID,
    name: DEFAULT_FOLDER.NOTES.NAME,
    numberOfNotes: 1,
  },
];

export const defaultNotes = [
  {
    id: 1,
    title: 'Be A Writer',
    content: 'Write whatever you want, whenever you want.',
    folder: { name: DEFAULT_FOLDER.NOTES.NAME, id: DEFAULT_FOLDER.NOTES.ID },
  },
];

export const getFromLocalStorage = (key, defaultValue) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
