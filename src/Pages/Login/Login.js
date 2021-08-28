import React , {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../redux/auth/actions'

import './login.css'

import logo from '../../public/logo.png'

import { TextField } from '@material-ui/core';
import { getSessionInfo } from '../../storage';

export default function Login(props) {

    const { history } = props
    const dispatch = useDispatch()

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
    const login = () => dispatch(loginUser({email, password, history}))
      

    const result = useSelector(state => state.auth)
    /* useEffect(()=>{
        if(localStorage.getItem("user-info"))
        {
            history.push("/Home");
        }
    },[]) */
    /* async function login(){
        let item={email,password};
        try{
        let result = await fetch("http://localhost:8000/api/login",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(item)
        });
        result = await result.json();
        localStorage.setItem("user-info",JSON.stringify(result));
        history.push("/");
        history.go(0);
    } catch(e){
        setError("Email or password is incorrect");
    }

        
    } */
    return(
        <div className="contents">
            <img alt="" src={logo} className="logo"/>
            <h1>Log in to Twitter</h1>
            <div className="" style={{marginTop:20}}>
                <div className="mb-4">
                <TextField className="input-form Muiborder" label="Email, or Username" variant="outlined" onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                <TextField className="input-form" label="Password" variant="outlined" type="password" onChange={(e)=>setPassword(e.target.value)} />
                </div>
                {result.message &&
                    <p style={{color:'red',marginTop:20}}>Incorrect username or password</p>
                }
                <Button className="d-block py-3" style={{background:'#1da1f2', width:'400px',fontWeight:'bold', borderRadius:'30px'}} onClick={login}>Login</Button>
            
                <p style={{marginTop:10, textAlign: 'center'}}><Link to="">Forgot Password?</Link> . <Link to="/welcome">Sign Up for Twitter</Link>
                </p>
            </div>

        </div>
    )
}