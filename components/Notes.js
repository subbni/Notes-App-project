import { getNotes } from '../services/dataService.js';
import { showNoteById } from './Note.js';

export function initializeNotes() {
  // 첫 로드시 모든 노트를 보여줌
  const notes = getNotes('All');
  setNotes(notes);
}

function setNotes(notes) {
  const notesElement = document.querySelector('.notes');
  // 기존에 있던 노트 리스트 초기화
  notesElement.innerHTML = '';
  const notesHTML = notes.map((note) => createNoteItemElement(note)).join('');
  notesElement.innerHTML = notesHTML;
  document.querySelectorAll('.notes-item').forEach((item) => {
    item.addEventListener('click', handleNotesClick);
  });
}

export function getNotesByDirectory(directory) {
  const filteredNotes = getNotes(directory);
  setNotes(filteredNotes);
}

function handleNotesClick(e) {
  const noteId = e.target.closest('.notes-item').dataset.id;
  // e.target.dataset.id 가 아닌 이유는?
  showNoteById(noteId);
}

function createNoteItemElement(note) {
  return `
    <div class="notes-item" data-id=${note.id}>
      <h2 class="notes-item__title">${note.title}</h2>
      <p class="notes-item__directory">/${note.directory}</p>
    </div>
  `;
}
