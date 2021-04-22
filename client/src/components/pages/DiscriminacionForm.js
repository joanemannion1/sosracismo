import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import auth from '../auth';
import history from '../../history';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DiscriminacionForm({ usuario, caso }) {
    useEffect(() => {
		if(!auth.isAuthenticated()) {
			history.push('/LogIn')
		}
	}, []);
    
    
    const isAddMode = !caso;

    const { register, errors, handleSubmit, setValue, getValues } = useForm();

    const [selectedTipo, setSelectedTipo] = useState("Conflicto");
    const [selectedEstrategia, setSelectedEstrategia] = useState("Asumir");

    const [newCasoId, setNewCasoId] = useState()

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


    const showTipo = (event) => { setSelectedTipo(event.target.value) }
    const showEstrategia = (event) => { setSelectedEstrategia(event.target.value) }

    const goToVerCaso = () => {
        history.push('/VerCaso/{caso}'.replace('{caso}', newCasoId));
    }


    const onSubmit = (data, e) => {
        data = {
            n_documentacion: usuario,
            trabajadorId: localStorage.email,
            ...data
        }
        return isAddMode
            ? createCaso(data, e)
            : updateCaso(caso, data);
    }

    const createCaso = (data, e) => {
        axios.post('http://localhost:8080/caso/create/discriminacion', { data }).then(res => {
            setNewCasoId(res.data.caso)    
            setOpen(true);  
        }).catch((error) => {
            setError(true)
           })

    }

    const updateCaso = (caso, data) => {
        axios.post('http://localhost:8080/caso/update/discriminacion/{id}'.replace('{id}', caso), { data }).then(res => {
            console.log(res)    
        setOpen(true);
        }).catch((error) => {
            setError(true)
           })

    }

    

    const getCasoEspecifico = () => {
        if (!isAddMode) {
            axios.get('http://localhost:8080/casoEspecifico/discriminacion/{id}'.replace('{id}', caso))
                .then(response => {
                    const casoVar = response.data[0]
                    console.log(casoVar)
                    const fields = ['Situacion_documental', 'situacion_residencial', 'estudios', 'rasgos_fenotipicos', 'tipo', 'conflicto', 'denegacion_privada', 'denegacion_publica', 'racismo', 'agente_discriminador', 'relato_hechos', 'municipio', 'identificacion', 'testigos', 'otros', 'estrategia', 'asumir', 'derivar']
                    fields.forEach(field => setValue(field, casoVar[field]));
                    setValue('fecha', casoVar['fecha'].substring(0, 10))
                }).catch(error => {
                    console.log("Ha habido un error obteniendo los datos")
                })
        }
    }

    useEffect(() => { getCasoEspecifico() }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Situación Documental</label>
                        <select className="form-control" ref={register} name="Situacion_documental">
                            <option selected>Nacionalidad Española </option>
                            <option>NIE</option>
                            <option>Irregular</option>
                            <option>Nacional UE</option>
                            <option>Demandante de asilo</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Situación Residencial</label>
                        <select ref={register} name="situacion_residencial" className="form-control">
                            <option selected>Con domicilio</option>
                            <option>Sin domicilio</option>
                            <option>En acogida</option>
                            <option>Otros</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Nivel de estudios</label>
                        <select ref={register} name="estudios" className="form-control">
                            <option selected>Sin estudios</option>
                            <option>Primaria</option>
                            <option>Secunadria</option>
                            <option>Bachiller</option>
                            <option>Formación Profesional</option>
                            <option>Universitarios</option>
                            <option>Tercer Grado</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label>Color de piel / Etnia / Rasgos fenotípicos</label>
                    <textarea className="form-control" ref={register} name="rasgos_fenotipicos" rows="2"></textarea>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label>Tipo</label>
                        <select ref={register} name="tipo" className="form-control" onChange={showTipo}>
                            <option value="Conflicto" selected>Conflictos y agresiones racistas</option>
                            <option value="DenegacionPrivada" >Denegación de acceso a prestaciones y servicios privados</option>
                            <option value="DenegacionPublica" >Denegación de acceso a prestaciones y servicios públicos</option>
                            <option value="Laboral" >Dicriminación laboral</option>
                            <option value="ExtremaDerecha" >Extrema derecha y discurso del odio</option>
                            <option value="Racismo">Racismo institucional</option>
                            <option value="SeguridadPrivada" >Seguridad privada</option>
                            <option value="SeguridadPublica" >Seguridad pública</option>
                        </select>
                    </div>
                </div>

                {/* <!-- Conflictos y agresiones --> */}
                <div className={selectedTipo === "Conflicto" ? "form-row" : 'hidden'} id="Conflictos" >
                    <div className="form-group col-md-12">
                        <label>Conflicto y Agresiones</label>
                        <select ref={selectedTipo === "Conflicto" ? register : null} name="conflicto" className="form-control">
                            <option selected>En el espacio público</option>
                            <option>Conflictos vecinales</option>
                            <option>Otros: indicar</option>
                        </select>
                    </div>
                </div>

                <div className={selectedTipo === "Conflicto" ? "form-group" : 'hidden'} id="ConflictosOtro">
                    <label for="inputDConlictoOtros">Indicar Otros:</label>
                    <textarea className="form-control" id="inputDConlictoOtros" rows="1"></textarea>
                </div>

                {/* <!-- Denegación de acceso a prestaciones y servicios privados --> */}
                <div className={selectedTipo === "DenegacionPrivada" ? "form-row" : 'hidden'} id="DenegacionPrivada" >
                    <div className="form-group col-md-12">
                        <label>Denegación de acceso a prestaciones y servicios privados</label>
                        <select ref={selectedTipo === "DenegacionPrivada" ? register : null} name="denegacion_privada" className="form-control">
                            <option>Bancos</option>
                            <option>Locales de ocio y restuarantes</option>
                            <option >Vivienda</option>
                            <option>Otros</option>
                        </select>
                    </div>
                </div>


                {/* <!-- Denegación de acceso a prestaciones y servicios publicos --> */}
                <div className={selectedTipo === "DenegacionPublica" ? "form-row" : 'hidden'} id="DenegacionPublica">
                    <div className="form-group col-md-12">
                        <label>Denegación de acceso a prestaciones y servicios públicos</label>
                        <select ref={register} name="denegacion_publica" className="form-control">
                            <option>Empleo</option>
                            <option>Asistencia sanitaria</option>
                            <option >Otras administraciones</option>
                            <option>Empadronamiento</option>
                            <option>Servicios sociales</option>
                        </select>
                    </div>
                </div>

                {/* <!-- Racismo institucional --> */}
                <div className={selectedTipo === "Racismo" ? "form-row" : 'hidden'} id="RacismoInstitucional">
                    <div className="form-group col-md-12">
                        <label>Racismo institucional</label>
                        <select ref={register} name="racismo" className="form-control">
                            <option>CIES</option>
                            <option>Nacionalidad</option>
                            <option>Tramites extranjeria</option>
                            <option>Otros: indicar después</option>
                        </select>
                    </div>
                </div>

                <div className={selectedTipo === "Racismo" ? "form-group" : 'hidden'} id="RacismoOtro">
                    <label for="inputDRacismoOtros">Indicar Otros:</label>
                    <textarea className="form-control" id="inputDRacismoOtros" rows="1"></textarea>
                </div>

                {/* <!--Agente discriminador--> */}

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Agente discriminador</label>
                        <select ref={register} name="agente_discriminador" className="form-control">
                            <option selected>Entidad pública</option>
                            <option>Entidad privada</option>
                            <option>Particular</option>
                            <option>Otros</option>

                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Fecha de los hechos</label>
                        <input type="date" className="form-control" ref={register} name="fecha" />
                    </div>

                    <div className="form-group col-md-4">
                        <label>Municipio</label>
                        <input type="text" className="form-control" ref={register} name="municipio" placeholder="Donostia" />
                    </div>
                </div>

                <div className="form-group">
                    <label>Relato de los hechos</label>
                    <textarea className="form-control" ref={register} name="relato_hechos" rows="3"></textarea>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Identificación del agente discriminador</label>
                        <input type="text" className="form-control" ref={register} name="identificacion" />
                    </div>

                    <div className="form-group col-md-4">
                        <label>Personas que pueden testificar</label>
                        <input type="text" className="form-control" ref={register} name="testigos" />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Estrategia a seguir</label>
                        <select ref={register} name="estrategia" className="form-control" onChange={showEstrategia}>
                            <option value="Asumir" selected>Asumimos</option>
                            <option value="Derivar" >Derivamos</option>
                        </select>
                    </div>
                </div>

                <div className={selectedEstrategia === "Asumir" ? 'form-row' : 'hidden'}>
                    <div className="form-group col-md-12" id="AsumimosCaso" >
                        <label>Asumimos caso</label>
                        <select ref={register} name="asumir" className="form-control">
                            <option selected >Via Penal</option>
                            <option>Defensor del pueblo</option>
                            <option >Denuncia pública</option>
                            <option>No desea inponer denuncia</option>
                            <option>Institución causante</option>
                            <option >Otras</option>
                        </select>
                    </div>
                </div>

                <div className={selectedEstrategia === "Derivar" ? 'form-group' : 'hidden'} id="DerivamosCaso">
                    <label>Derivamos caso</label>
                    <textarea className="form-control" ref={register} name="derivar" rows="2"></textarea>
                </div>

                <div className="form-group">
                    <label>Otros elementos probatorios</label>
                    <textarea className="form-control" ref={register} name="otros" rows="2"></textarea>
                </div>

                <button type="submit" name="submit" onClick={handleSubmit(onSubmit)} className="btn btn-primary" >{isAddMode ? 'Añadir Caso' : 'Actualizar caso'}</button>
            </form>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    El caso ha sido {isAddMode ? 'añadido' : 'actualizado'} correctamente!
                    {isAddMode ? <Button size="small" onClick={goToVerCaso}>VER CASO</Button> : null }
        		</Alert>
                
            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Ha habido algun error {isAddMode ? 'añadiendo' : 'actualizando'} el caso :(
        				</Alert>
            </Snackbar>
        </>
    )
}
