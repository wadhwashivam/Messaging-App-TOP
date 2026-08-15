import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function Login(){
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    async function loginSubmitHandler(e){
        e.preventDefault();
        setErrorMessage("");

        try {
            await login(username, password);
            navigate("/chat");
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return(
        <>
            <Box component= "form" onSubmit={loginSubmitHandler} sx={{
                maxWidth: 400, mx: "auto", mt: 8
            }}>
                <Paper elevation={10} sx={{ display: "flex", flexDirection: "column", gap: 2,  p: 6, borderRadius: 5}}>
                    <Box>
                        <Typography variant="h5" color="primary" fontWeight={700}>Talk It Out</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Log in to your account</Typography>
                    </Box>
                    <TextField  label="Username" variant="outlined" type="email" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <TextField label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                    <Button variant="outlined" type="submit">Login</Button>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body2">Don't have an account?</Typography>
                        <Button component = {Link} to= "/signup" variant="outlined">Sign up</Button>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}

export default Login;