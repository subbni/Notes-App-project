import { getDirectories } from '../services/dataService.js';
import { getNotesByDirectory } from './Notes.js';

let currentDirectory = 'All';

export const getCurrentDirectory = () => currentDirectory;

export function initializeDirectories() {
  const directoriesElement = document.querySelector('.directories');
  const directories = getDirectories();

  // innerHTML을 사용하여 디렉토리 요소 생성
  const directoriesHTML = directories
    .map((directory) => createDirectoryItem(directory))
    .join('');
  directoriesElement.innerHTML = directoriesHTML;

  // 모든 디렉토리 요소에 이벤트 리스너 추가
  document.querySelectorAll('.directory-item').forEach((dirElement) => {
    dirElement.addEventListener('click', handleDirectoryClick);
  });
}

export function handleDirectoryClick(e) {
  currentDirectory = e.target.closest('.directory-item').dataset.name;
  getNotesByDirectory(currentDirectory);
}

function createDirectoryItem(directory) {
  return `
    <div class="directory-item" data-name="${directory.name}">
    <img src="./images/folder-yellow.svg" alt="folder icon">
    <span>${directory.name}<span>
    </div>
  `;
}
