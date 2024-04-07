async function decryptHtml(password: string, encryptedStr: string) {
    let enc = new TextEncoder();

    let encryptStringArray = encryptedStr.split("_");
    let encryptedHtml = Buffer.from(encryptStringArray[0], "base64");
    let iv = Buffer.from(encryptStringArray[1], "base64");
    let salt = Buffer.from(encryptStringArray[2], "base64");

    let keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"],
    );

    let key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"],
    );

    let decryptedHtml: any;

    decryptedHtml = await crypto.subtle
      .decrypt(
        {
          name: "AES-GCM",
          iv: iv,
        },
        key,
        encryptedHtml,
      )
      .catch((e) => {});

    let dec = new TextDecoder();
    return dec.decode(decryptedHtml);
  }
  exports.decryptHtml = decryptHtml