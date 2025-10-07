import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './Labs.module.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Labs(){
        const [labs,setlabs] = useState([])
            const navigate = useNavigate();
        // const csrftoken = Cookies.get('csrftoken')
        
        const func = async () => {
            try {
        const res = await axios.get('http://127.0.0.1:8000/api/labs/',{
          withCredentials : true,
         })
      
         setlabs(res.data)
    }catch(error){
        navigate('/Login')
    }}

    useEffect(() => {
        func();
    },[])

    return (
        <div className={styles.labDiv}>
            <h2>Labs</h2>
            <div >
            {labs.map(lab =>
            <div key = {lab.id} className={styles.labcard}>
                <h3>{lab.name}</h3>
                <p>{lab.address}</p>
                <button><Link to='/Schedule' className={styles.schedlink} state={{lab_id : lab.id}}>Schedule</Link></button>
                </div>
            )}
            </div>
        </div>
    )
}