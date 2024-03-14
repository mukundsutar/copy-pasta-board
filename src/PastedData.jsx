import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Textarea } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";

export default function PastedData() {
    const [decryptedData, setDecryptedData] = useState();

    let location = useLocation();
    // console.log(location.key);
    const encryptedData = location.pathname.slice(1);

    useEffect(() => {
        const handleSubmit = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:3001/api/submit-encrypted-form",
                    { encryptedData }
                );
                // console.log(response.data);
                
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        };

        handleSubmit();
    }, []);

    useEffect(() => {
        const handleGetDecryptedData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/api/get-decrypted-data"
                );
                console.log("Response data:", response.data); 
                setDecryptedData(JSON.stringify(response.data.decryptedData));
            } catch (error) {
                console.error("Error getting encrypted data:", error);
            }
        };

        handleGetDecryptedData();
    }, []); // Run once when the component mounts

    return (
        <>
            <Center width={"100vw"} height={"100vh"}>
            {decryptedData && (
                    <Textarea
                        defaultValue={decryptedData}
                    />
                )}
            </Center>
        </>
    );
}
