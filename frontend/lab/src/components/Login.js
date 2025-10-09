import { useEffect, useState } from "react"
import axios from 'axios';
import Main from './Navbar';
import { Link } from "react-router-dom";
import styles from './Login.module.css';
import logo from './logo.png';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


export default function({ setUser }){
    const [Mobile,setMobile] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    
    
    const handleLogin = async () => {
        try{
        const res = await axios.post('http://127.0.0.1:8000/api/users/login/', {Mobile,password},
            {
                withCredentials : true,
                 headers: { "X-CSRFToken": Cookies.get("csrftoken") },
            }
        )
        console.log('logged In user Successfully ',res.data.user)
        setUser(res.data.user)
        navigate('/Home')
    }catch(error){
                console.log(error)
    }}
    return (
        <div className={styles.logcont}>
            <img src={logo} width={394}  alt="logo"/>
        <div className={styles.logDiv}>
            
           <h2> Login</h2>
           <input type='text' placeholder='Mobile / Email ID'  value={Mobile} onChange={(e)=>setMobile(e.target.value)}/><br/>
        <input type='text' placeholder='password'  value={password} onChange={(e)=>setPassword(e.target.value)} /> <br/>
          <button onClick={handleLogin} className={styles.logBtn}>Login</button>
          <p>New User? <Link to='/register'>Sign Up</Link></p>
          </div>
        </div>
    )
}