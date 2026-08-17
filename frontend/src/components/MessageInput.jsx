import { useState } from "react";
import apiRequest from "../api/client";
import { Typography, Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function MessageInput({ userId, onMessageSent }){
    const [ message, setMessage ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");

    async function sendMessage(message){
        const newMessage  = await apiRequest(`/messages/${userId}`, {
            method: "POST",
            body: JSON.stringify({ content: message})
        });
        onMessageSent(newMessage);
        setMessage("");
    }

    async function sendingMessage(e){
        e.preventDefault();
        setErrorMessage("");

        try {
            await sendMessage(message);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return(
        <Box component="form" onSubmit={sendingMessage} sx={{ p: 2, bgcolor: "background.paper", borderTop: 1, borderColor: "divider", display: "flex", flexDirection: "column", gap: 0.5 }}>
            {errorMessage && <Typography color="error" variant="caption">{errorMessage}</Typography>}
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center"}}>
                <TextField fullWidth size="small" placeholder="Type a message"  value={message} onChange={(e) => setMessage(e.target.value)} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 6 } }} />
                <IconButton color="primary" type="submit">
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default MessageInput;