import { getFolders } from '../services/dataService.js';
import { getNotesByFolder } from './Notes.js';

let currentFolder = 'All';

export const getCurrentFolder = () => currentFolder;

export function initializeFolders() {
  const foldersElement = document.querySelector('.folders');
  const folders = getFolders();

  // innerHTML을 사용하여 디렉토리 요소 생성
  const foldersHTML = folders
    .map((folder) => createFolderItem(folder))
    .join('');
  foldersElement.innerHTML = foldersHTML;

  // 모든 디렉토리 요소에 이벤트 리스너 추가
  document.querySelectorAll('.folder-item').forEach((item) => {
    item.addEventListener('click', handleFolderClick);
  });

  const foldersFooter = document.querySelector('.folders-footer');
  foldersFooter.innerHTML = createNewFolderBtn();
  const addfolderBtn = document.querySelector('.new-folder-btn');
  addfolderBtn.addEventListener('click', handleAddFolderBtnClick);
}

export function updateFolders() {
  const foldersElement = document.querySelector('.folders');
  const folders = getFolders();

  // innerHTML을 사용하여 폴더 요소 생성
  const foldersHTML = folders
    .map((folder) => createFolderItem(folder))
    .join('');
  foldersElement.innerHTML = foldersHTML;

  // 모든 폴더 요소에 이벤트 리스너 추가
  document.querySelectorAll('.folder-item').forEach((item) => {
    item.addEventListener('click', handleFolderClick);
  });
}

// ===== event listener =====
export function handleFolderClick(e) {
  currentFolder = e.target.closest('.folder-item').dataset.name;
  getNotesByFolder(currentFolder);
}

function handleAddFolderBtnClick(e) {
  console.log("It's clicked");
  const folderModal = document.querySelector('.folder-modal');
  console.log(folderModal);
  folderModal.classList.add('on');
}

//  ===== html element 생성 =====
function createFolderItem(folder) {
  return `
    <div class="folder-item" data-name="${folder.name}">
    <img src="./images/folder-yellow.svg" alt="folder icon">
    <span>${folder.name}</span>
    <span>(${folder.numberOfNotes})</span>
    </div>
  `;
}

function createNewFolderBtn() {
  return `
  <img src="./images/add-circle.svg" alt="add image" />
  <button class="new-folder-btn">New folder</button>
  `;
}
