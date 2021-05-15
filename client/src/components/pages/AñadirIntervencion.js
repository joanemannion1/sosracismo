import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Menu from '../Navbar'
import { useDropzone } from 'react-dropzone';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { authenticationService } from '../../_services';
import history from '../../history';
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

export default function AñadirIntervencion({ usuario, caso }) {
    let currentUser = ''
    if (authenticationService.currentUserValue) { 
        currentUser = authenticationService.currentUserValue.token
    }else {
        history.push('/LogIn')
    }
      

    
    const { register, errors, handleSubmit } = useForm();

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

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            {file.size > 10000000 ? <p style={{color: 'red'}}>Este archivo es demasiado grande</p> : null}
        </li>
    ));

    const onSubmit = (data) => {
        console.log(data)
        const formData = new FormData();
        formData.append('nombre', data.nombre)
        formData.append('descripcion', data.descripcion)
        formData.append('casoId', caso)
        acceptedFiles.map(file => {
            if (file.size < 10000000){
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


    }

    return (
        <>
            <Menu />
            <form method="post" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="jumbotron vertical-center bg-white">
                    <div className="w-50 container padding25">
                        <h3>Añadir Intervención</h3>

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
                                </aside>
                            </section>
                        </div>

                        <button className="btn btn-primary btn-block" type="submit">Añadir Intervención</button>

                    </div>
                </div>

            </form>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    La intervención ha sido añadida correctamente!
        				</Alert>
            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Ha habido algun error añadiendo la intervencion :(
        				</Alert>
            </Snackbar>
        </>
    )
}