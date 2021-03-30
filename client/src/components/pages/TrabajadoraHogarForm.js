import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import history from '../../history';

export default function TrabajadoraHogarForm({ usuario }) {

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data, e) => {
        data = {
            n_documentacion: usuario,
            trabajadorId: localStorage.email,
            ...data
        }
        console.log(data)
        axios.post('http://localhost:8080/caso/create/trabajadoraHogar', { data }).then(res => {
            console.log(res);
        });
    }



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="t_motivo">Motivo consulta</label>
                        <select id="t_motivo" className="form-control" ref={register} name="motivo">
                            <option selected>Otro</option>
                            <option>Información</option>
                            <option>Despido/Desistimiento</option>
                            <option>Despido Maternidad</option>
                            <option>Muerte</option>
                            <option>Ingreso Residencia</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Nº Casas</label>
                        <input type="number" className="form-control" defaultValue={0} ref={register} name="n_casas" />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Regularizada</label>
                        <select className="form-control" ref={register} name="regularizada">
                            <option value={true} selected>Si</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Fecha Comienzo Trabajo</label>
                        <input type="date" className="form-control" ref={register} name="fecha_inicio" />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Fecha Final Trabajo</label>
                        <input type="date" className="form-control" ref={register} name="fecha_final" />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Fecha Despido</label>
                        <input type="date" className="form-control" ref={register} name="fecha_despido" />
                    </div>
                </div>

                <div className="form-group">
                    <label>Forma Conseguir Empleo</label>
                    <input type="text" className="form-control" ref={register} name="forma_empleo" />
                </div>


                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label >¿Quién te contrato?</label>
                        <select className="form-control" ref={register} name="contratador">
                            <option selected>Persona atendida</option>
                            <option>Pariente mujer</option>
                            <option>Pariente hombre</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Solo fines de semana</label>
                        <select className="form-control" ref={register} name="solo_fines_semana">
                            <option value={true} selected>Si</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label>Horario</label>
                    <textarea className="form-control" rows="3" ref={register} name="horario_base"></textarea>
                </div>


                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label>Total horas semana</label>
                        <input type="number" className="form-control" defaultValue={0} ref={register} name="horas_totales" />
                    </div>
                    <div className="form-group col-md-3">
                        <label>Libra festivos</label>
                        <select className="form-control" ref={register} name="libra_festivos">
                            <option selected>Si</option>
                            <option>No</option>
                            <option>F</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <div className="form-check mb-2 mr-sm-2">
                            <input className="form-check-input" type="checkbox" value="true" ref={register} name="no_libra_pero_cobra" />
                            <label className="form-check-label">
                                No los libra pero los cobra
								</label>
                        </div>
                    </div>
                    <div className="form-group col-md-3">
                        <label>Cuanto cobra</label>
                        <input type="number" step="0.01" className="form-control" defaultValue={0.0} ref={register} name="salario_festivos" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Salario</label>
                        <input type="number" step="0.01" className="form-control" defaultValue={0.0} ref={register} name="salario" />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Pagas</label>
                        <input type="number" step="0.01" className="form-control" defaultValue={0.0} ref={register} name="pagas" />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Te pagan</label>
                        <select className="form-control" ref={register} name="forma_pago">
                            <option selected>En mano</option>
                            <option>Banco</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Nomina</label>
                        <select className="form-control" ref={register} name="nomina">
                            <option value={true} selected>Si</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Contrato</label>
                        <select className="form-control" ref={register} name="contrato">
                            <option value={true} selected>Si</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Seguridad social</label>
                        <select className="form-control" ref={register} name="seguridad_social">
                            <option value={true} selected>Si</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Vacaciones</label>
                        <select ref={register} className="form-control" name="vacaciones">
                            <option selected>Si (descansa un mes) </option>
                            <option>No y no las cobra aparte</option>
                            <option>No y las cobra aparte</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Tipo de trabajo</label>
                        <select className="form-control" ref={register} name="tipo_trabajo">
                            <option selected>Cuidado de adultos como actividad principal</option>
                            <option>Tareas domésticas sin cuidado</option>
                            <option>Cuidado de adultos NO actividad principal</option>
                            <option>Cuidado y número de criaturas</option>
                        </select>
                    </div>
                </div>

                <div className="form-row align-items-center">
                    <div className="form-group col-md-4">
                        <label>Mayores</label>
                        <input type="number" className="form-control" defaultValue={0} ref={register} name="mayores" />
                    </div>
                    <div className="align-items-center">
                        <div className="form-group col-md-1">
                            <label className="radio-inline"> <input className="form-check-input" type="radio" ref={register} name="genero_mayores" value="M" />M</label>
                        </div>
                    </div>
                    <div className="align-items-center">
                        <div className="form-group col-md-1">
                            <label className="radio-inline"> <input className="form-check-input" type="radio" ref={register} name="genero_mayores" value="H" />H</label>
                        </div>
                    </div>
                    <div className="form-group col-md-3">
                        <label>Enfermos</label>
                        <input type="number" className="form-control" defaultValue={0} ref={register} name="enfermos" />
                    </div>
                    <div className="align-items-center">
                        <div className="form-group col-md-1">
                            <input className="form-check-input" type="radio" name="genero_enfermos" ref={register} value="M" />
                            <label className="radio-inline">M </label>
                        </div>
                    </div>
                    <div className="align-items-center">
                        <div className="form-group col-md-1">
                            <label className="radio-inline"> <input className="form-check-input" ref={register} type="radio" name="genero_enfermos" value="H" />H</label>
                        </div>
                    </div>
                    <div className="form-group col-md-3">
                        <label>Viven solos</label>
                        <select className="form-control" ref={register} name="viven_solos">
                            <option value={true} selected>Si</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                </div>
                    <div className="form-group">
                        <div className="p-1 mb-1 bg-secondary text-light">Interna <i className="fas fa-arrow-down"></i></div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Permiso diario para salir</label>
                                <input type="text" className="form-control" ref={register} name="permiso_salida" />
                            </div>

                            <div className="form-group col-md-6">
                                <label>Descanso semanal</label>
                                <input type="text" className="form-control" ref={register} name="descanso_semanal" />
                            </div>
                        </div>
                    </div>
                <button type="submit" name="submit" onClick={handleSubmit(onSubmit)} className="btn btn-primary" >Añadir Caso</button>
            </form>
        </>
    )
}
