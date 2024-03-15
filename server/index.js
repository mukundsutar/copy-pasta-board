const express = require("express");
const bodyParser = require("body-parser");
const Cryptr = require("cryptr");
const cors = require("cors");

const app = express();
const PORT = 3001;
app.use(
    bodyParser.json(),
    cors({
        origin: "http://localhost:5173",
    })
);

const cryptr = new Cryptr("myTotallySecretKey", {
    saltLength: 1,
});

let decryptedData = "";
let encryptedData = "";

app.post("/api/submit-encrypt", (req, res) => {
    let textArea = req.body;

    textArea = JSON.stringify(textArea)
        .replace('{"textArea":"', "")
        .replace('"}', "");

    console.log("Received Data: ", textArea);
    console.log();

    encryptedData = encryptMessage(textArea);

    console.log("Encrypted: " + encryptedData);

    res.send(encryptedData);
});

app.post("/api/submit-decrypt", (req, res) => {
    let cipher = req.body;

    cipher = JSON.stringify(cipher)
        .replace('{"cipher":"', "")
        .replace('"}', "");

    console.log();

    decryptedData = decryptMessage(cipher);

    console.log("Decrypted: " + decryptedData);

    res.send(decryptedData);
});

app.get("/api/get-encrypted", (req, res) => {
    res.send(encryptedData);
});

app.get("/api/get-decrypted", (req, res) => {
    res.send(decryptedData);
});

app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
    console.log();
});

const encryptMessage = (text) => {
    return cryptr.encrypt(text);
};

const decryptMessage = (text) => {
    return cryptr.decrypt(text);
};
