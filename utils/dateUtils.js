// localStorage에 저장된 date정보 String -> Date -> formatted String

export function formatDate(dateString) {
  const inputDate = new Date(dateString);

  const year = inputDate.getFullYear();
  const month = inputDate.getMonth() + 1;
  const day = inputDate.getDate();
  const hours = String(inputDate.getHours()).padStart(2, '0');
  const minutes = String(inputDate.getMinutes()).padStart(2, '0');

  const formattedString = `${year}/${month}/${day} ${hours}:${minutes}`;
  return formattedString;
}

export function formatDateShort(dateString) {
  const inputDate = new Date(dateString);

  const year = String(inputDate.getFullYear()).slice(-2);
  const month = inputDate.getMonth() + 1;
  const day = inputDate.getDate();

  const formattedString = `${year}/${month}/${day}`;
  return formattedString;
}
