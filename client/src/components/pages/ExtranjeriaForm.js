import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import history from '../../history';
import { extranjeriaList, proyectosList } from '../extranjeriaList'

export default function ExtranjeriaForm() {

    const [showExtranjeria, setShowExtranjeria] = useState(false);
    const [showAsistencia, setShowAsistencia] = useState(false);
    const [showAsesoramiento, setShowAsesoramiento] = useState(false);
    const [showAyudas, setShowAyudas] = useState(false);
    const [showDiscriminacion, setShowDiscriminacion] = useState(false);

    const onClickExtranjeria = () => { setShowExtranjeria(!showExtranjeria) };
    const onClickAsistencia = () => { setShowAsistencia(!showAsistencia) };
    const onClickAsesoramiento = () => { setShowAsesoramiento(!showAsesoramiento) };
    const onClickAyudas = () => { setShowAyudas(!showAyudas) };
    const onClickDiscriminacion = () => { setShowDiscriminacion(!showDiscriminacion) };

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data, e) => {
        console.log(data)
        data = {
            trabajadorId: localStorage.email,
            ...data
        }
        axios.post('http://localhost:8080/caso/create/extranjeria', { data }).then(res => {
            console.log(res);
        });

        // limpiar campos
        e.target.reset();
    }



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-2 mb-2 bg-secondary text-white">Proyectos de la intervención</div>
                <div>
                    {
                        proyectosList.map((val, i) => {
                            if (i % 2) {
                                return (
                                    <div className="form-row">
                                        <div className="col-sm-6">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value={extranjeriaList[i - 1].value} name="Checkbox[]" />
                                                <label className="form-check-label">{extranjeriaList[i - 1].label}</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value={val.value} name="Checkbox[]" />
                                                <label className="form-check-label">{val.label}</label>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                        })
                    }
                </div>
                <div className="p-2 mb-2 bg-secondary text-white">Necesidad de mi entidad</div>
                <div className="form-group">
                    <div className="p-1 mb-1 bg-light text-dark" onClick={onClickExtranjeria}>Extranjería <i className="fas fa-arrow-down"></i></div>
                    <div className={showExtranjeria ? 'card-body' : 'hidden'}>
                        {

                            extranjeriaList.map((val, i) => {
                                if (i % 2) {
                                    return (
                                        <div className="form-row">
                                            <div className="col-sm-6">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value={extranjeriaList[i - 1].value} name="Checkbox[]" />
                                                    <label className="form-check-label">{extranjeriaList[i - 1].label}</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value={val.value} name="Checkbox[]" />
                                                    <label className="form-check-label">{val.label}</label>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                            })
                        }
                    </div>
                </div>
                <div className="form-group">
                    <div className="p-1 mb-1 bg-light text-dark" onClick={onClickAsistencia}>Asistencia Laboral <i className="fas fa-arrow-down"></i></div>
                    <div className={showAsistencia ? 'card-body' : 'hidden'}>
                        <div id="asistenciaLaboral">
                            <div className="form-row">
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="asistenciaLaboral" name="Checkbox\[\]" />
                                        <label className="form-check-label">Asistencia Laboral</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="finiquitos" name="Checkbox\[\]" />
                                        <label className="form-check-label">Finiquitos</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="informacionDerechosLaborales" name="Checkbox\[\]" />
                                        <label className="form-check-label">Información derechos laborales</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="actoConciliacion" name="Checkbox\[\]" />
                                        <label className="form-check-label">Acto de conciliacion</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="seguimientoDemandaLaboral" name="Checkbox[]" />
                                        <label className="form-check-label">Seguimiento demanda laboral</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="agresionLaboral" name="Checkbox[]" />
                                        <label className="form-check-label">Agresión/Discriminación entorno laboral</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="cajaResistencia" name="Checkbox[]" />
                                        <label className="form-check-label">Caja resistencia / Apoyo economico</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="p-1 mb-1 bg-light text-dark" onClick={onClickAsesoramiento}>Asesoramiento / Orientación <i className="fas fa-arrow-down"></i></div>
                    <div className={showAsesoramiento ? 'card-body' : 'hidden'}>
                        <div className="form-row">
                            <div className="col-sm-6">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="asesoramiento" name="Checkbox[]" />
                                    <label className="form-check-label">Asesoramiento / Orientación</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="p-1 mb-1 bg-light text-dark" onClick={onClickAyudas}> Ayudas sociales <i className="fas fa-arrow-down"></i></div>
                    <div className={showAyudas ? 'card-body' : 'hidden'}>
                        <div className="form-row">
                            <div className="col-sm-6">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="ayudas" name="Checkbox[]" />
                                    <label className="form-check-label">Ayudas sociales</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="p-1 mb-1 bg-light text-dark" onClick={onClickDiscriminacion}> Discriminación <i className="fas fa-arrow-down"></i></div>
                    <div className={showDiscriminacion ? 'card-body' : 'hidden'}>
                        <div className="form-row">
                            <div className="col-sm-6">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="discriminacion" name="Checkbox[]" />
                                    <label className="form-check-label">Discriminación</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <button type="submit" name="submit" onClick={handleSubmit(onSubmit)} className="btn btn-primary" >Añadir Caso</button>
            </form>
        </>
    )
}
