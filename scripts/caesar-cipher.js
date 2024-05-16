import {
  alphabet,
  getAlphabetByCharacter,
  getSafeIntegerFromText,
} from "./utils.js";

const caesarCipher = (message, shift) =>
  message.split("").reduce((acc, c) => {
    const alphabet = getAlphabetByCharacter(c);

    if (alphabet === "") {
      return acc + c;
    }

    let nextIndex = alphabet.indexOf(c) + getSafeIntegerFromText(shift);
    nextIndex =
      nextIndex < 0
        ? alphabet.length - (Math.abs(nextIndex) % alphabet.length) - 1
        : nextIndex % alphabet.length;

    return acc + alphabet[nextIndex];
  }, "");

const renderAlphabetTable = (shift) => {
  const alphabetTable = document.getElementById("cc-alphabet");
  alphabetTable.innerHTML = "";

  const emptyRow = document.createElement("tr");
  const enRow = document.createElement("tr");
  const enDelimeterRow = document.createElement("tr");
  const enCipherRow = document.createElement("tr");
  const ruRow = document.createElement("tr");
  const ruDelimeterRow = document.createElement("tr");
  const ruCipherRow = document.createElement("tr");

  const ruAlphabet = alphabet.ru.upper.split("").map((c) => {
    const td = document.createElement("td");
    td.innerText = c;
    return td;
  });
  const ruDelimeter = alphabet.ru.upper.split("").map((c) => {
    const td = document.createElement("td");
    td.innerText = "↓";
    return td;
  });
  const ruCipherAlphabet = alphabet.ru.upper.split("").map((c) => {
    const td = document.createElement("td");
    td.innerText = caesarCipher(c, shift);
    return td;
  });
  ruRow.append(...ruAlphabet);
  ruDelimeterRow.append(...ruDelimeter);
  ruCipherRow.append(...ruCipherAlphabet);

  const tableDelimeter = alphabet.ru.upper.split("").map(() => {
    const td = document.createElement("td");
    td.innerText = "\u00A0";
    return td;
  });
  emptyRow.append(...tableDelimeter);

  const enAlphabet = alphabet.en.upper.split("").map((c) => {
    const td = document.createElement("td");
    td.innerText = c;
    return td;
  });
  const enDelimeter = alphabet.en.upper.split("").map((c) => {
    const td = document.createElement("td");
    td.innerText = "↓";
    return td;
  });
  const enCipherAlphabet = alphabet.en.upper.split("").map((c) => {
    const td = document.createElement("td");
    td.innerText = caesarCipher(c, shift);
    return td;
  });
  enRow.append(...enAlphabet);
  enDelimeterRow.append(...enDelimeter);
  enCipherRow.append(...enCipherAlphabet);

  alphabetTable.append(
    ruRow,
    ruDelimeterRow,
    ruCipherRow,
    emptyRow,
    emptyRow,
    enRow,
    enDelimeterRow,
    enCipherRow
  );
};

document.addEventListener("DOMContentLoaded", () => {
  renderAlphabetTable(0);

  const message = document.getElementById("cc-message");
  message.addEventListener("input", () => {
    ciphertext.value = caesarCipher(message.value, shift.value);
  });

  const shift = document.getElementById("cc-shift");
  shift.addEventListener("input", () => {
    ciphertext.value = caesarCipher(message.value, shift.value);
    renderAlphabetTable(shift.value);
    document.getElementById("cc-shift-text").innerText = getSafeIntegerFromText(
      shift.value
    );
  });

  const ciphertext = document.getElementById("cc-ciphertext");
  ciphertext.addEventListener("input", () => {
    message.value = caesarCipher(ciphertext.value, -shift.value);
  });

  document.getElementById(
    "cc-shift-help-text"
  ).innerText = `Максимальное значение ключа ${Number.MAX_SAFE_INTEGER}, а минимальное ${Number.MIN_SAFE_INTEGER}`;
});
