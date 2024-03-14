import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import { FormControl, flexbox } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
// import { Link } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

function App() {
    const [textArea, setTextArea] = useState("");
    const [encryptedData, setEncryptedData] = useState("");

    const handleChange = (e) => {
        setTextArea(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3001/api/submit-form", {textArea}
            );

            console.log(textArea);
        } catch (error) {
            console.error("Error Submitting the form:", error);
        }
    };

    return (
        <>
            <Center width={"100vw"} height={"100vh"}>
                <FormControl>
                    <VStack>
                        <FormLabel>Copy-Pasta here:</FormLabel>
                        <Textarea
                            maxWidth={500}
                            maxHeight={500}
                            size="lg"
                            // resize={"none"}
                            placeholder="enter text here.."
                            value={textArea}
                            onChange={handleChange}
                        />

                        <Button type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button
                        // onClick={handleGetEncryptedData}
                        >
                            Generate URL
                        </Button>

                        {encryptedData && (
                            <>
                                <Text>Your URL:</Text>

                                <Link to={`${encryptedData}`}>
                                    Your unique URL
                                </Link>
                            </>
                        )}
                    </VStack>
                </FormControl>
            </Center>
            <Outlet />
        </>
    );
}

export default App;
