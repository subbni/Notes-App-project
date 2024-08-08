import { createNewFolder } from '../services/dataService.js';

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
};

const handleConfirmBtnClick = (e) => {
  const nameText = document.querySelector(
    '.folder-modal__form input[name="name"]'
  ).value;
  console.log(nameText);
  createNewFolder(nameText);
  const folderModal = document.querySelector('.folder-modal');
  folderModal.classList.remove('on');
};

// ===== html 요소 생성 =====
function createAddFolderModal() {
  return `
  <div class="folder-modal modal">
    <h2 class="folder-modal__title">New Folder</h2>
    <form class="folder-modal__form">
      <span>Name:</span>
      <input name="name" type="text" value="New Folder">
    </form>
    <div>
      <button class="folder-cancel-btn">Cancel</button>
      <button class="folder-confirm-btn">Ok</button>
    </div>
  </div>
  `;
}
