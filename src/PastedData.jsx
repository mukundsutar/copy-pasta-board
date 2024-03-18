import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Textarea } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";

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
            <Center
                width={"100vw"}
                height={"100vh"}
                backgroundImage="url('src/assets/pattern_squiggle_paste.png')"
            >
                <VStack spacing={30}>
                    <Textarea
                        width={400}
                        height={400}
                        resize={"none"}
                        defaultValue={decryptedData}
                    />

                    <Button
                        backgroundColor={"#65c3ba"}
                        color={"#009687"}
                        _hover={{ color: "aliceblue" }}
                    >
                        Go back to copying?
                    </Button>
                </VStack>
            </Center>
        </>
    );
}
