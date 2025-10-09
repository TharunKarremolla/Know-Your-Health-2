
import axios from 'axios';
import styles from './MyAppointments.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


export default function MyAppointments(){
    const [scheds,setScheds] = useState([])
    console.log('tharunkarremolla'.substring(0,7))
    const get_scheds = async() => {
        const res = await axios.get('http://127.0.0.1:8000/api/my_appoints/',{
            withCredentials : true
        })
        setScheds(res.data)
        console.log(res.data)
    }
    useEffect(()=>{
        get_scheds();
    },[]);
         return (
        <div className={styles.mydiv}>
            <h1>MyAppointments !! </h1> 
            {scheds.map((sched,index) => (
                <div key = {index}>
                    <p><b>Lab Name</b> : {sched['Lab Name']}</p>
                     <p><b>Appointment time</b> :{sched['Appointment time'].substring(0,10)} {sched['Appointment time'].substring(11,16)}</p>
                       <p><b>Address</b> : {sched['Address']}</p>
                    </div>
            ))}
        </div>
    )
}