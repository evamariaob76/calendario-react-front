import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

 
const PublicRoute = ({children}) => {

      const {name} = useSelector(state => state.auth); 



  
    return ( name 

        ? <Navigate to="/" />
        : children 
        
        )
        
}
 
export default PublicRoute;
