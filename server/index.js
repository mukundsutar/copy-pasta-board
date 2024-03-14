const express = require("express");
const bodyParser = require("body-parser");
const Cryptr = require("cryptr");

const cryptr = new Cryptr("myTotallySecretKey", {
    saltLength: 1,
});
const app = express();
const PORT = 3001;

app.use(bodyParser.json());

let decryptedData = "";
let encryptedData = "";

app.post("/api/submit-form", (req, res) => {
    const textArea = req.body;
    console.log("Received Data: ", textArea);
});

app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
});

// Encrypt function
const encryptMessage = (text) => {
    return cryptr.encrypt(text);
};

// Decrypt function
const decryptMessage = (text) => {
    return cryptr.decrypt(text);
};
