import { useState } from "react";
import { signup } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
        <form onSubmit={signupSubmitHandler}>
            <label htmlFor="username">Username: </label>
            <input type="email" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <br />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br />
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <br />
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
            <br />

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button type="submit">Sign Up</button>
            <p>Already have an account? 
                <Link to = "/login">Log in</Link>
            </p>
        </form>
        </>
    )
}

export default Signup;