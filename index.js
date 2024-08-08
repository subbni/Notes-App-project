import { initializeDirectories } from './components/Directories.js';
import { initializeNote } from './components/Note.js';
import { initializeNotes, updateNotes } from './components/Notes.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeDirectories();
  initializeNotes();
  initializeNote();
});

export const updateComponents = () => {
  updateNotes();
  initializeNote();
};
