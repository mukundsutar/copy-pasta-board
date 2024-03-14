import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Textarea } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";

export default function PastedData() {
    

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
