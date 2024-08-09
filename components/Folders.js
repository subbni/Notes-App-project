import { deleteFolderById, getFolders } from '../services/dataService.js';
import { getNotesByFolder } from './Notes.js';

let currentFolder = { name: 'All', id: 1 };
let currentFolderElement = null;

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
    item.addEventListener('mouseover', handleFolderHover);
    item.addEventListener('mouseout', handleFolderHoverOut);
  });

  const foldersFooter = document.querySelector('.folders-footer');
  foldersFooter.innerHTML = createNewFolderBtn();
  const addfolderBtn = document.querySelector('.new-folder-btn');
  addfolderBtn.addEventListener('click', handleAddFolderBtnClick);

  currentFolderElement = document.querySelector('.folder-item[data-id="1"]');

  initializeFolderDropdowns();
}

function initializeFolderDropdowns() {
  // 모든 드롭다운 버튼과 메뉴를 선택
  const dropdownButtons = document.querySelectorAll('.folder-detail-icon');
  const dropdownMenus = document.querySelectorAll('.folder-dropdown');
  const deleteOptionElement = document.querySelectorAll(
    '.folder-dropdown__delete-option'
  );

  // 이벤트 리스너 등록
  dropdownButtons.forEach((btn) => {
    btn.addEventListener('click', handleFolderDropdownBtnClick);
  });
  dropdownMenus.forEach((menu) => {
    menu.addEventListener('mouseleave', handleFolderDropdownBtnHoverOut);
  });
  deleteOptionElement.forEach((item) => {
    item.addEventListener('click', handleDeleteFolderClick);
  });
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
    item.addEventListener('mouseover', handleFolderHover);
    item.addEventListener('mouseout', handleFolderHoverOut);
  });
  initializeFolderDropdowns();
}

// ===== event listener =====
export function handleFolderClick(e) {
  const clickedFolderItem = e.target.closest('.folder-item');
  currentFolder = {
    name: clickedFolderItem.dataset.name,
    id: Number(clickedFolderItem.dataset.id),
  };

  removeClicked();

  clickedFolderItem.classList.add('clicked');
  currentFolderElement = clickedFolderItem;

  getNotesByFolder(currentFolder);
}

function removeClicked() {
  if (currentFolderElement) {
    currentFolderElement.classList.remove('clicked');
  }
}

function handleAddFolderBtnClick(e) {
  const folderModal = document.querySelector('.folder-modal');
  folderModal.classList.add('on');
  const backdrop = document.querySelector('.backdrop');
  backdrop.classList.add('on');
}

function handleFolderHover(e) {
  const folderItem = e.target.closest('.folder-item');
  const detailIcon = folderItem.querySelector('.folder-detail-icon');

  detailIcon.style.display = 'block'; // 아이콘 보이기
}

function handleFolderHoverOut(e) {
  const folderItem = e.target.closest('.folder-item');
  const detailIcon = folderItem.querySelector('.folder-detail-icon');

  detailIcon.style.display = 'none'; // 아이콘 숨기기
}

// 더보기 버튼을 누르면 드롭다운 메뉴 보여주기
function handleFolderDropdownBtnClick(e) {
  const dropdownBtn = e.target;
  dropdownBtn.classList.add('triggered');
}

function handleDeleteFolderClick(e) {
  const folderItemToDelete = e.target.closest('.folder-item');
  // TODO: 모달창 띄우기 '정말 삭제하시겠습니까?'
  deleteFolderById(folderItemToDelete.dataset.id);
}

// 드롭다운 메뉴에서 커서가 나가면 사라짐
function handleFolderDropdownBtnHoverOut(e) {
  const folderItem = e.target.closest('.folder-item');
  const detailIcon = folderItem.querySelector('.folder-detail-icon');

  if (detailIcon.classList.contains('triggered')) {
    detailIcon.classList.remove('triggered');
  }
}

//  ===== html element 생성 =====
function createFolderItem(folder) {
  return `
    <div class="folder-item" data-name="${folder.name}" data-id="${folder.id}">
      <div class="folder-item__title">
        <img src="./images/folder-yellow.svg" alt="folder icon">
        <span>${folder.name}</span>
      </div>
      <div class="folder-item__info">
        <img class="folder-detail-icon" src="./images/detail-icon.svg" alt="detail icon">
        <div class="folder-dropdown">
          <div class="folder-dropdown__rename-option dropdown-option">Rename Folder</div>
          <div class="folder-dropdown__delete-option dropdown-option">Delete Folder</div>
        </div>
        <span>${folder.numberOfNotes}</span>
      </div>
    </div>
  `;
}

function createNewFolderBtn() {
  return `
  <img src="./images/add-circle.svg" alt="add image" />
  <button class="new-folder-btn">New folder</button>
  `;
}
