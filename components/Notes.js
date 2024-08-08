import { getNotes } from '../services/dataService.js';
import { showNoteById } from './Note.js';

let previousClickedElement = null;

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
  const clickedElement = e.target.closest('.notes-item');

  if (previousClickedElement) {
    previousClickedElement.classList.remove('clicked');
  }

  clickedElement.classList.add('clicked');
  previousClickedElement = clickedElement;

  const noteId = clickedElement.dataset.id;
  showNoteById(noteId);
}

function createNoteItemElement(note) {
  return `
    <div class="notes-item" data-id=${note.id}>
      <h2 class="notes-item__title">${note.title}</h2>
      <img src="./images/folder.svg" alt="folder icon">
      <span class="notes-item__directory">/${note.directory}</span>
    </div>
  `;
}
