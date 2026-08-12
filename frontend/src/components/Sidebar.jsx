import { useState, useEffect } from "react";
import apiRequest from "../api/client";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

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

    console.log("userList: ", userList);
    console.log("current User: ", user);
    console.log("otherUsers: ", otherUsers);
    return(
        <div>
            <button onClick={logout}>Logout</button>
            <Link to='/profile'>Edit Profile</Link>
            <hr />
            <ul>
                {otherUsers.map((u) => {
                    return (
                        <li key={u.id}>
                            <Link to={`/chat/${u.id}`}>{u.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Sidebar;