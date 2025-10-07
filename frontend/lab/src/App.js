import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Labs from './components/Labs';
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import RegisterLab from "./components/RegisterLab";
import axios, { getAdapter } from 'axios';
import { useEffect, useState } from 'react';
import Home from "./components/Home";
import Schedule from "./components/Schedule";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user,setUser] = useState('')


   useEffect(() => {
     const user = localStorage.getItem('user');
    if (user){
      setUser(JSON.parse(user))
    }


  
    axios.get("http://127.0.0.1:8000/api/users/",{
      withCredentials : true
    }).then((res) => {setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user))})
      .catch(() => {
        setUser(null);
       localStorage.removeItem("user"); });
      
      
  }, []);


  
  
  return (
    <div className="App">
    
  <Router>
      <Navbar user={user} setUser = {setUser} />
    <Routes>

        
        <Route path="/Login" element={<Login setUser = {setUser}/>}>
        
    </Route>
     
    <Route path="/Register" element={<Register/>}>
    {/*   ProtectedRoutes   */}
 </Route>
      
      <Route path="/" element={<ProtectedRoute><Main/></ProtectedRoute>}></Route>
    

        
      <Route path="/Home" element={<ProtectedRoute user={user}><Home/></ProtectedRoute>}></Route>
     

    <Route path="/Labs" element={<ProtectedRoute user={user}><Labs/></ProtectedRoute>}></Route>

      <Route path="/RegisterLab" element={<ProtectedRoute user={user}><RegisterLab/></ProtectedRoute>}></Route>
    
  
    <Route path="/Schedule" element={<ProtectedRoute user={user}><Schedule/></ProtectedRoute>} />
   
  
    </Routes>

  </Router>

    </div>
  );
}

export default App;
