import React, { useState, useEffect } from 'react';

export default function AñadirIntervencion() {
    const [showTrabajador, setShowTrabajador] = useState(false);
    const [showDiscriminacion, setShowDiscriminacion] = useState(false);
    const [showExtranjeria, setShowExtranjeria] = useState(false);

    const onClickTrabajador = () => {setShowTrabajador(!showTrabajador)};
    const onClickDiscriminacion = () => {setShowDiscriminacion(!showDiscriminacion)};
    const onClickExtranjeria = () => {setShowExtranjeria(!showExtranjeria)};

    return (
        <>
            <div className="container padding25">
                <h3>Añadir Caso</h3>
                <div className="card mb-3">
                    <div className="card-header text-white bg-secondary" onClick={onClickTrabajador}>Datos Trabajadora del Hogar</div>
                    <div className={showTrabajador ? 'card-body' : 'hidden'} id="TrabajadoraDelHogar">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label for="t_motivo">Motivo consulta</label>
                                <select id="t_motivo" className="form-control" name="t_motivo">
                                    <option selected>Otro</option>
                                    <option>Información</option>
                                    <option>Despido/Desistimiento</option>
                                    <option>Despido Maternidad</option>
                                    <option>Muerte</option>
                                    <option>Ingreso Residencia</option>
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label for="t_n_casas">Nº Casas</label>
                                <input type="number" className="form-control" id="t_n_casas" name="t_n_casas" />
                            </div>
                            <div className="form-group col-md-4">
                                <label for="t_regularizada">Regularizada</label>
                                <select id="t_regularizada" className="form-control" name="t_regularizada">
                                    <option selected>Si</option>
                                    <option>No</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label for="t_fechaComienzo">Fecha Comienzo Trabajo</label>
                                <input type="date" className="form-control" id="t_fechaComienzo" name="t_fechaComienzo" />
                            </div>
                            <div className="form-group col-md-4">
                                <label for="t_fechaFinal">Fecha Final Trabajo</label>
                                <input type="date" className="form-control" id="t_fechaFinal" name="t_fechaFinal" />
                            </div>
                            <div className="form-group col-md-4">
                                <label for="t_fechaDespido">Fecha Despido</label>
                                <input type="date" className="form-control" id="t_fechaDespido" name="t_fechaDespido" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label for="t_formaEmpleo">Forma Conseguir Empleo</label>
                            <input type="text" className="form-control" id="t_formaEmpleo" name="t_formaEmpleo" />
                        </div>


                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label for="t_contratador">¿Quién te contrato?</label>
                                <select id="t_contratador" className="form-control" name="t_contratador">
                                    <option selected>Persona atendida</option>
                                    <option>Pariente mujer</option>
                                    <option>Pariente hombre</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label for="t_soloFines">Solo fines de semana</label>
                                <select id="t_soloFines" className="form-control" name="t_soloFines">
                                    <option selected>Si</option>
                                    <option>No</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label for="t_horario">Horario</label>
                            <textarea className="form-control" id="t_horario" rows="3" name="t_horario"></textarea>
                        </div>


                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label for="t_totalHoras">Total horas semana</label>
                                <input type="number" className="form-control" id="t_totalHoras" name="t_totalHoras" />
                            </div>
                            <div className="form-group col-md-3">
                                <label for="t_libraFestivos">Libra festivos</label>
                                <select id="t_libraFestivos" className="form-control" name="t_libraFestivos">
                                    <option selected>Si</option>
                                    <option>No</option>
                                    <option>F</option>
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <div className="form-check mb-2 mr-sm-2">
                                    <input className="form-check-input" type="checkbox" value="1" id="t_noLibraCobra" name="t_noLibraCobra" />
                                    <label className="form-check-label" for="t_noLibraCobra">
                                        No los libra pero los cobra
								</label>
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="t_festivosCobra">Cuanto cobra</label>
                                <input type="number" className="form-control" id="t_festivosCobra" name="t_festivosCobra" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label for="t_salario">Salario</label>
                                <input type="number" className="form-control" id="t_salario" name="t_salario" />
                            </div>
                            <div className="form-group col-md-4">
                                <label for="t_pagas">Pagas</label>
                                <input type="number" className="form-control" id="t_pagas" name="t_pagas" />
                            </div>
                            <div className="form-group col-md-4">
                                <label for="t_metodoPago">Te pagan</label>
                                <select id="t_metodoPago" className="form-control" name="t_metodoPago">
                                    <option selected>En mano</option>
                                    <option>Banco</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label for="t_nomina">Nomina</label>
                                <select id="t_nomina" className="form-control" name="t_nomina">
                                    <option selected>Si</option>
                                    <option>No</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label for="t_contrato">Contrato</label>
                                <select id="t_contrato" className="form-control" name="t_contrato">
                                    <option selected>Si</option>
                                    <option>No</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label for="t_seguridadSocial">Seguridad social</label>
                                <select id="t_seguridadSocial" className="form-control" name="t_seguridadSocial">
                                    <option selected>Si</option>
                                    <option>No</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="t_vacaciones">Vacaciones</label>
                                <select id="t_vacaciones" className="form-control" name="t_vacaciones">
                                    <option selected>Si (descansa un mes) </option>
                                    <option>No y no las cobra aparte</option>
                                    <option>No y las cobra aparte</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="t_tipoTrabajo">Tipo de trabajo</label>
                                <select id="t_tipoTrabajo" className="form-control" name="t_tipoTrabajo">
                                    <option selected>Cuidado de adultos como actividad principal</option>
                                    <option>Tareas domésticas sin cuidado</option>
                                    <option>Cuidado de adultos NO actividad principal</option>
                                    <option>Cuidado y número de criaturas</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row align-items-center">
                            <div className="form-group col-md-3">
                                <label for="t_vacaciones">Mayores</label>
                                <input type="number" className="form-control" id="t_pagas" name="t_pagas" />
                            </div>
                            <div className="align-items-center">
                                <div className="form-group col-md-1">

                                    <label className="radio-inline" for="flexRadioDefault1"> <input className="form-check-input" type="radio" name="radioMayores" id="flexRadioDefault1" />M</label>

                                </div>
                            </div>
                            <div className="align-items-center">
                                <div className="form-group col-md-1">

                                    <label className="radio-inline" for="flexRadioDefault1"> <input className="form-check-input" type="radio" name="radioMayores" id="flexRadioDefault1" />H</label>

                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="t_vacaciones">Enfermos</label>
                                <input type="number" className="form-control" id="t_pagas" name="t_pagas" />
                            </div>
                            <div className="align-items-center">
                                <div className="form-group col-md-1">

                                    <input className="form-check-input" type="radio" name="radioMayores" id="flexRadioDefault1" />
                                    <label className="radio-inline" for="flexRadioDefault1">M </label>

                                </div>
                            </div>
                            <div className="align-items-center">
                                <div className="form-group col-md-1">

                                    <label className="radio-inline" for="flexRadioDefault1"> <input className="form-check-input" type="radio" name="radioMayores" id="flexRadioDefault1" />H</label>

                                </div>
                            </div>
                            <div className="form-group col-md-2">
                                <label for="t_tipoTrabajo">Viven solos</label>
                                <select id="t_tipoTrabajo" className="form-control" name="t_tipoTrabajo">
                                    <option selected>Si</option>
                                    <option>No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}