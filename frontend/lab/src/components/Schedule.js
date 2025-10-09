import axios from 'axios';
import styles from './Schedule.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

export default function Schedule({user}){
    const location = useLocation()
    const { state } = location;
    const [time,setTime]  = useState()
    console.log(time)

    const get_user = async() => {
        const res = await axios.get('http://127.0.0.1:8000/api/users/',{
            withCredentials : true
        })
        console.log(res.data)
    }

    useEffect(() => {
        get_user();
    },[]);
   
    console.log('lab',state.lab_id)
    
        return (
            <div className={styles.schedDiv}>
            <h1>Schedule</h1>
            <input type='datetime-local' onChange={(e) => setTime(e.target.value)}/>
            <button>submit</button>
       
            </div>
        )
}