import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

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
        <form onSubmit={loginSubmitHandler}>
            <label htmlFor="username">Username</label>
            <input type="email" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <br />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br />

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button type="submit">Login</button>
        </form>
        </>
    )
}

export default Login;