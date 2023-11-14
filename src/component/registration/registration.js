import React from "react";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from "axios";
import { Link } from 'react-router-dom';

const host_url = process.env.REACT_APP_HOST_URL;

function Registration() {
    const [UsrerNames , setUsrName] = React.useState("");
    const [Emails , setUserEmail] = React.useState("");
    const [Passwords , setUserPasswords] = React.useState("");

    const HandleInputChange = (e) => {
      const { name, value } = e.target;       
      console.log(name, value);
      switch (name) {
          case "username":
            setUsrName(value);
              break;
          case "usereemail":
            setUserEmail(value);
              break;
          case "password":
            setUserPasswords(value);
              break;
          default:
              console.log("Invalid input name");
      }
  }

  const handleSignUpclick = async () => {
    const userdata = {
      UsrerName:UsrerNames ,
      Email : Emails,
      Password: Passwords,
    }
    console.log(userdata)
    const response = await axios.post(`${host_url}users/register`, userdata);
    console.log("Response: ", response);
    const token = response.data.data;
    localStorage.setItem('token', token);

    setUsrName("")
    setUserEmail("")
    setUserPasswords("")
  } 
  
    return (
        <>
  <React.Fragment> 
    <div  >
    <CardContent sx={{justifyContent:"center" , alignItems:"center", display:"flex",flexDirection:"column",mt:12}}>
    <div style={{background:"lightblue", padding:20,borderRadius:"10px"}}>
      <Typography sx={{ fontSize: 20 ,px:5,borderRadius:"10px"}} color="black" gutterBottom>
        <h1>REGISTRATION</h1>
      </Typography>


   <div > 
  <Typography variant="body2" sx={{ fontSize: 15, margin: "10px",textAlign:"center" }}>
    <label for="username" style={{fontFamily: "serif"}}>Username:</label>
    <input  onChange={HandleInputChange} type="text"   placeholder="username" name="username"  value={UsrerNames}/>
  </Typography>
  <Typography variant="body2" sx={{ fontSize: 15, margin: "10px",textAlign:"center" }}>
    <label for="email" style={{margin:"12px",fontFamily: "serif"}}>Email:</label>   
    <input  onChange={HandleInputChange} type="email"  name="usereemail" value={Emails} placeholder="email" />
  </Typography>
  <Typography variant="body2" sx={{ fontSize: 15, margin: "10px",textAlign:"center" }}>
    <label for="password" style={{fontFamily: "serif",margin:"1px"}}>Password:</label>
    <input onChange={HandleInputChange} type="password" name="password" value={Passwords} placeholder="password" />
  </Typography>
  </div>


  <div style={{margin:"20px"}}> 
   <Button variant="contained" onClick={handleSignUpclick} style={{background: "#0768A8",color:"black",fontSize: 20,fontFamily:"serif", margin:"40px"}} >Sign Up</Button>
   <Link to="/login">
  <Button variant="contained" style={{background: "#0768A8",color:"black",fontSize: 20,fontFamily:"serif"}} >Login</Button>
  </Link>  
  </div>

  </div>
  </CardContent>
    </div>
  </React.Fragment>
        </>
    )
};
export default Registration;