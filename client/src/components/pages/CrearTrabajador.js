import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { CirclePicker } from 'react-color';
import { useForm } from 'react-hook-form';
import * as emailjs from 'emailjs-com'
import Menu from '../Navbar'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import history from '../../history';
import { authenticationService } from '../../_services';
import Grid from '@material-ui/core/Grid';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CrearTrabajador({ trabajadorId }) {
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

    const isAddMode = !trabajadorId;

    const { register, errors, handleSubmit, setValue } = useForm();

    const [sedes, setSedes] = useState([]);
    const [selectedColor, setColor] = useState('#111111');
    const [sedesUpdate, setSedesUpdate] = useState([])
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

    useEffect(() => {
        axios.get('http://localhost:8080/sedes/all').then(res => {
            setSedes(res.data);
            if (isAddMode) {
                if (!sedesUpdate[0]) {
                    setSedesUpdate([{ localidad: 'sede', sedeId: res.data[0].sedeId }])
                }
            }
        })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const getTrabajador = () => {
        if (!isAddMode) {
            axios.get('http://localhost:8080/trabajador/{id}'.replace('{id}', trabajadorId))
                .then(response => {
                    const trabajadorVar = response.data[0]
                    const fields = ['nombre', 'email', 'admin']
                    fields.forEach(field => setValue(field, trabajadorVar[field]));
                    setValue('sede', trabajadorVar.sedeId)
                    setColor(trabajadorVar.color)
                    const sedesVar = [];
                    const data = response.data
                    data.map((sede, index) => {
                        sedesVar.push({ localidad: 'sede' + index, sedeId: sede.sedeId })
                    })
                    setSedesUpdate(sedesVar)
                });
        }
    }

    const updateTrabajador = (data) => {
        data = {
            ...data,
            color: selectedColor,
            contraseña: password,
            sede: sedesUpdate,
            email: trabajadorId
        }
        axios.post('http://localhost:8080/trabajador/update', { data }).then(res => {
            setOpen(true)
        }).catch((error) => {
            setError(true)
        })
    }

    const createTrabajador = (data, e) => {
        data = {
            ...data,
            color: selectedColor,
            contraseña: password,
            sede: sedesUpdate
        }
        axios.post('http://localhost:8080/trabajador/create', { data }).then(res => {
            let templateParams = {
                from_name: 'joane.mannion13@gmail.com',
                to_name: data.email,
                subject: 'SOS RACISMO',
                password: data.contraseña
            }
            emailjs.send(
                'service_6gkhf4w',
                'template_mjg30ud',
                templateParams,
                'user_dYPPsJY5jx9QOXeLRqfAQ'
            ).then(function (response) {
                setOpen(true)
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
                setError(true)
            });
            setOpen(true)
        }).catch((error) => {
            setError(true)
        })


        // limpiar campos
        e.target.reset();
    }

    const deleteTrabajador = () => {
        MySwal.fire({
            title: 'Estas segura?',
            text: "Este trabajador será eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8080/trabajador/delete/{id}'.replace('{id}', trabajadorId))
                    .then(res => {
                        MySwal.fire(
                            'Eliminado!',
                            'El trabajador ha sido eliminado.',
                            'success'
                        )
                        window.history.back()
                    })
                    .catch(err => {
                        MySwal.fire(
                            'Ha habido algun error!',
                            'El trabajador no se ha eliminado.',
                            'warning'
                        )
                    })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                MySwal.fire(
                    'Cancelado',
                    'El trabajador no se ha eliminado :)',
                    'error'
                )
            }
        })
    }

    let crypto = require("crypto");
    let password = crypto.randomBytes(5).toString('hex');


    const onSubmit = (data, e) => {
        return isAddMode
            ? createTrabajador(data, e)
            : updateTrabajador(data);
    }

    const selectSede = (index, e) => {
        const sedesUpdateVar = [...sedesUpdate];
        sedesUpdateVar[index] = { localidad: 'sede' + index, sedeId: parseInt(e.target.value) }
        setSedesUpdate(sedesUpdateVar)
    }

    const nuevoInputSede = () => {
        const sedesUpdateVar = [...sedesUpdate];
        sedesUpdateVar.push({ localidad: 'sede', sedeId: sedes[0].sedeId })
        setSedesUpdate(sedesUpdateVar)
        console.log(sedesUpdateVar)

    }

    const eliminarInputSede = (index) => {
        const sedesUpdateVar = [];
        sedesUpdate.map((sede, i) => {
            if (i != index) {
                sedesUpdateVar.push(sede)
            }
        })
        setSedesUpdate(sedesUpdateVar)
    }


    const isEditMode = () => {
        return (
            <button type="button" name="eliminarTrabajador" className="btn btn-danger" onClick={deleteTrabajador}>Eliminar Trabajador <i className='fa fa-trash'></i></button>
        )
    }

    useEffect(() => { getTrabajador() }, []);

    return (
        <>
            <Menu />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="jumbotron vertical-center bg-white">
                    <div className="w-50 container padding25">
                        <Grid container spacing={3} display='flex'>
                            <Grid item xs={7}>
                                <h3>{isAddMode ? 'Añadir Trabajador' : 'Actualizar Trabajador'}</h3>
                            </Grid>
                            <Grid item xs={5} align-content='flex-end'>
                                {isAddMode ? null : isEditMode()}
                            </Grid>
                        </Grid>
                        <div className="form-group">
                            <label>Nombre completo</label>
                            <input type="text" id="inputEmail" className="mb-3 form-control" name="nombre" placeholder="John Doe" required autoFocus
                                ref={register({
                                    required: {
                                        value: true,
                                        message: 'Nombre es requerido'
                                    }
                                })} />
                            <span className="text-danger text-small d-block mb-2">
                                {errors.nombre && errors.nombre.message}
                            </span>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" id="inputEmail" className="mb-3 form-control" name="email" placeholder="example@example.com" required autoFocus 
                                ref={register({
                                    required: {
                                        value: true,
                                        message: 'Email es requerido'
                                    }
                                })} disabled = {isAddMode ? null : 'disabled'} />
                            <span className="text-danger text-small d-block mb-2">
                                {errors.email && errors.email.message}
                            </span>
                        </div>

                        {/* <div className="form-group">
                            <label>Sede</label>
                            <select className="form-control" name="sede" ref={register}>
                                {
                                    sedes.map((val) => {
                                        return <option value={val.sedeId} key={val.sedeId}>{val.nombre}</option>;
                                    })
                                }
                            </select>
                        </div> */}

                        <div className="form-group">
                            <label>Sede</label>
                            {

                                sedesUpdate.map((n, index) => {
                                    return (
                                        <>
                                            <div className="form-row">

                                                <select defaultValue={n.sedeId} className="form-control col-md-10" key={index} name={n.localidad + index} onChange={(e) => selectSede(index, e)}>
                                                    {
                                                        sedes.map((sede, id) => {
                                                            return (<option key={id} value={sede.sedeId}>{sede.localidad}</option>)
                                                        })
                                                    }
                                                </select>
                                                <IconButton onClick={() => eliminarInputSede(index)} size="small" color="secondary" className="col-md-2">
                                                    <CloseIcon fontSize="inherit" className="danger" />
                                                </IconButton>

                                            </div>


                                            <br />
                                        </>
                                    )
                                })
                            }
                            <IconButton onClick={nuevoInputSede} size="small">
                                <AddCircleIcon fontSize="inherit" /> Añadir sede
									</IconButton>
                        </div>



                        <div className="form-group">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value={1} name="admin" ref={register} />
                                <label className="form-check-label">
                                    Es administrador
                                </label>
                            </div>
                        </div>

                        <div className="row justify-content-md-center">
                            <div className="form-group">
                                <label>Color: </label>
                                <CirclePicker
                                    onChangeComplete={color => setColor(color.hex)} />
                            </div>
                        </div>

                        <button className="btn btn-primary btn-block" type="submit">{isAddMode ? 'Añadir Trabajador' : 'Actualizar Trabajador'}</button>

                    </div>
                </div>

            </form >
            <Snackbar open={open} id="successAlert" autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    El trabajador ha sido  {isAddMode ? 'añadido' : 'actualizado'} correctamente!
        				</Alert>
            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Ha habido algun error {isAddMode ? 'añadiendo' : 'actualizando'} el trabajador :(
        				</Alert>
            </Snackbar>
        </>
    )
}

