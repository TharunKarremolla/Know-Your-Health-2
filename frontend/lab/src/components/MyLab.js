import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './MyLab.module.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function MyLab(){
     const [lab,setlab] = useState([])
     console.log(lab)
    const get_lab = async() => {
        try{
        const res = await axios.get('http://127.0.0.1:8000/api/labs/4')
        console.log(res.data)
        setlab([res.data])
    }catch(error){
    console.log(error.response.data)
    }}

    useEffect(() => {
        get_lab();
    },[])

       const handleUpdate = async(id,name,address) => {
            try{
            const res = await axios.put(`http://127.0.0.1:8000/api/labs/${id}`,{ 'name': 'dhsnush' ,'address':address})

            console.log(res.data)
          
            }
            catch(error){
                console.log(error.response.data)
            }
        }
 
        return (
        <div className={styles.mylabDiv}>
<h1>My Lab </h1> 
{lab.map((l,index) => (
    <div key ={index}>
        <h3>Lab Name </h3>
        <input type='text' value={l.name} />
         <p>Address </p>
        <input type='text' value={l.address} /><br></br>
         <button className={styles.upbtn}  onClick={() => handleUpdate(lab.id,lab.name,lab.address)}>Update</button>
        </div>
))}
        </div>
    )
}