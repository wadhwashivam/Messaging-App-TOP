import { useState } from "react";
import apiRequest from "../api/client";

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
        <div>
            <form onSubmit={sendingMessage}>
                <input type="text" name = "message" id = "message" placeholder="Write message..." value={message} onChange={(e) => setMessage(e.target.value)}/>
                <br />
                {errorMessage && <p style={{ color: "red"}}>{errorMessage}</p>}
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default MessageInput;