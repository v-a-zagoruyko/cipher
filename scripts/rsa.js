const generateKey = async () => {
  return await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
};

const exportKey = async (key) => {
  return await window.crypto.subtle.exportKey("jwk", key);
};

const encrypt = (publicKey, encoded) => {
  return window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    encoded
  );
};

const encode = async (message, keys) => {
  const enc = new TextEncoder();
  const data = enc.encode(message);
  const encryptedData = await encrypt(keys.publicKey, data);
  return String.fromCharCode.apply(null, new Uint16Array(encryptedData));
};

document.addEventListener("DOMContentLoaded", async () => {
  const keys = await generateKey();
  const exportedKey = await exportKey(keys.privateKey);
  document.getElementById("rsa-ciphertext").value = await encode(
    document.getElementById("rsa-message").value,
    keys
  );

  const p = document.getElementById("rsa-p-number");
  const q = document.getElementById("rsa-q-number");
  const n = document.getElementById("rsa-n-number");
  const fn = document.getElementById("rsa-fn-number");
  const e = document.getElementById("rsa-e-number");
  const d = document.getElementById("rsa-d-number");
  p.innerText = exportedKey.p;
  q.innerText = exportedKey.q;
  n.innerText = exportedKey.n;
  fn.innerText = exportedKey.qi;
  e.innerText = exportedKey.e;
  d.innerText = exportedKey.d;

  const message = document.getElementById("rsa-message");
  const ciphertext = document.getElementById("rsa-ciphertext");
  message.addEventListener("input", async () => {
    ciphertext.value = await encode(message.value, keys);
  });
});
