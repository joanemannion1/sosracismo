import axios from 'axios';
import React,  { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Menu from '../Navbar'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { authenticationService } from '../../_services';
import history from '../../history';
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function CrearSede() {
    let currentUser = ''
    if (authenticationService.currentUserValue) { 
        currentUser = authenticationService.currentUserValue.token
        axios.get("http://localhost:8080/authenticate/trabajador", {
            headers: { 'x-access-token': currentUser },
        }).then((response) => {
            if (response.data.admin !== 1) {
               history.push('/')
            }
        })
    } else {
        history.push('/LogIn')
    }
    
    
    const {register, errors, handleSubmit} = useForm();

    // MUI ALERT
    const [open, setOpen] = useState()
    const [error, setError] = useState()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError(false)
        setOpen(false);
    };


    const onSubmit = (data, e) => {
        axios.post('http://localhost:8080/sede/create', { data }).then(res => {
            setOpen(true)
        }).catch((error) => {
            setError(true)
           })


        // limpiar campos
        e.target.reset();
    }

    return (
        <>
        <Menu />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="jumbotron vertical-center bg-white">
                    <div className="w-50 container padding25">
                        <h3>Crear sede</h3>

                        <div className="form-group">
                            <label>Nombre</label>
                            <input type="text" className="mb-3 form-control" name="nombre" placeholder="Mugak" required autoFocus
                                ref={register({
                                    required: {
                                        value: true, 
                                        message: 'Nombre es requerido'
                                        }
                                    })}/>
                            <span className="text-danger text-small d-block mb-2">
                                {errors.nombre && errors.nombre.message}
                            </span>
                        </div>

                        <div className="form-group">
                            <label>Localidad</label>
                            <input type="text"  className="mb-3 form-control" name="localidad" placeholder="Donostia" required autoFocus
                                ref={register({
                                    required: {
                                        value: true, 
                                        message: 'Localidad es requerido'
                                        }
                                    })}/>
                            <span className="text-danger text-small d-block mb-2">
                                {errors.localidad && errors.localidad.message}
                            </span>
                        </div>

                        <button className="btn btn-primary btn-block" type="submit">Crear sede</button>

                    </div>
                </div>

            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                   La sede ha sido añadido correctamente!
        				</Alert>
            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                   Ha habido algun problema añadiendo la sede :(
        				</Alert>
            </Snackbar>
        </>
    )
}

