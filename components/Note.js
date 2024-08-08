import { getNoteById, createNewNote } from '../services/dataService.js';
import { getCurrentfolder } from './Folders.js';
import { removeClicked } from './Notes.js';

export function initializeNote() {
  const noteHeaderElement = document.querySelector('.note-header');
  noteHeaderElement.innerHTML = `<img id="add-note-icon" src="./images/add-square.svg" alt="노트 생성 아이콘" />`;
  document
    .querySelector('#add-note-icon')
    .addEventListener('click', handleNoteCreate);

  const noteElement = document.querySelector('.note');
  noteElement.innerHTML = '';
}

export function showNoteById(id) {
  const note = getNoteById(id);
  const noteElement = document.querySelector('.note');
  noteElement.innerHTML = '';
  noteElement.innerHTML = createNoteElement(note);
}

// ===== event listener =====
function handleNoteCreate() {
  removeClicked();
  // Note Element를 비우고, 노트를 작성할 수 있도록 바꾼다.
  const noteElement = document.querySelector('.note');
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
    folder: getCurrentfolder(),
    title: noteTitle,
    content: noteContent,
  };
  // 'All'인 상태면 생성 시엔 'Notes'로 바꿔주기
  if (newNote.folder === 'All') {
    newNote.folder = 'Notes';
  }
  createNewNote(newNote);
  // 화면창 초기화
}

// ===== html element 생성 =====
function createNoteElement(note) {
  return `
  <div class="note__title">
  ${note.title}
  </div>
  <div class="note__content">
  ${note.content}
  </div>
  `;
}

function createNoteWritingElement() {
  return `
  <textarea class="note-title" name="note-title" autofocus="autofocus">Title</textarea>
  <textarea class="note-content" name="note-content" autofocus="autofocus"></textarea>
  `;
}

function createNoteSubmitButton() {
  return `
  <button class="note-submit-btn">submit</button>`;
}
