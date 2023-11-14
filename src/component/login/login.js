import React, { useState } from "react";
import Button from '@mui/material/Button';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const host_url = process.env.REACT_APP_HOST_URL;

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        switch (name) {
            case "username":
                setUsername(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                console.log("Invalid input name");
        }
    }

    const handleLoginClick = async () => {
        const userData = {
            UsrerName: username,
            Password: password,
        };
        console.log(userData);
        try {
            const response = await axios.post(`${host_url}user/login`, userData); // Changed to POST request
            console.log("Response: ", response);

            if (response.status === 200) {
                const token = response.data.data;
                localStorage.setItem('token', token);
                setUsername("");
                setPassword("");
                navigate("/dashboard");
            } else {
                console.log("Login failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div style={{ textAlign: "center", margin: "100px", background: "lightblue",borderRadius:"6px" }}>
            <form className="form-signin">
                <div style={{ padding: 10 }}>
                    <h1 style={{ borderRadius: "10px" }}>Login</h1>
                    <div className="form-label-group" style={{ margin: "20px" }}>
                        <label htmlFor="username" style={{ fontSize: 20, fontFamily: "serif" }}>Username</label>
                        <input onChange={handleInputChange} name="username" value={username} type="text" className="form-control" placeholder="Username" />
                    </div>
                    <div className="form-label-group">
                        <label htmlFor="inputPassword" style={{ fontSize: 20, fontFamily: "serif" }}>Password</label>
                        <input onChange={handleInputChange} name="password" value={password} type="password" className="form-control" placeholder="Password" />
                    </div>

                    <div style={{ margin: "20px" }}>
                        <Button variant="contained" onClick={handleLoginClick} style={{ background: "#0768A8", color: "black", fontSize: 20, fontFamily: "serif" }}>Login</Button>
                        <Link to="/">
                        <Button variant="contained" style={{ background: "#0768A8", color: "black", fontSize: 20, fontFamily: "serif", marginLeft: "33px" }}>Sign Up</Button>
                        </Link>  
                    </div>
                    <p className="mt-5 mb-3 text-muted text-center">© 2023</p>
                </div>
            </form>
        </div>
    );
}

export default Login;
