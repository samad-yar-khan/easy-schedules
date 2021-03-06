import { Meteor } from 'meteor/meteor'
import React, { useState } from 'react'

export const LoginForm = () => {


    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");

    const submitLogin = (e)=>{
        e.preventDefault();
        Meteor.loginWithPassword(userName,password);
    }


    return (
        <form className='login-form' onSubmit={submitLogin}>

            <div>
                <label htmlFor='username'>Username</label>
                <input 
                    type="text" 
                    name="username" 
                    id="username"
                    placeholder='Username'
                    required
                    onChange={(e)=>{e.preventDefault(); setUserName(e.target.value);}}
                />
            </div>
            

            <div>
                <label htmlFor='password'>Password</label>
                <input 
                    type="text" 
                    name="password" 
                    id="password"
                    placeholder='Password'
                    required
                    onChange={(e)=>{e.preventDefault(); setPassword(e.target.value);}}
                />
            </div>
            <div>
            <button type='submit'>
                Log In
            </button>
            </div>
            
        </form>
    );



};

