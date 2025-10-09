
import { useLocation } from 'react-router-dom';

export default function Home(){
    const location = useLocation()
    const { state } = location
   
 
        return (
        <div>
<h1>Welcome !! </h1> 


        </div>
    )
}