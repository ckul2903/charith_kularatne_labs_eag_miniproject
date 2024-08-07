import axios from 'axios';

const loginHandler = async () => {
    var username = document.getElementById("username_field").value;
    var password = document.getElementById("password_field").value;
    let userId;
    
    try {
        console.log("Login handler | Getting user");
        var users = await axios.get('http://localhost:3000/api/v1/users');
        for(var userentry in users.data.data){
            const userObject =users.data.data[userentry];
            if (userObject.username===username){
                userId = userObject.userId;
                console.log("Login handler | Found user id: ",userId);

                const userData = {
                    "username":username,
                    "password":password
                }

                console.log("Login handler | Authenticating");
                const userTokens = await axios.post(`http://localhost:3000/api/v1/users/${userId}/authenticate`,userData);
                console.log("Login handler | Authenticated user id: ",userId);
            }
        }
    } catch (error) {
        console.error("Login handler | Exception occured: ",error);
        window.alert("Error authenticating");
    }
}

const registerHandler = async () =>{
    var username = document.getElementById("username_field").value;
    var password = document.getElementById("password_field").value;
    let userId;
    
    try {
        console.log("Register handler | Registering user");

        const userData = {
            "username":username,
            "password":password
        }

        console.log("Register handler | Creating user",username);
        const createdUser = await axios.post(`http://localhost:3000/api/v1/users`,userData);
        console.log(createdUser);
        console.log("Login handler | Successfully registered.");
    } catch (error) {
        console.error("Login handler | Exception occured: ",error);
        window.alert("Error authenticating");
    }
}

export {loginHandler,registerHandler}