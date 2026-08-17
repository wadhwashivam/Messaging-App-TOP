import { useState, useEffect } from "react";
import apiRequest from "../api/client";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Button, Typography, Box, List, ListItemButton, ListItemAvatar, ListItemText, Avatar, Divider } from "@mui/material";

function Sidebar(){
    const [ userList, setUserList ] = useState([]);
    const { user, logout } = useAuth(); 
    
    useEffect(()=>{
        async function sideBarFunction(){
            try {
                setUserList(await apiRequest("/users"));
            } catch (error) {
                console.error(error);
            }
        }
        sideBarFunction();
    }, []);

    const otherUsers = userList.filter((u) => u.id !== user.id);

    function getInitials(name){
        return name.split(" ").map((word) => word[0]).join("").toUpperCase().slice(0,2);
    }

    return(
        <Box sx={{ width: 300, minWidth: 220, flexShrink: 0, bgcolor: "background.paper", borderRight: 1, borderColor: "divider", display: "flex", flexDirection: "column", height: "100vh" }}>
            <Box sx={{ p: 2.5, borderBottom: 1, borderColor: "divider" }}>
                <Typography variant="h6" color="primary" fontWeight ={700}>Talk It Out</Typography>
            </Box>

            <List sx={{ flex: 1, overflowY: 'auto', py: 0 }}>
                {otherUsers.map((u) => (
                <ListItemButton key={u.id} component={Link} to= {`/chat/${u.id}`}>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>{getInitials(u.name)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={u.name} />
                </ListItemButton>
                ))}
            </List>

            <Divider />
            <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Button component= {Link} to = "/profile" variant= "text">Edit Profile</Button>
                <Button variant="outlined" onClick={logout}>Logout</Button>
            </Box>
        </Box>
    );
}

export default Sidebar;