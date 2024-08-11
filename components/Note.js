import {
  getNoteById,
  createNote,
  updateNote,
} from '../services/noteService.js';
import { getCurrentFolder } from './Folders.js';
import { removeClicked } from './Notes.js';

export function initializeNote() {
  const noteHeaderElement = document.querySelector('.note-header');
  noteHeaderElement.innerHTML = `<img id="add-note-icon" src="./images/edit-icon.svg" alt="노트 생성 아이콘" />`;
  document
    .querySelector('#add-note-icon')
    .addEventListener('click', handleNoteCreate);

  const noteElement = document.querySelector('.note');
  noteElement.addEventListener('click', handleNoteClick);
  noteElement.innerHTML = '';
}

export function showNoteById(id) {
  const note = getNoteById(id);
  const noteElement = document.querySelector('.note');
  noteElement.dataset.id = id;
  noteElement.innerHTML = '';
  noteElement.innerHTML = createNoteElement(note);

  if (noteElement.classList.contains('editing')) {
    noteElement.classList.remove('editing');
  }
}

// ===== event listener =====
function handleNoteCreate() {
  removeClicked();
  // Note Element를 비우고, 노트를 작성할 수 있도록 바꾼다.
  const noteElement = document.querySelector('.note');
  noteElement.classList.add('editing');
  noteElement.innerHTML = '';
  noteElement.innerHTML = createNoteWritingElement();
  noteElement.innerHTML += createNoteSubmitButton();

  const submitBtnElement = document
    .querySelector('.note-submit-btn')
    .addEventListener('click', handleNoteSubmit);
}

function handleNoteSubmit() {
  // 사용자가 작성한 노트를 저장한다.
  const noteTitle = document.querySelector('.note-title').value;
  const noteContent = document.querySelector('.note-content').value;
  const newNote = {
    folder: getCurrentFolder(),
    title: noteTitle,
    content: noteContent,
  };
  createNote(newNote);
  // 화면창 초기화
  document.querySelector('.note').classList.remove('editing');
}

function handleUpdatedNoteSubmit(e) {
  e.stopPropagation(); // IMPORTANT
  const noteElement = document.querySelector('.note');
  const noteTitle = document.querySelector('.note-title').value;
  const noteContent = document.querySelector('.note-content').value;
  updateNote({
    id: noteElement.dataset.id,
    title: noteTitle,
    content: noteContent,
  });
  showNoteById(noteElement.dataset.id);
}

function handleNoteClick(e) {
  const noteElement = document.querySelector('.note');
  if (noteElement.classList.contains('editing')) {
    return;
  }
  const note = getNoteById(noteElement.dataset.id);

  noteElement.classList.add('editing');
  noteElement.innerHTML = '';
  noteElement.innerHTML = createNoteWritingElement(note);
  noteElement.innerHTML += createNoteSubmitButton();

  const submitBtnElement = document
    .querySelector('.note-submit-btn')
    .addEventListener('click', handleUpdatedNoteSubmit);
}

// ===== html element 생성 =====
function createNoteElement(note) {
  return `
  <div class="note__title">
  ${note.title.trim()}
  </div>
  <div class="note__content">
  ${note.content.replaceAll(/(\n)/g, '<br>').trim()}
  </div>
  `;
}

function createNoteWritingElement(note) {
  return `
  <textarea class="note-title" name="note-title" autofocus="autofocus">${(note
    ? note.title
    : 'Title'
  ).trim()}</textarea>
  <textarea class="note-content" name="note-content" autofocus="autofocus">${(note
    ? note.content
    : ''
  ).trim()}</textarea>
  `;
}

function createNoteSubmitButton() {
  return `
  <button class="note-submit-btn">submit</button>`;
}
