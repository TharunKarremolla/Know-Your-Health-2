

import axios from 'axios';
import styles from './Navbar.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Labs from './Labs';
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Home(){
    const location = useLocation()
    const { state } = location
   
 
        return (
        <div>
<h1>Welcome !! </h1> 
        </div>
    )
}