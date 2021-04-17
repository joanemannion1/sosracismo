import React, {useState} from 'react';
import logo from '../../images/logo192.png';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import history from '../../history';
import auth from '../auth'

export default function LogIn() {

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data, e) => {
        axios.post('http://localhost:8080/trabajador/login', {
            email: data.email,
            contraseña: data.contraseña
        }).then(res => {
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('email', res.data.result.email);
            auth.email = res.data.result.email
            auth.login(() => {
              history.push('/');
            })
            // window.location.reload();
        })


        // limpiar campos
        e.target.reset();
    }

    return (
        <>
            <div className="jumbotron vertical-center bg-white">
                <div className="w-25 container padding25">
                    <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row justify-content-md-center">
                            <img className="mb-4" src={logo} alt="" width="72" height="72" />
                        </div>
                        <div className="row justify-content-md-center">
                            <h1 className="h3 mb-3 font-weight-normal">Iniciar sesión</h1>
                        </div>
                        <label className="sr-only">Correo electrónico</label>
                        <input type="email" id="inputEmail" className="mb-3 form-control" name="email" placeholder="Email address" required autoFocus
                            ref={register({
                                required: {
                                    value: true,
                                    message: 'Nombre es requerido'
                                }
                            })} />
                        <span className="text-danger text-small d-block mb-2">
                            {errors.usuario && errors.usuario.message}
                        </span>

                        <label className="sr-only" >Contraseña</label>
                        <input type="password" id="inputPassword" name="contraseña" className="form-control" placeholder="Password" required ref={register({
                            required: {
                                value: true,
                                message: 'Conotraseña es requerido'
                            }
                        })} />
                        <br />

                        <button type="submit" className="btn btn-lg btn-primary btn-block" name="submitButton">Iniciar</button>
                       
                    </form>
                </div>
            </div>
            
        </>
    )
}

