import { Box, Stack } from "@mui/material";
import { ReactElement } from "react";

export default function Navbar({children}: {children: ReactElement}) {
    return (
        <>
            <Box height={"60px"} width={"100vw"}></Box>
            <Stack 
                sx={{position: "fixed", height: "60px", width: "100vw", top: 0, left: 0}}
                bgcolor={"#002153"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                padding={"15px"}
                color="white"
                zIndex={999}
            >
                {children}
            </Stack>
        </>
    )
}