import { getFolders } from '../services/dataService.js';
import { getNotesByfolder } from './Notes.js';

let currentFolder = 'All';

export const getCurrentfolder = () => currentFolder;

export function initializeFolders() {
  const foldersElement = document.querySelector('.folders');
  const folders = getFolders();

  // innerHTML을 사용하여 디렉토리 요소 생성
  const foldersHTML = folders
    .map((folder) => createfolderItem(folder))
    .join('');
  foldersElement.innerHTML = foldersHTML;

  // 모든 디렉토리 요소에 이벤트 리스너 추가
  document.querySelectorAll('.folder-item').forEach((item) => {
    item.addEventListener('click', handlefolderClick);
  });

  const foldersFooter = document.querySelector('.folders-footer');
  foldersFooter.innerHTML = createNewfolderBtn();
  const addfolderBtn = document.querySelector('.new-folder-btn');
  addfolderBtn.addEventListener('click', handleAddfolderBtnClick);
}

// ===== event listener =====
export function handlefolderClick(e) {
  currentFolder = e.target.closest('.folder-item').dataset.name;
  getNotesByfolder(currentFolder);
}

function handleAddfolderBtnClick(e) {
  console.log("It's clicked");
  const folderModal = document.querySelector('.folder-modal');
  console.log(folderModal);
  folderModal.classList.add('.on');
}

//  ===== html element 생성 =====
function createfolderItem(folder) {
  return `
    <div class="folder-item" data-name="${folder.name}">
    <img src="./images/folder-yellow.svg" alt="folder icon">
    <span>${folder.name}<span>
    </div>
  `;
}

function createNewfolderBtn() {
  return `
  <img src="./images/add-circle.svg" alt="add image" />
  <button class="new-folder-btn">New folder</button>
  `;
}
