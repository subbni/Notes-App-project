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
  updateFoldersToLocalStorage,
  updateNumberOfNotes,
} from './folderService.js';

let notes = getFromLocalStorage(STORAGE_KEYS.NOTES, defaultNotes);
let currentNoteId = getFromLocalStorage(STORAGE_KEYS.CURRENT_NOTE_ID, 2);

export const getNotes = (folder) => {
  if (folder.id === DEFAULT_FOLDER.ALL.ID) return notes;
  else {
    return notes.filter((note) => note.folder.id === Number(folder.id));
  }
};

export const getNoteById = (id) => {
  // id는 string으로 들어옴
  return notes.find((note) => note.id === Number(id));
};

export const createNote = (newNote) => {
  // 'All'인 상태 = 현재 선택한 디렉토리가 없는 상태
  // => 'Notes' 디렉토리에 저장
  if (newNote.folder.id === DEFAULT_FOLDER.ALL.ID) {
    newNote.folder.name = DEFAULT_FOLDER.NOTES.NAME;
    newNote.folder.id = DEFAULT_FOLDER.NOTES.ID;
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

export const udpateFolderNameToNotes = (folderId, newFolderName) => {
  notes.map((note) => {
    if (note.folder.id === Number(folderId)) {
      note.folder.name = newFolderName;
    }
  });
  updateNotesToLocalStorage();
};

export const updateNote = (noteInfo) => {
  const noteIdx = notes.findIndex((note) => note.id === Number(noteInfo.id));
  if (noteIdx !== -1) {
    notes[noteIdx].title = noteInfo.title;
    notes[noteIdx].content = noteInfo.content;
  }
  updateNotesToLocalStorage();
};

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

export const deleteNotesByFolderId = (folderId) => {
  notes = notes.filter((note) => note.folder.id !== Number(folderId));
};

export const updateNotesToLocalStorage = () => {
  setToLocalStorage(STORAGE_KEYS.NOTES, notes);
  setToLocalStorage(STORAGE_KEYS.CURRENT_NOTE_ID, currentNoteId);
};

export const getMatchedNotes = (searchWord) => {
  const regex = new RegExp(searchWord, 'gi');
  return notes.filter((note) => {
    return note.title.match(regex);
  });
};
