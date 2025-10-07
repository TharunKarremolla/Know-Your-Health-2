import styles from './RegisterLab.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export default function AddLab(){
   const [name,setLname] = useState('')
    const [address,setAddress] = useState('')
    const csrftoken = Cookies.get('csrftoken')
     const navigate = useNavigate();
    
    const handlesubmit = async () => {
      const res = await axios.post('http://127.0.0.1:8000/api/labs/',{name,address},
        {
          withCredentials : true,
       
          headers : {
            "X-CSRFToken": csrftoken
          }
        }
      )
      console.log(res)
      navigate('/Labs')
    }

    // const get_csrf = async () => {
    //   const res = 
    // }
  return (
    <div className={styles.reglabdiv}>
      <h2>Add Lab Details</h2>
<input type='text' placeholder='Lab Name'  value={name} onChange={(e)=>setLname(e.target.value)}/><br/>
        <input type='text' placeholder='Address'  value={address} onChange={(e)=>setAddress(e.target.value)} /> <br/>
          <button onClick={handlesubmit} className={styles.regbtn}>Register</button>
          </div>
  )
}