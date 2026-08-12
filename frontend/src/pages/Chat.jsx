import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import NoConversationSelected from "../components/NoConversationSelected";

function Chat(){
    const { userId } = useParams();

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            {userId ? <ChatWindow userId = {userId} />: <NoConversationSelected />}
        </div>
    );
}


export default Chat;