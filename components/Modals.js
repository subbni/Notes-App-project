import { createFolder } from '../services/folderService.js';

export function initializeModals() {
  const mainContainer = document.querySelector('.main');
  mainContainer.innerHTML += createAddFolderModal();

  const cancelBtn = document.querySelector('.folder-cancel-btn');
  cancelBtn.addEventListener('click', handleCancelBtnClick);
  const confirmBtn = document.querySelector('.folder-confirm-btn');
  confirmBtn.addEventListener('click', handleConfirmBtnClick);
}

// ===== event listner =====
const handleCancelBtnClick = () => {
  const folderModal = document.querySelector('.folder-modal');
  folderModal.classList.remove('on');
  const backdrop = document.querySelector('.backdrop');
  backdrop.classList.remove('on');
};

const handleConfirmBtnClick = (e) => {
  const input = document.querySelector(
    '.folder-modal__form input[name="name"]'
  );
  const nameText = input.value;
  createFolder(nameText);
  const folderModal = document.querySelector('.folder-modal');
  folderModal.classList.remove('on');
  const backdrop = document.querySelector('.backdrop');
  backdrop.classList.remove('on');
  input.value = 'New Folder';
};

// ===== html 요소 생성 =====
function createAddFolderModal() {
  return `
  <div class="folder-modal modal">
    <h2 class="folder-modal__title">New Folder</h2>
    <div class="folder-modal__form">
      <span>Name:</span>
      <input name="name" type="text" value="New Folder" autofocus="autofocus">
    </div>
    <div class="folder-modal__footer">
      <button class="folder-cancel-btn">Cancel</button>
      <button class="folder-confirm-btn">Ok</button>
    </div>
  </div>
  `;
}
