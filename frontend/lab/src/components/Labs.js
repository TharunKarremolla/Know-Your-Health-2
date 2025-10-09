import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './Labs.module.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Labs(){
        const [labs,setlabs] = useState([])
            const navigate = useNavigate();
       
        
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

    const handleDelete = async(id) => {
        try{
        const res = await axios.delete(`http://127.0.0.1:8000/api/labs/${id}`)
          func()
        console.log(res.data)
      
        }
        catch(error){
            console.log(error.response.data)
        }
    }

     

    return (
        <div className={styles.labDiv}>
            <h2>Labs</h2>
            <div >
            {labs.map(lab => (
            <div key = {lab.id} className={styles.labcard}>
                <h3>Lab Name : {lab.name}</h3>
                <p> Address : {lab.address}</p>
                <button><Link to='/Schedule' className={styles.schedlink} state={{lab_id : lab.id}}>Schedule</Link></button>
              <button className={styles.delbtn}  onClick={() => handleDelete(lab.id)}>Delete</button>
             
                </div>
            )
            )}
            </div>
        </div>
    )
}