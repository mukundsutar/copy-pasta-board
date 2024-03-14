
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
    const textArea = req.body; //textArea is an Object
    console.log("Received form data:", textArea);

    // Stringify the object before encryption
    encryptedData = encryptMessage(JSON.stringify(textArea));
    console.log("Encrypted data:", encryptedData);

    // Decrypt and parse the decrypted data
    decryptedData = JSON.parse(decryptMessage(encryptedData));
    // console.log("Decrypted data:", decryptedData);

    // Send the encrypted data back to the React frontend
    res.json({ message: "Form submitted successfully!" });
});

app.post("/api/submit-encrypted-form", (req, res) => {
    try {
        const { encryptedData } = req.body; // Extract encryptedData from the object
        console.log("Received encrypted data:", encryptedData);

        // Decrypt the encrypted data
        const decryptedData = decryptMessage(encryptedData);
        console.log("Decrypted data:", decryptedData);

        // Send the decrypted data back to the React frontend
        res.json(decryptedData); // 
    } catch (error) {
        console.error("Error decrypting data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/api/get-encrypted-data", (req, res) => {
    res.json({ encryptedData });
});

app.get("/api/get-decrypted-data", (req, res) => {
    res.send({ decryptedData });
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
