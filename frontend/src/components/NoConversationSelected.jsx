import { Box, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

function NoConversationSelected(){
    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, color: "text.disabled" }}>
            <ChatBubbleOutlineIcon sx={{ fontSize: 56 }} />
            <Typography color="text.secondary">Select a conversation to start chatting.</Typography>
        </Box>
    )
}

export default NoConversationSelected;