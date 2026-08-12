import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileEditor(){
    const { user, updateProfile } = useAuth();
    const [ name, setName ] = useState(user.name);
    const [ bio, setBio ] = useState(user.bio || "");
    const [ avatar, setAvatar ] = useState(user.avatar || "");

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function updateProfileHandler(e) {
        e.preventDefault();
        setErrorMessage("");

        try {
            await updateProfile({ name, bio, avatar });
            navigate("/chat");
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return (
        <div>
            <form onSubmit={updateProfileHandler}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                <br />
                <label htmlFor="bio">Bio</label>
                <input type="text" name="bio" id="bio" value={bio} onChange={(e) => setBio(e.target.value)}/>
                <br />
                <label htmlFor="avatar">Avatar URL</label>
                <input type="text" name="avatar" id="avatar" placeholder="" value={avatar} onChange={(e) => setAvatar(e.target.value)}/>
                <br />
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <button type="submit">Update Profile</button>
            </form>
        </div>
    )
}

export default ProfileEditor;