import axios from 'axios';
import styles from './Navbar.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Labs from './Labs';
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Main(){
    const location = useLocation()
    const { state } = location
   
 
        return (
        <div>
 <h3>Consult top doctors online for any health concern</h3>
 <p>Book an appointment for an in-clinic consultation</p>
        </div>
    )
}