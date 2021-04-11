import axios from 'axios';
import React,  { useState, useEffect } from 'react';
import { CirclePicker } from 'react-color';
import { useForm } from 'react-hook-form';
import * as emailjs from 'emailjs-com'
import Menu from '../Navbar'

export default function CrearTrabajador() {
    const {register, errors, handleSubmit} = useForm();

    const [sedes, setSedes] = useState([]);
    const [selectedColor, setColor] = useState([111111]);

    useEffect(() => {    
        axios.get('http://localhost:8080/sedes/all').then(res => {
            setSedes(res.data);
        })
        .catch(err => {
            console.log(err);
        })    
    });

    let crypto = require("crypto");
    let password = crypto.randomBytes(5).toString('hex');
    
    const onSubmit = (data, e) => {
        data = {
            ...data,
            color: selectedColor,
            contraseña: password
        }
        console.log(data);
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
            ).then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
             }, function(error) {
                console.log('FAILED...', error);
             });
            console.log(res);
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
                        <h3>Crear trabajador</h3>

                        <div className="form-group">
                            <label>Nombre completo</label>
                            <input type="text" id="inputEmail"  className="mb-3 form-control" name="nombre" placeholder="John Doe" required autoFocus
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
                            <label>Email</label>
                            <input type="email" id="inputEmail"  className="mb-3 form-control" name="email" placeholder="example@example.com" required autoFocus
                                ref={register({
                                    required: {
                                        value: true, 
                                        message: 'Email es requerido'
                                        }
                                    })}/>
                            <span className="text-danger text-small d-block mb-2">
                                {errors.email && errors.email.message}
                            </span>
                        </div>

                        <div className="form-group">
                            <label>Sede</label>
                            <select className="form-control" name="sede" ref={register}>
                            {
                            sedes.map((val) => {
                                return <option value={val.sedeId} key={val.sedeId}>{val.nombre}</option>;
                            })
                            }
                            </select>
                        </div>

                        <div className="form-group">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value={1} name="admin" ref={register}/>
                                <label className="form-check-label">
                                    Es administrador
                                </label>
                            </div>
                        </div>
                     
                        <div className="row justify-content-md-center">
                            <div className="form-group">
                                <label>Color: </label>
                                <CirclePicker
                                onChangeComplete={ color => setColor(color.hex) } />
                            </div>
                        </div>

                        <button className="btn btn-primary btn-block" type="submit">Crear trabajador</button>

                    </div>
                </div>

            </form>
        </>
    )
}

