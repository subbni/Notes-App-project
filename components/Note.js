import { getNoteById } from '../services/dataService.js';

export function showNoteById(id) {
  const note = getNoteById(id);
  const noteElement = document.querySelector('.note');
  console.log(note);
  noteElement.innerHTML = createNoteElement(note);
}

function createNoteElement(note) {
  return `
  <div>
  ${note.content}
  </div>
  `;
}
