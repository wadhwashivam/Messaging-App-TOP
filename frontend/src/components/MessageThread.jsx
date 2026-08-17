import { useEffect, useState } from "react";
import apiRequest from "../api/client";
import { useAuth } from "../context/AuthContext";
import { Box, Typography } from "@mui/material";

function MessageThread({ userId, messages }){

    const [ otherUser, setOtherUser ] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        async function gettingOtherUser() {
            try {
                setOtherUser(await apiRequest(`/users/${userId}`));
            } catch (error) {
                console.error(error);
            }
        }
        gettingOtherUser();
    }, [userId]);

    return(
        <Box sx={{ flex: 1, overflow: "auto", p: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
            {messages.map((m) => {
                const isMine = m.senderId === user.id;
                return (
                    <Box key={m.id} sx={{ display: "flex", flexDirection: "column", alignItems: isMine? "flex-end": "flex-start"}}>
                        <Box sx={{ maxWidth: "60%", px: 2, py: 1.25, borderRadius: 4, bgcolor: isMine? "primary.main": "grey.200", color: isMine? "primary.contastText": "text.primary"}}>
                            {m.content}
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                            {new Date(m.createdAt).toLocaleTimeString([],{ hour: "numeric", minute: "2-digit" })}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
}

export default MessageThread;