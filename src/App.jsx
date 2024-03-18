import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { Center, Divider, FormControl, Stack } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function App() {
    const [textArea, setTextArea] = useState("");
    const [encryptedData, setEncryptedData] = useState("");

    const handleChange = (e) => {
        setTextArea(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3001/api/submit-encrypt",
                { textArea }
            );

            console.log(textArea);

            setEncryptedData(response.data);

            setTextArea("");
        } catch (error) {
            console.error("Error Submitting the form:", error);
        }
    };

    return (
        <>
            <Center
                width={"100vw"}
                height={"100vh"}
                backgroundImage="url('src/assets/pattern_squiggle_copy.png')"
            >
                <FormControl>
                    <Stack spacing={10} justify={"flex-end"}>
                        <FormLabel
                            style={{ fontSize: "30px" }}
                            backgroundColor={"#65c3ba"}
                            borderRadius={10}
                        >
                            Copy-Pasta here:
                        </FormLabel>
                        <Textarea
                            width={400}
                            height={400}
                            size="lg"
                            resize={"none"}
                            // backgroundColor={'aliceblue'}
                            // textColor={'black'}
                            placeholder="enter text here.."
                            value={textArea}
                            onChange={handleChange}
                        />

                        <HStack justify={"center"}>
                            <Button
                                type="submit"
                                width={"200px"}
                                onClick={handleSubmit}
                                backgroundColor={"#009687"}
                                fontSize={"25px"}
                                p={5}
                            >
                                Submit
                            </Button>
                        </HStack>
                        <Divider colorScheme="linkedin" />

                        <HStack justify={"center"}>
                            {encryptedData && (
                                <>
                                    <Link
                                        href={`${encryptedData}`}
                                        isExternal
                                        backgroundColor={"#009687"}
                                        color={"aliceblue"}
                                        fontSize={30}
                                        _hover={{ color: "#65c3ba" }}
                                        p={15}
                                        borderRadius={10}
                                    >
                                        your Unique Link <ExternalLinkIcon />
                                    </Link>
                                </>
                            )}
                        </HStack>
                    </Stack>
                </FormControl>
            </Center>
            <Outlet />
        </>
    );
}

export default App;
