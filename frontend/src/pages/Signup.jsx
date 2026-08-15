import { useState } from "react";
import { signup } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function Signup(){
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ name, setName ] = useState("");

    const [ errorMessage, setErrorMessage ] = useState("");

    const navigate = useNavigate();

    async function signupSubmitHandler(e){
        e.preventDefault();
        setErrorMessage("");

        try {
            await signup(username, password, confirmPassword, name);
            navigate("/login");
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return(
        <>
            <Box component="form"onSubmit={signupSubmitHandler} sx={{ maxWidth: 450, mx: "auto", mt: 8 }}>
                <Paper elevation={10} sx={{ display: "flex", flexDirection: "column", gap: 2, p: 6, borderRadius: 5 }}>
                    <Box>
                        <Typography variant="h5" color="primary">Talk It Out</Typography>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>Create account to start expressing</Typography>
                    </Box>

                    <TextField label="Username" variant="outlined" type="email" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <TextField label="Name" type="text" variant="outlined" value={name} onChange={(e) => setName(e.target.value)}/>
                    <TextField label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <TextField label="Confirm Password" type="password" variant="outlined" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                    <Button variant="outlined" type="submit">Sign up</Button>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Typography variant="body2">Already have an account?</Typography>
                        <Button component={Link} to="/login" variant="outlined">Login</Button>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}

export default Signup;