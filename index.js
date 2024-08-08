import { initializeFolders } from './components/Folders.js';
import { initializeModals } from './components/Modals.js';
import { initializeNote } from './components/Note.js';
import { initializeNotes, updateNotes } from './components/Notes.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeFolders();
  initializeNotes();
  initializeNote();

  //initializeModals();
});

export const updateComponents = () => {
  updateNotes();
  initializeNote();
};
