import React from 'react';
import './login.css';
import  {useForm} from  '../../hooks/useForm';
import { startLogin, startRegister } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

export const LoginScreen = () => {


    
    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        lEmail:'eva@hotmail.com',
        lPassword: '123456'
    } );

    const [ formLRegisterValues, handleLRegisterInputChange ] = useForm( {
        rname:'eva',
        rEmail:'eva@hotmail.com',
        rPassword1: '123456',
        rPassword2: '123456',
    } );
   
    const {lEmail, lPassword}= formLoginValues;

    const {rname, rEmail, rPassword1, rPassword2}= formLRegisterValues;

    const dispatch= useDispatch();

    
    const handleLogin = ( e ) => {
        e.preventDefault();
        dispatch( startLogin( lEmail, lPassword ) );
    }
         
    const handleRegister = ( e ) => {
        e.preventDefault();
        if(rPassword1!==rPassword2){
            return Swal.fire('Error', 'Las constraseñas deben ser iguales','error') 
        }
        dispatch( startRegister( rEmail, rPassword1 , rname) );
    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit ={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='rname'
                                value={rname}
                                onChange={handleLRegisterInputChange}

                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='rEmail'
                                value={rEmail}
                                onChange={handleLRegisterInputChange}

                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name='rPassword1'
                                value={rPassword1}
                                onChange={handleLRegisterInputChange}

                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='rPassword2'
                                value={rPassword2}
                                onChange={handleLRegisterInputChange}

                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                name="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}