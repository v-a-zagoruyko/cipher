const russianAlphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
const englishAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const alphabet = {
  ru: {
    upper: russianAlphabet,
    lower: russianAlphabet.toLowerCase(),
  },
  en: {
    upper: englishAlphabet,
    lower: englishAlphabet.toLowerCase(),
  },
};

export const getAlphabetByCharacter = (char) => {
  if (alphabet.en.lower.indexOf(char) !== -1) {
    return alphabet.en.lower;
  }
  if (alphabet.en.upper.indexOf(char) !== -1) {
    return alphabet.en.upper;
  }
  if (alphabet.ru.lower.indexOf(char) !== -1) {
    return alphabet.ru.lower;
  }
  if (alphabet.ru.upper.indexOf(char) !== -1) {
    return alphabet.ru.upper;
  }
  return "";
};

export const getSafeIntegerFromText = (text) => {
  const n = parseInt(text) || 0;
  if (n < Number.MIN_SAFE_INTEGER || n > Number.MAX_SAFE_INTEGER) {
    return 0;
  }
  return n;
};
