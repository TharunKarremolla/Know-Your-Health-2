import axios from 'axios';
import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Navbar({user,setUser}){
        const navigate = useNavigate();

        const handlelogout = async() => {
        const res = await axios.post(
  'http://127.0.0.1:8000/api/users/logout/',
  {},
  {
    withCredentials: true,
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken')
    }
  }
);
    setUser(null)
    console.log(res.data)
    localStorage.removeItem("user"); 
    // Cookies.remove('csrftoken');
    // Cookies.remove('sessionid');
    navigate('/login')

        }

        const handleChange= (e) => {
          const value = e.target.value;
        
          if (value === 'All Labs'){
            navigate('/Labs')
          }else{
            navigate('/MyLab')
          }

        }


    return (
        <div>
        <nav className={styles.navBar}>
            <div>
        <h1>Know Your Health</h1>
     </div>
     <div className={styles.rightdiv}>
      <select onChange={handleChange}>
    <option className={styles.lablink}>MyLab</option>  
    <option className={styles.lablink}>All Labs</option>  
</select>
       
        <Link to='/RegisterLab' className={styles.lablink}>Register Lab </Link>
         <Link to='/MyAppointments' className={styles.lablink}>MyAppointments</Link>
      {!user ? <Link to='/Login'> <button className={styles.logbtn}>Login/Signup</button></Link> : <button onClick={handlelogout} className={styles.outbtn}>Logout</button>}
      </div>
        
        </nav>
      
        </div>
    )
}