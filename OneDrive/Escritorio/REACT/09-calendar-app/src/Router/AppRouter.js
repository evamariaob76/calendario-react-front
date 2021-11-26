import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../Components/Auth/LoginScreen';
import { CalendarScreen } from '../Components/Calendar/CalendarScreen';
import PrivateRoute from './PrivateRouter';
import PublicRoute from './PublicRouter';



 
export const AppRouter = () => {

  const dispatch = useDispatch();

 
  const token = localStorage.getItem('token')

  useEffect(() => {
      dispatch(startChecking())
 
  }, [dispatch]);
  //const {name} = useSelector(state => state.auth); 




  /*if (checking){
        return (<h5>Espere...</h5>);
  }*/
 

  return (
    <Router>
        <Routes>
         { <Route path="/login" element={
                    <PublicRoute>
                        <LoginScreen/>
                    </PublicRoute>
                    } />  
        }   
        {token&&<Route path="/*"  element ={
                  <PrivateRoute>
                       <CalendarScreen/>
                  </PrivateRoute>
                  }/>
        }
          {/* <Route path="*" element={<CalendarScreen />} />   */}
 
        </Routes>
    </Router>
  );
}