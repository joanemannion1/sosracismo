import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Menu from '../Navbar'
export default function AñadirIntervencion({ usuario, caso }) {
    const { register, errors, handleSubmit } = useForm();
    const [file, setFile] = useState([]);

    const onChange = (e) => {
        let fileVar = e.target.files;
        setFile(fileVar)

        let reader = new FileReader();
        reader.readAsDataURL(fileVar[0])
        
        reader.onload = (e) => {
            const formData = { file: e.target.result }
            axios.post('http://localhost:8080/intervencion/create', { formData }).then(res => {
                console.log(res)
            })
        }
    }
    const onSubmit = (data, e) => {
        data = {
            casoId: caso,
            ...data
        }
        console.log(data)
        axios.post('http://localhost:8080/intervencion/create', { data }).then(res => {
            console.log(res)
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
                            <input ref={register} type="file" name="file" 
                            //onChange={(e) => onChange(e)} 
                            />
                        </div>

                        <button className="btn btn-primary btn-block" type="submit">Añadir Intervención</button>

                    </div>
                </div>

            </form>
        </>
    )
}