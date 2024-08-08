import { initializeFolders, updateFolders } from './components/Folders.js';
import { initializeModals } from './components/Modals.js';
import { initializeNote } from './components/Note.js';
import { initializeNotes, updateNotes } from './components/Notes.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeModals();
  initializeFolders();
  initializeNotes();
  initializeNote();
});

export const updateComponents = () => {
  updateFolders();
  updateNotes();
  initializeNote();
};
