import { useEffect } from "react";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({user,children}){

    
    const protect = async () => {
    if (!user || user === undefined){
    localStorage.removeItem("user");
    return <Navigate to="/Login" replace />;
    }
}

    useEffect(() => {
        protect();

    },[])
   
        return children
         
}