import { initializeDirectories } from './components/Directories.js';
import { initializeNotes } from './components/Notes.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeDirectories();
  initializeNotes();
});
