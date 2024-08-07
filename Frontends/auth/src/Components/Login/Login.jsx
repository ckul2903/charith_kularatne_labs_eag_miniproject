import React, { useState } from "react";  
import './Login.css';
import axios from 'axios';

import login_icon from '../Assets/login.png';
import password_icon from '../Assets/password.png';

function LoginComponent(){
    const [user,setUser] = useState(null);

    const loginHandler = () =>{
        const username = document.getElementById("username_field").value
        window.alert("Login " + username);
    }

    const registerHandler = (user) =>{
        window.alert("Register" + user);
    }

    return (
        <div className="container">
            <div className="header">
                <div className="text">Sign In</div>
                <div className="underline"></div>
            </div>
            <div className="loginform">
                <div className="inputs">
                    <div className="input">
                        <img src={login_icon} alt=""/>
                        <span>Username</span>
                        <input type="text" id="username_field"/>
                    </div>
                    <div className="input">
                        <img src={password_icon} alt=""/>
                        <span>Password</span>
                        <input type="password"/>
                    </div>
                </div>
                <div className="submit_container">
                    <div type="button" className="submit" onClick={registerHandler}>Register</div>
                    <div type="button" className="submit" onClick={loginHandler}>Login</div>
                </div>
            </div>
        </div>
    )
};
export default LoginComponent;