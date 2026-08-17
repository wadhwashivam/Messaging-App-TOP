import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Box, Paper, Typography, TextField, Button, Avatar, Stack } from "@mui/material";

function ProfileEditor(){
    const { user, updateProfile } = useAuth();
    const [ name, setName ] = useState(user.name);
    const [ bio, setBio ] = useState(user.bio || "");
    const [ avatar, setAvatar ] = useState(user.avatar || "");
    const initials = name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();

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
        <Box component= "form" onSubmit={updateProfileHandler} sx={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, overflowY: 'auto' }}>
            <Paper elevation={2} sx={{ width: 460, maxWidth: '100%', p: 5, display: 'flex', flexDirection: 'column', gap: 3, borderRadius: 5 }}>
                <Typography variant="h5" fontWeight={700}>Edit Profile</Typography>
                <Stack direction="row" spacing={2} alignItems = "center">
                    <Avatar src={avatar || undefined} sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: 18 }}>
                        {!avatar && initials}
                    </Avatar>
                    <Typography variant="body2">Avatar Preview</Typography>
                </Stack>
                <Box component="form" sx={{ display: "grid", gap: 2.5 }} onSubmit={(e) => { e.preventDefault()}}>
                    <TextField label= "Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                    <TextField label= "Bio" value={bio} onChange={(e) =>setBio(e.target.value)} multiline rows={4} fullWidth />
                    <TextField label= "Avatar URL" placeholder="https://..." value={avatar} onChange={(e) => setAvatar(e.target.value)} fullWidth />
                    
                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}

                    <Button type="submit" variant="contained" size="large" fullWidth >Save</Button>
                </Box>
                <Button component= {Link} to="/chat" variant="outlined">← Back to Chat</Button>
            </Paper>
        </Box>
    );
}

export default ProfileEditor;