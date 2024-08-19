// export const phoneFormatter = (input: string) => {
//   const digitsOnly = input.replace(/[^\d+]/g, ""); // Убираем все, кроме цифр и +
//
//   let formatted;
//
//   if (digitsOnly.startsWith("+")) {
//     formatted = "+" + digitsOnly.substring(1, 4); // Код страны
//   } else {
//     formatted = digitsOnly.substring(0, 4); // Код страны, если + не введен
//   }
//
//   if (digitsOnly.length > 3) {
//     formatted += " " + digitsOnly.substring(4, 6); // Первая часть номера
//   }
//   if (digitsOnly.length > 5) {
//     formatted += " " + digitsOnly.substring(6, 9); // Вторая часть номера
//   }
//   if (digitsOnly.length > 8) {
//     formatted += " " + digitsOnly.substring(9, 11); // Третья часть номера
//   }
//   if (digitsOnly.length > 11) {
//     formatted += " " + digitsOnly.substring(11, 13); // Четвертая часть номера
//   }
//
//   return formatted.trim(); // Убираем пробелы по краям
// };
export const phoneFormatter = (input: string) => {
  // Убираем все, кроме цифр
  const digitsOnly = input.replace(/\D/g, "");

  let formatted = "";

  if (digitsOnly.length > 0) {
    formatted += digitsOnly.substring(0, 3); // Код страны
  }
  if (digitsOnly.length > 3) {
    formatted += " " + digitsOnly.substring(3, 5); // Первая часть номера
  }
  if (digitsOnly.length > 5) {
    formatted += " " + digitsOnly.substring(5, 8); // Вторая часть номера
  }
  if (digitsOnly.length > 8) {
    formatted += " " + digitsOnly.substring(8, 10); // Третья часть номера
  }
  if (digitsOnly.length > 10) {
    formatted += " " + digitsOnly.substring(10, 12); // Четвертая часть номера
  }

  return formatted.trim(); // Убираем пробелы по краям
};
