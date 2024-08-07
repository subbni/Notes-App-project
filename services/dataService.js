const directories = [
  {
    id: 1,
    name: 'All',
    numberOfNotes: 2,
  },
  {
    id: 2,
    name: 'Notes',
    numberOfNotes: 2,
  },
  {
    id: 3,
    name: 'Test',
    numberOfNotes: 1,
  },
];

const notes = [
  {
    id: 1,
    title: 'First Test Note',
    content: 'This is the first test note.',
    directory: 'Notes',
  },
  {
    id: 2,
    title: 'Second Test Note',
    content: 'This is the second test note.',
    directory: 'Notes',
  },
  {
    id: 3,
    title: 'Third Test Note',
    content: 'This is the third test note.',
    directory: 'Test',
  },
];

let currentNoteId = 4;

export const getDirectories = () => directories;

export const getNotes = (directory) => {
  if (directory === 'All') return notes;
  else {
    return notes.filter((note) => note.directory == directory);
  }
};

export const getNoteById = (id) => {
  // id는 string으로 들어옴
  return notes.find((note) => note.id === Number(id));
};
