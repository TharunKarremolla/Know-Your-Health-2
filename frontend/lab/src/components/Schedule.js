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
   
    console.log('user',user)
    
        return (
            <div className={styles.schedDiv}>
            <h1>Schedule</h1>
            <input type='datetime-local' />
       
            </div>
        )
}