import MessageThread from "./MessageThread";
import MessageInput from "./MessageInput";
import apiRequest from "../api/client";
import { useEffect, useState } from "react";

function ChatWindow({ userId }){

    const [ messages, setMessages ] = useState([]);

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
    
    function handleNewMessage(newMessage){
        setMessages((prev) => [...prev, newMessage]);
    }

    return (
        <>
        <MessageThread messages = { messages} userId={ userId }/>
        <MessageInput userId = {userId} onMessageSent = {handleNewMessage} />
        </>
    ) 
}

export default ChatWindow;