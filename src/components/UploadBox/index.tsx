import React, { useCallback, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";

import "./index.module.css"

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
        formData.append("model_type", "image-classifier")
        acceptedFiles.forEach((file) => formData.append("media", file));
        
        try {
            const response = await axios.post("http://127.0.0.1:5000/classify", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Upload successful:", response.data);

            setFinished(true)
            setLoading(false)
            onLoad(response.data.classification)
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
        accept: { "image/*": [] },
    });

    const reset = () => {
        setFinished(false)
        onLoad("")
    }

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
                    position: "relative"
                }}>
                    <Box onClick={reset}
                        sx={{
                            position: "absolute",
                            top: "-4%",
                            right: "-4%"
                        }}
                    >
                        <span className="material-symbols-outlined" style={{fontSize: "40px", color: "#f16a6a"}}>cancel</span>
                    </Box>
                    <img src={file} style={{width: "100%", height: "100%", borderRadius: "15px"}}/>
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
                        sx={{ maxWidth: "65%" }}
                        textAlign={"center"}
                    >
                        {isDragActive
                            ? "Solte o arquivo para fazer upload"
                            : "Arraste ou clique para fazer upload de uma imagem"}
                    </Typography>
                </Box>
            }
        </>
        
    );
}
