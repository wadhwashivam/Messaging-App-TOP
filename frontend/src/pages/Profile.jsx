import { Link } from "react-router-dom";
import ProfileEditor from "../components/ProfileEditor";

function Profile(){
    return(
        <div>
            <Link to= "/chat"> Back to Chats </Link>
            <h2>Edit Profile</h2>
            <ProfileEditor />
        </div>
    );
}

export default Profile;

