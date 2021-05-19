import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Menu from '../Navbar'
import { useDropzone } from 'react-dropzone';
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

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

export default function AñadirIntervencion({ updateIntervencion, caso }) {
    let currentUser = ''
    if (authenticationService.currentUserValue) {
        currentUser = authenticationService.currentUserValue.token
    } else {
        history.push('/LogIn')
    }

    const isAddMode = !updateIntervencion;
    const { register, errors, handleSubmit, setValue } = useForm();

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

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

    const MySwal = withReactContent(Swal)

    const [oldFiles, setOldFiles] = useState([])
    const getIntervencion = () => {
        if (!isAddMode) {
            axios.get('http://localhost:8080/intervencion/get/{id}'.replace('{id}', updateIntervencion))
                .then(response => {
                    const intervencionVar = response.data[0]
                    const fields = ['nombre', 'descripcion']
                    fields.forEach(field => setValue(field, intervencionVar[field]));
                    if (response.data[0].docNombre) {
                        const oldFilesVar = response.data.map(file => (
                            <li key={file.docNombre}>
                                {file.docNombre}
                            </li>
                        ));
                        setOldFiles(oldFilesVar)
                    }

                });
        }
    }

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            {file.size > 10000000 ? <p style={{ color: 'red' }}>Este archivo es demasiado grande</p> : null}
        </li>
    ));


    const onSubmit = (data, e) => {
        return isAddMode
            ? createIntervencion(data, e)
            : updateIntervencionFunc(data);
    }

    const createIntervencion = (data, e) => {
        const formData = new FormData();
        formData.append('nombre', data.nombre)
        formData.append('descripcion', data.descripcion)
        formData.append('casoId', caso)
        acceptedFiles.map(file => {
            if (file.size < 10000000) {
                formData.append('files', file)
            }
        })
        axios.post('http://localhost:8080/intervencion/createdoc', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res)
            setOpen(true);
        }).catch((error) => {
            setError(true)
        })
        e.preventDefault();
        e.target.reset();
    }

    const updateIntervencionFunc = (data) => {
        const formData = new FormData();
        formData.append('nombre', data.nombre)
        formData.append('descripcion', data.descripcion)
        formData.append('casoId', caso)
        acceptedFiles.map(file => {
            if (file.size < 10000000) {
                formData.append('files', file)
            }
        })
        axios.post('http://localhost:8080/intervencion/update/{id}'.replace('{id}', updateIntervencion), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res)
            setOpen(true);
        }).catch((error) => {
            setError(true)
        })
    }

    const deleteIntervencion = () => {
        MySwal.fire({
            title: 'Estas segura?',
            text: "Esta intervención será eliminada!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8080/intervencion/delete/{id}'.replace('{id}', updateIntervencion))
                    .then(res => {
                        MySwal.fire(
                            'Eliminado!',
                            'La intervención ha sido eliminada.',
                            'success'
                        )
                        window.history.back()
                    })
                    .catch(err => {
                        MySwal.fire(
                            'Ha habido algun error!',
                            'La intervención no se ha eliminado.',
                            'warning'
                        )
                    })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                MySwal.fire(
                    'Cancelado',
                    'La intervención no se ha eliminado :)',
                    'error'
                )
            }
        })
    }

    const isEditMode = () => {
        return (
            <button type="button" name="eliminarIntervencion" className="btn btn-danger" onClick={deleteIntervencion}>Eliminar Intervención <i className='fa fa-trash'></i></button>
        )
    }

    useEffect(() => { getIntervencion() }, []);

    return (
        <>
            <Menu />
           
            <form method="post" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="jumbotron vertical-center bg-white">
                    <div className="w-50 container padding25">
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <h3>{isAddMode ? 'Añadir Intervención' : 'Actualizar Intervención'}</h3>
                        </Grid>
                        <Grid item xs={4}>
                            {isAddMode ? null : isEditMode()}
                        </Grid>
                    </Grid>
                        <div className="form-group">
                            <label>Nombre</label>
                            <input type="text" className="mb-3 form-control" name="nombre" placeholder="Intervención 1" required autoFocus
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
                            <label>Descripción</label>
                            <textarea className="form-control" ref={register} name="descripcion" rows="3"></textarea>
                        </div>

                        <div className="form-group">
                            <label>Adjuntar documentos: </label>

                            <section className="container">
                                <div {...getRootProps({ className: 'dropzone' })} style={baseStyle}>
                                    <input {...getInputProps()} />
                                    <p>Arrastra y suelta archivos aquí, o haz click para seleccionar archivos</p>
                                </div>
                                <aside>
                                    <h4>Archivos</h4>
                                    <ul>{files}</ul>
                                    {isAddMode ? null : <h5>Archivos añadidos anteriormente</h5>}
                                    {isAddMode ? null : <ul>{oldFiles}</ul>}
                                </aside>
                            </section>
                        </div>

                        <button className="btn btn-primary btn-block" type="submit">{isAddMode ? 'Añadir Intervención' : 'Actualizar Intervencion'}</button>

                    </div>
                </div>

            </form>

            <Snackbar open={open} autoHideDuration={6000} id="successAlert" onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    La intervención ha sido {isAddMode ? 'añadida' : 'actualizada'} correctamente!
        				</Alert>
            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Ha habido algun error {isAddMode ? 'añadiendo' : 'actualizando'} la intervencion :(
        				</Alert>
            </Snackbar>
        </>
    )
}