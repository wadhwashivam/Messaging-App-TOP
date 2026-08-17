import MessageThread from "./MessageThread";
import MessageInput from "./MessageInput";
import apiRequest from "../api/client";
import { useEffect, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";

function ChatWindow({ userId }){

    const [ messages, setMessages ] = useState([]);
    const [ otherUser, setOtherUser ] = useState(null);

    useEffect(()=>{
        async function gettingMessages(){
            try {
                setMessages(await apiRequest(`/messages/${userId}`));
            } catch (error) {
                console.error(error);
            }
        }
        gettingMessages();
        
        const intervalId = setInterval(gettingMessages, 3000);

        return () =>{
            clearInterval(intervalId);
        };
    }, [userId]);

    useEffect(() => {
        async function gettingOtherUser(){
            try {
                setOtherUser(await apiRequest(`/users/${userId}`));
            } catch (error) {
                console.error(error);
            }
        }
        gettingOtherUser();
    }, [userId]);
    
    function handleNewMessage(newMessage){
        setMessages((prev) => [...prev, newMessage]);
    }

    function getInitials(name){
        return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0,2);
    }

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", bgcolor: "background.default", minWidth: 0}} >
            {otherUser && (
                <Box sx={{ p: 2, bgcolor: "background.paper", borderBottom: 1, borderColor: "divider", display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40, fontSize: 13 }} >
                        {getInitials(otherUser.name)}
                    </Avatar>
                    <Typography fontWeight = {500}>{otherUser.name}</Typography>
                </Box>
            )}
            <MessageThread messages = { messages} userId={ userId }/>
            <MessageInput userId = {userId} onMessageSent = {handleNewMessage} />
        </Box>
    ) 
}

export default ChatWindow;