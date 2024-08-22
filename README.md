# Notes-App-project

## 프로젝트 기간
  2024.08.07 ~ 2024.08.14 (약 1주일)
## 프로젝트 인원
  1인 (개인)
## 사용 기술
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>

## 파일 구조
```
Notes-App-project
 ┣ components
 ┃ ┣ Folders.js
 ┃ ┣ Modals.js
 ┃ ┣ Note.js
 ┃ ┗ Notes.js
 ┣ constants
 ┃ ┣ folderConfig.js
 ┃ ┗ storageConfig.js
 ┣ images
 ┃ ┣ 생략 ...
 ┣ services
 ┃ ┣ dataService.js
 ┃ ┣ folderService.js
 ┃ ┗ noteService.js
 ┣ styles
 ┃ ┣ folders.css
 ┃ ┣ layout.css
 ┃ ┣ modals.css
 ┃ ┣ note.css
 ┃ ┣ notes.css
 ┃ ┗ style.css
 ┣ utils
 ┃ ┗ dateUtils.js
 ┣ README.md
 ┣ index.html
 ┗ index.js
```
## 구현 내용

### 1. 노트 / 폴더 생성

#### 폴더 생성
<img width="800" alt="Screenshot 2024-08-22 at 13 49 40" src="https://github.com/user-attachments/assets/db717d47-a662-465f-a36c-d66094dae498">

폴더 생성 버튼을 클릭하여 모달창에서 폴더 이름을 입력하면 해당 이름으로 폴더가 생성됩니다.


#### 노트 생성
<img width="800" alt="Screenshot 2024-08-22 at 13 49 56" src="https://github.com/user-attachments/assets/92c896b1-8109-4ba6-9cef-bba1ebeef4e5">

노트 생성 버튼을 클릭하여 노트 내용을 작성한 뒤, submit 버튼을 클릭하면 해당 내용의 노트가 생성됩니다.

특정 폴더를 클릭한 뒤 노트 생성 버튼을 클릭한다면, 해당 폴더에 노트가 저장됩니다.
 

### 2. 노트 조회
<img width="800" alt="Screenshot 2024-08-22 at 13 55 14" src="https://github.com/user-attachments/assets/e458fbac-94dd-4141-83dd-4a524e9daff0">
<img width="800" alt="Screenshot 2024-08-22 at 13 50 23" src="https://github.com/user-attachments/assets/5c4abe57-40a8-43b9-8685-e6caa2362ded">

각 폴더에 저장된 노트를 조회할 수 있습니다.

### 3. 노트 / 폴더 수정
#### 폴더 이름 수정
<img width="800" alt="Screenshot 2024-08-22 at 13 50 37" src="https://github.com/user-attachments/assets/0caf33bd-5810-4a32-bdef-bcc938f98ed6">
<img width="800" alt="Screenshot 2024-08-22 at 13 50 52" src="https://github.com/user-attachments/assets/e8d6952a-2199-4ad3-b1a6-4ab7c0164367">

드롭다운의 'Rename Folder'를 클릭하여 폴더의 이름을 수정할 수 있습니다.

#### 노트 수정
<img width="800" alt="Screenshot 2024-08-22 at 13 55 14" src="https://github.com/user-attachments/assets/2747025f-66e3-4532-aaa8-c06b2f7aa54a">

조회중인 노트를 클릭하면 수정창으로 바뀌며, 내용을 변경한 후 submit 버튼을 클릭하면 변경한 내용으로 노트가 수정됩니다.

### 5. 노트 / 폴더 삭제

#### 노트 삭제
<img width="800" alt="Screenshot 2024-08-22 at 13 55 46" src="https://github.com/user-attachments/assets/daa086c9-a20f-42e3-8a9c-7cf497ce451d">

휴지통 아이콘을 클릭하면 노트 리스트에서 포커스 중인 노트를 삭제합니다.

#### 폴더 삭제
<img width="800" alt="Screenshot 2024-08-22 at 13 55 54" src="https://github.com/user-attachments/assets/b6cdb0c1-b07f-44e6-aeb8-1962c951a462">

드롭다운의 'Delete Folder'를 클릭하여 폴더를 삭제할 수 있습니다.

### 6. 노트 검색
<img width="800" alt="Screenshot 2024-08-22 at 13 57 08" src="https://github.com/user-attachments/assets/c1b576fb-9e4b-45d6-b3b1-b050e0a8515f">

돋보기 아이콘을 클릭하면 검색창이 나오며, 검색어와 일치하는 제목을 가진 노트 리스트를 확인할 수 있습니다.

결과 리스트에서 검색어는 하이라이팅되어 보여집니다.

<img width="800" alt="Screenshot 2024-08-22 at 13 57 24" src="https://github.com/user-attachments/assets/011610eb-a9d5-4444-92ac-104b2aa7538a">

결과 리스트에서 노트를 조회할 수 있습니다.

