import React, { useCallback, useState } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";

type UploadBoxProps = {
    finished: boolean
    setFinished: (value: boolean) => void
    onLoad: (value: string) => void
}

export default function UploadBox({finished, setFinished, onLoad}: UploadBoxProps) {
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<string>("")

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        setLoading(true)

        const formData = new FormData();
        acceptedFiles.forEach((file) => formData.append("files", file));

        setFinished(true)
        setLoading(false)
        onLoad("teste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteseste testeteste testeteste testeteste testeteste testeteste testeteste testeteste teste")
        const reader = new FileReader()
        reader.readAsDataURL(acceptedFiles[0])
        reader.onloadend = () => {
            setFile(reader.result as 'string')
            console.log(reader.result)
        }
        return
        
        try {
            const response = await axios.post("https://your-api-url/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Upload successful:", response.data);
            alert("File uploaded successfully!");

            setFinished(true)
            setLoading(false)
            const reader = new FileReader()
            reader.readAsDataURL(acceptedFiles[0])
            reader.onloadend = () => {
            setFile(reader.result as 'string')
            console.log(reader.result)
        }
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload the file. Please try again.");
            setLoading(false)
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: { "video/*": [], "image/*": [] },
    });

    return (
        <>
            { (finished && file) &&

                <Box sx={{
                    backgroundColor: "#FFFFFF49",
                    color: "white",
                    aspectRatio: "16/9",
                    width: "500px",
                    borderRadius: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    border: "2px dashed",
                    borderColor: "white",
                    cursor: "pointer",
                }}>
                    <video src={file} controls style={{width: "100%", height: "100%", borderRadius: "15px"}}/>
                </Box>
            }

            {(loading && !finished) &&
                <Box sx={{
                    backgroundColor: "#FFFFFF49",
                    color: "white",
                    aspectRatio: "16/9",
                    width: "500px",
                    borderRadius: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    border: "2px dashed",
                    borderColor: "white",
                    cursor: "pointer",
                }}>
                    <CircularProgress/>
                </Box>
            }

            { (!loading && !finished) &&
                <Box
                    {...getRootProps()}
                    sx={{
                        backgroundColor: isDragActive ? "#90CAF9" : "#FFFFFF49",
                        color: "white",
                        aspectRatio: "16/9",
                        width: "500px",
                        borderRadius: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        border: "2px dashed",
                        borderColor: isDragActive ? "#42A5F5" : "white",
                        cursor: "pointer",
                    }}
                >
                    <input {...getInputProps()} />
                    <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "140px", color: "white" }}
                    >
                        cloud_upload
                    </span>
                    <Typography
                        variant="h6"
                        sx={{ maxWidth: "50%" }}
                        textAlign={"center"}
                    >
                        {isDragActive
                            ? "Solte o arquivo para fazer upload"
                            : "Arraste ou clique para fazer upload de um vídeo"}
                    </Typography>
                </Box>
            }
        </>
        
    );
}
