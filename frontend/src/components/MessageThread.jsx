import { useEffect, useState } from "react";
import apiRequest from "../api/client";
import { useAuth } from "../context/AuthContext";

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
        <div>
            <ul>
                {messages.map((m) => {
                    const isMine = m.senderId === user.id;
                    return (
                        <li key={m.id} style={{ textAlign: isMine ? "right" : "left"}}>
                            <strong>{isMine ? "Me": otherUser?.name}:</strong>
                            {m.content}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default MessageThread;