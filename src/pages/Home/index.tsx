import { Stack, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import UploadBox from "../../components/UploadBox";
import { useState } from "react";

import "./"

export default function Home() {
    const [finished, setFinished] = useState(false)
    const [text, setText] = useState<string | null>(null)

    const onLoad = (value: string) => {
        setText(value)
    }

    return (
        <>
            <Navbar>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Typography>ASL</Typography>
                    <Typography>Translate</Typography>
                </Stack>
            </Navbar>

            <Stack
                sx={{minHeight: "calc(100vh - 60px)", minWidth: "100vw"}}
                bgcolor={"#1E1E1E"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={text ? "flex-start" : "center"}
                py={4}
            >
                <UploadBox finished={finished} setFinished={setFinished} onLoad={onLoad}/>

                {text &&
                    <Stack
                        flexDirection={"column"}
                        gap={3}
                        width={"80%"}
                        bgcolor={"#FFFFFF2D"}
                        color={"white"}
                        mt={2}
                        borderRadius={"15px"}
                        padding={3}

                    >
                        <Typography variant="h3" textAlign={"center"}>Letra: {text}</Typography>
                    </Stack>
                }

            </Stack>

        </>
    )
}