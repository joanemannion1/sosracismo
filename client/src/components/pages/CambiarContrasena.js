import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function CambiarContraseña() {
    const {register, errors, handleSubmit} = useForm();

    const onSubmit = (data, e) => {
        axios.put('http://localhost:8080/trabajador/update', {
            email: data.email,
            contraseña_actual: data.contraseña_actual,
            contraseña: data.nueva_contraseña,
        }).then(res => {
            console.log('ok')
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
                            <h1 className="h3 mb-3 font-weight-normal">Cambiar contraseña</h1>
                        </div>

                        <label className="sr-only">Email</label>
                        <input type="email"  name="email" className="mb-3 form-control"  placeholder="Email" required autoFocus
                        ref={register({
                            required: {
                                value: true, 
                                message: 'Email es requerido'
                                }
                            })}/>


                        <label className="sr-only">Contraseña actual</label>
                        <input type="password"  name="contraseña_actual" className="mb-3 form-control"  placeholder="Contraseña actual" required autoFocus
                        ref={register({
                            required: {
                                value: true, 
                                message: 'Contraseña actual es requerido'
                                }
                            })}/>
                        <span className="text-danger text-small d-block mb-2">
                            {errors.contraseña_actual && errors.contraseña_actual.message}
                        </span>

                        <label className="sr-only">Nueva contraseña</label>
                        <input type="password"  name="nueva_contraseña" className="mb-3 form-control"  placeholder="Nueva contraseña" required autoFocus
                        ref={register({
                            required: {
                                value: true, 
                                message: 'Nueva contraseña es requerido'
                                }
                            })}/>
                        <span className="text-danger text-small d-block mb-2">
                            {errors.nueva_contraseña && errors.nueva_contraseña.message}
                        </span>

                        <button type="submit" className="btn btn-lg btn-primary btn-block" name="submitButton">Iniciar</button>

                    </form>
                </div>
            </div>
        </>
    )
}