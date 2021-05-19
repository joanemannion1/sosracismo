import axios from 'axios';
import React,  { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Menu from '../Navbar'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { authenticationService } from '../../_services';
import history from '../../history';
import Grid from '@material-ui/core/Grid';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function CrearSede({sedeId}) {
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
    
    const MySwal = withReactContent(Swal)

    const isAddMode = !sedeId;

    const {register, errors, handleSubmit, setValue} = useForm();

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

    const getSede = () => {
        if (!isAddMode) {
            axios.get('http://localhost:8080/sede/get/{id}'.replace('{id}', sedeId))
                .then(response => {
                    const sedeVar = response.data
                    const fields = ['nombre', 'localidad']
                    fields.forEach(field => setValue(field, sedeVar[field]));
                });
        }
    }

    const onSubmit = (data, e) => {
        return isAddMode
            ? createUser(data, e)
            : updateUser(data);
        
    }

    const createUser = (data, e) => {
        axios.post('http://localhost:8080/sede/create', { data }).then(res => {
            setOpen(true)
        }).catch((error) => {
            setError(true)
           })


        // limpiar campos
        e.target.reset();
    }

    const updateUser = (data) => {
        axios.post('http://localhost:8080/sede/update/{id}'.replace('{id}', sedeId), { data }).then(res => {
            setOpen(true)
        }).catch((error) => {
            setError(true)
           })

    }

    const deleteSede = () => {
        MySwal.fire({
            title: 'Estas segura?',
            text: "Esta sede será eliminada!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8080/sede/delete/{id}'.replace('{id}', sedeId))
                    .then(res => {
                        MySwal.fire(
                            'Eliminado!',
                            'La sede ha sido eliminada.',
                            'success'
                        )
                        window.history.back()
                    })
                    .catch(err => {
                        MySwal.fire(
                            'Ha habido algun error!',
                            'La sede no se ha eliminado.',
                            'warning'
                        )
                    })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                MySwal.fire(
                    'Cancelado',
                    'La sede no se ha eliminado :)',
                    'error'
                )
            }
        })
    }


    const isEditMode = () => {
        return (
            <button type="button" name="eliminarSede" className="btn btn-danger" onClick={deleteSede}>Eliminar Sede <i className='fa fa-trash'></i></button>
        )
    }

    useEffect(() => { getSede() }, []);

    return (
        <>
        <Menu />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="jumbotron vertical-center bg-white">
                    <div className="w-50 container padding25">
                        <Grid container spacing={3} display='flex'>
                            <Grid item xs={8}>
                                <h3>{isAddMode ? 'Añadir Sede' : 'Actualizar Sede'}</h3>
                            </Grid>
                            <Grid item xs={4} align-content='flex-end'>
                                {isAddMode ? null : isEditMode()}
                            </Grid>
                        </Grid>

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

                        <button className="btn btn-primary btn-block" type="submit">{isAddMode ? 'Añadir Sede' : 'Actualizar Sede'}</button>

                    </div>
                </div>

            </form>
            <Snackbar open={open} autoHideDuration={6000} id="successAlert" onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                   La sede ha sido {isAddMode ? 'añadida' : 'actualizada'} correctamente!
        				</Alert>
            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                   Ha habido algun problema {isAddMode ? 'añadiendo' : 'actualizando'} la sede :(
        				</Alert>
            </Snackbar>
        </>
    )
}

