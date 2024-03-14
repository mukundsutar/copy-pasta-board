const express = require("express");
const bodyParser = require("body-parser");
const Cryptr = require("cryptr");
const { text } = require("stream/consumers");

const cryptr = new Cryptr("myTotallySecretKey", {
    saltLength: 1,
});
const app = express();
const PORT = 3001;

app.use(bodyParser.json());

let decryptedData = "";
let encryptedData = "";

app.post("/api/submit-form", (req, res) => {
    let textArea = req.body;
    console.log("Received Data: ", textArea);
    console.log();

    textArea = JSON.stringify(textArea);

    encryptedData = encryptMessage(textArea);

    decryptedData = decryptMessage(encryptMessage(textArea))
        .replace('{"textArea":"', "")
        .replace('"}', "");

    console.log("Encrypted: " + encryptedData);
    console.log("Decrypted: " + decryptedData);
});

app.get("/api/get-encrypted", (req, res) => {
    res.send(encryptedData);
});

app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
    console.log();
});

// Encrypt function
const encryptMessage = (text) => {
    return cryptr.encrypt(text);
};

// Decrypt function
const decryptMessage = (text) => {
    return cryptr.decrypt(text);
};
