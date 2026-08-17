import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import NoConversationSelected from "../components/NoConversationSelected";
import { Box } from "@mui/material";

function Chat(){
    const { userId } = useParams();

    return (
        <Box sx={{ height: "100vh", display: "flex" }}>
            <Sidebar />
            {userId ? <ChatWindow userId = {userId} />: <NoConversationSelected />}
        </Box>
    );
}


export default Chat;