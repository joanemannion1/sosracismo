import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { extranjeriaList, proyectosList } from '../extranjeriaList'
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import { authenticationService } from '../../_services';
import history from '../../history';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ExtranjeriaForm({ usuario, caso }) {
    let currentUser = ''
    if (authenticationService.currentUserValue) { 
        currentUser = authenticationService.currentUserValue
    }else {
        history.push('/LogIn')
    }
    
    const isAddMode = !caso;

    // MUI ALERT
    const [open, setOpen] = useState()
    const [error, setError] = useState()
    const [newCasoId, setNewCasoId] = useState()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false)
        setOpen(false);
    };

    const [showExtranjeria, setShowExtranjeria] = useState(false);
    const [showAsistencia, setShowAsistencia] = useState(false);
    const [showAsesoramiento, setShowAsesoramiento] = useState(false);
    const [showAyudas, setShowAyudas] = useState(false);
    const [showDiscriminacion, setShowDiscriminacion] = useState(false);
    const [checkedNecesidad, setCheckedNecesidad] = useState([]);
    const [checkedProyecto, setCheckedProyecto] = useState([]);
    const [selectedProyecto, setSelectedProyecto] = useState('');

    const onClickExtranjeria = () => { setShowExtranjeria(!showExtranjeria) };
    const onClickAsistencia = () => { setShowAsistencia(!showAsistencia) };
    const onClickAsesoramiento = () => { setShowAsesoramiento(!showAsesoramiento) };
    const onClickAyudas = () => { setShowAyudas(!showAyudas) };
    const onClickDiscriminacion = () => { setShowDiscriminacion(!showDiscriminacion) };

    const { register, errors, handleSubmit, setValue, getValues } = useForm();

    const handleToggle = (event) => {

        const value = event.target.value
        const currentIndex = checkedNecesidad.indexOf(value);
        const newChecked = [...checkedNecesidad];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedNecesidad(newChecked);
    };

    const handleToggleProyectos = (event) => {

        const value = event.target.value
        const currentIndex = checkedProyecto.indexOf(value);
        const newChecked = [...checkedProyecto];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedProyecto(newChecked);
    };

    const onSubmit = (data, e) => {
        data = {
            n_documentacion: usuario,
            trabajadorId: currentUser.email,
            necesidad: checkedNecesidad,
            proyectos: checkedProyecto

        }
        return isAddMode
            ? createCaso(data, e)
            : updateCaso(caso, data);
    }
    const createCaso = (data, e) => {
        console.log(data)
        axios.post('http://localhost:8080/caso/create/extranjeria', { data }).then(res => {
            setOpen(true);
            setNewCasoId(res.data.caso)
        }).catch((error) => {
            setError(true)
        })

    }

    const goToVerCaso = () => {
        history.push('/VerCaso/{caso}'.replace('{caso}', newCasoId));
    }


    const updateCaso = (caso, data) => {
        axios.post('http://localhost:8080/caso/update/extranjeria/{id}'.replace('{id}', caso), { data }).then(res => {
            setNewCasoId(caso)
            setOpen(true);
        }).catch((error) => {
            setError(true)
        })

    }

    const getCasoEspecifico = () => {
        if (!isAddMode) {
            axios.get('http://localhost:8080/casoEspecifico/extranjeria/{id}'.replace('{id}', caso))
                .then(response => {
                    const casoVar = response.data[0]
                    setSelectedProyecto(casoVar['proyectos'])
                }).catch(error => {
                    console.log("Ha habido un error obteniendo los datos")
                })
        }
    }

    const getNecesidades = () => {
        if (!isAddMode) {
            axios.get('http://localhost:8080/necesidad/{id}'.replace('{id}', caso))
                .then(response => {
                    const casoVar = response.data
                    const checked = []
                    casoVar.map(necesidad => {
                        checked.push(necesidad.necesidad)
                    })
                    setCheckedNecesidad(checked)
                });

            axios.get('http://localhost:8080/proyecto/{id}'.replace('{id}', caso))
                .then(response => {
                    const casoVar = response.data
                    const checked = []
                    casoVar.map(proyecto => {
                        checked.push(proyecto.proyecto)
                    })
                    setCheckedProyecto(checked)
                });
        }
    }

    useEffect(() => { getCasoEspecifico() }, []);
    useEffect(() => { getNecesidades() }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-2 mb-2 bg-secondary text-white">Proyectos de la intervenci??n</div>
                <div>
                    <FormControl component="fieldset">
                        {/* <RadioGroup aria-label="proyecto" name="proyecto" value={selectedProyecto} onChange={handleChange}>

                            {
                                proyectosList.map((val, i) => {
                                    return (
                                        <FormControlLabel value={val.value} control={<Radio />} label={val.label} />
                                    );
                                })
                            }
                        </RadioGroup> */}
                        {
                            proyectosList.map((val, i) => {
                                return (
                                    <div className="form-row">
                                        <div className="col-sm-11">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" checked={checkedProyecto.indexOf(val.value) !== -1} value={val.value} onChange={e => handleToggleProyectos(e)} />
                                                <label className="form-check-label">{val.label}</label>
                                            </div>
                                        </div>

                                    </div>
                                )

                            })
                        }

                    </FormControl>
                </div>
                <div className="p-2 mb-2 bg-secondary text-white">Necesidad de mi entidad</div>
                <div className="form-group">
                    <div className="p-1 mb-1 bg-light text-dark" onClick={onClickExtranjeria}>Extranjer??a <i className="fas fa-arrow-down"></i></div>
                    <div className={showExtranjeria ? 'card-body' : 'hidden'}>
                        {

                            extranjeriaList.map((val, i) => {
                                if (i % 2) {
                                    return (
                                        <div className="form-row">
                                            <div className="col-sm-6">
                                                <div className="form-check">
                                                    <input className="form-check-input" checked={checkedNecesidad.indexOf(extranjeriaList[i - 1].value) !== -1} type="checkbox" value={extranjeriaList[i - 1].value} onChange={e => handleToggle(e)} />
                                                    <label className="form-check-label">{extranjeriaList[i - 1].label}</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" checked={checkedNecesidad.indexOf(val.value) !== -1} value={val.value} onChange={e => handleToggle(e)} />
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
                                        <input className="form-check-input" checked={checkedNecesidad.indexOf("Asistencia laboral") !== -1} onChange={e => handleToggle(e)} type="checkbox" value="Asistencia Laboral" />
                                        <label className="form-check-label">Asistencia Laboral</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="Finiquitos" checked={checkedNecesidad.indexOf("Finiquitos") !== -1} onChange={e => handleToggle(e)} />
                                        <label className="form-check-label">Finiquitos</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="Informaci??n derechos laborales" checked={checkedNecesidad.indexOf("Informaci??n derechos laborales") !== -1} onChange={e => handleToggle(e)} />
                                        <label className="form-check-label">Informaci??n derechos laborales</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="Acto de conciliacion" checked={checkedNecesidad.indexOf("Acto de conciliacion") !== -1} onChange={e => handleToggle(e)} />
                                        <label className="form-check-label">Acto de conciliacion</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="Seguimiento demanda laboral" checked={checkedNecesidad.indexOf("Seguimiento demanda laboral") !== -1} onChange={e => handleToggle(e)} />
                                        <label className="form-check-label">Seguimiento demanda laboral</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="Agresi??n/Discriminaci??n entorno laboral" checked={checkedNecesidad.indexOf("Agresi??n/Discriminaci??n entorno laboral") !== -1} onChange={e => handleToggle(e)} />
                                        <label className="form-check-label">Agresi??n/Discriminaci??n entorno laboral</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="Caja resistencia / Apoyo economico" checked={checkedNecesidad.indexOf("Caja resistencia / Apoyo economico") !== -1} onChange={e => handleToggle(e)} />
                                        <label className="form-check-label">Caja resistencia / Apoyo economico</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="p-1 mb-1 bg-light text-dark" onClick={onClickAsesoramiento}>Asesoramiento / Orientaci??n <i className="fas fa-arrow-down"></i></div>
                    <div className={showAsesoramiento ? 'card-body' : 'hidden'}>
                        <div className="form-row">
                            <div className="col-sm-6">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Asesoramiento / Orientaci??n" checked={checkedNecesidad.indexOf("Asesoramiento / Orientaci??n") !== -1} onChange={e => handleToggle(e)} />
                                    <label className="form-check-label">Asesoramiento / Orientaci??n</label>
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
                                    <input className="form-check-input" type="checkbox" value="Ayudas sociales" checked={checkedNecesidad.indexOf("Ayudas sociales") !== -1} onChange={e => handleToggle(e)} />
                                    <label className="form-check-label">Ayudas sociales</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="p-1 mb-1 bg-light text-dark" onClick={onClickDiscriminacion}> Discriminaci??n <i className="fas fa-arrow-down"></i></div>
                    <div className={showDiscriminacion ? 'card-body' : 'hidden'}>
                        <div className="form-row">
                            <div className="col-sm-6">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="Discriminaci??n" checked={checkedNecesidad.indexOf("Discriminaci??n") !== -1} onChange={e => handleToggle(e)} />
                                    <label className="form-check-label">Discriminaci??n</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <button type="submit" name="submit" onClick={handleSubmit(onSubmit)} className="btn btn-primary" >{isAddMode ? 'A??adir Caso' : 'Actualizar caso'}</button>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    El caso ha sido {isAddMode ? 'a??adido' : 'actualizado'} correctamente!
                    <Button size="small" onClick={goToVerCaso}>
                        VER CASO
                    </Button>
                </Alert>
            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Ha habido algun error {isAddMode ? 'a??adiendo' : 'actualizando'} el caso :(
        				</Alert>
            </Snackbar>
        </>
    )
}
