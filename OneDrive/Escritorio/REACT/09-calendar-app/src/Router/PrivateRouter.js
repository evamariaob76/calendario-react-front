import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

 
 
 
const PrivateRoute = ({children}) => {
//const token = localStorage.getItem('token');

  const {name} = useSelector(state => state.auth); 


    
    return (
        name
        ?   children  
        :  <Navigate to="/login" />
    )              
}
 
 
export default PrivateRoute;
