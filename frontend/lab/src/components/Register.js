import styles from './Register.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from './logo.png';

export default function Register(){
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
      const navigate = useNavigate()

      const handlesubmit = async () => {
        try {
        const res = await axios.post('http://127.0.0.1:8000/api/users/register/',{username,email,password})
        console.log(res.data)
          navigate('/login')
    }catch(error){
      console.log(error)
    }}


    return (
        <div className={styles.rdiv}>
           <img src={logo} width={394}  alt="logo"/>
           <div>
                  <h2>Register</h2>
           <input type='text' placeholder='username'  value={username} onChange={(e)=>setUsername(e.target.value)}/><br/>
            <input type='text' placeholder='email'  value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
        <input type='text' placeholder='password'  value={password} onChange={(e)=>setPassword(e.target.value)} /> <br/>
          <button onClick={handlesubmit}>SignUp</button>
          <p>Existing User? <Link to='/Login'>Login</Link></p>
          </div>
        </div>

    )
}