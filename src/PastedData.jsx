import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Textarea } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";

export default function PastedData() {
    const [decryptedData, setDecryptedData] = useState("");

    let location = useLocation();
    const cipher = location.pathname.slice(1);

    useEffect(() => {
        const getDecrypted = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:3001/api/submit-decrypt",
                    { cipher }
                );
                setDecryptedData(response.data);
            } catch (error) {
                console.error("Error getting encrypted data:", error);
            }
        };

        getDecrypted();
    }, []);

    return (
        <>
            <Center width={"100vw"} height={"100vh"}>
                <Textarea defaultValue={decryptedData} />
            </Center>
        </>
    );
}
