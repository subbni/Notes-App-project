import { deleteNoteById, getNotes } from '../services/noteService.js';
import { getCurrentFolder } from './Folders.js';
import { showNoteById } from './Note.js';

let previousClickedElement = null;

export function initializeNotes() {
  // 첫 로드시 모든 노트를 보여줌
  initializeNotesHeader();
  const notes = getNotes(getCurrentFolder());
  setNotes(notes);
}

export function updateNotes() {
  const notes = getNotes(getCurrentFolder());
  setNotes(notes);
}

function initializeNotesHeader() {
  const headerElement = document.querySelector('.notes-header');
  headerElement.innerHTML = createNoteHeaderElement();
  const noteDeleteIcon = document.querySelector('#note-delete-icon');
  noteDeleteIcon.addEventListener('click', handleNoteDeleteClick);
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

export function getNotesByFolder(folder) {
  const filteredNotes = getNotes(folder);
  setNotes(filteredNotes);
}

// ===== event listener =====
function handleNotesClick(e) {
  const clickedElement = e.target.closest('.notes-item');

  removeClicked();

  clickedElement.classList.add('clicked');
  previousClickedElement = clickedElement;

  const noteId = clickedElement.dataset.id;
  showNoteById(noteId);
}

export function removeClicked() {
  if (previousClickedElement) {
    previousClickedElement.classList.remove('clicked');
  }
}

function handleNoteDeleteClick(e) {
  const noteItem = document.querySelector('.notes-item.clicked');
  if (noteItem) {
    deleteNoteById(noteItem.dataset.id);
  }
}

// ===== html 요소 생성 =====
function createNoteItemElement(note) {
  return `
    <div class="notes-item" data-id=${note.id} data-folderId=${note.folder.id}>
      <h2 class="notes-item__title">${note.title}</h2>
      <div class="notes-item__folder">
        <img src="./images/folder.svg" alt="folder icon">
        <span class="notes-item__folder-title">${note.folder.name}</span>
      </div>
    </div>
  `;
}

function createNoteHeaderElement() {
  return `
    <img id="note-delete-icon" src="./images/bin-icon.svg" alt="bin icon">
  `;
}
