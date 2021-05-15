import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Menu from '../Navbar'
import history from '../../history';
import { nacionalidadList } from '../NacionalidadList'
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import { authenticationService } from '../../_services';
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function AñadirUsuario({ usuario }) {

	let currentUser = ''
    if (authenticationService.currentUserValue) { 
        currentUser = authenticationService.currentUserValue
    }else {
        history.push('/LogIn')
    }
      

	const isAddMode = !usuario;

	const { register, errors, handleSubmit, setValue } = useForm();
	const [open, setOpen] = useState()
	const [error, setError] = useState()
	const [sedes, setSedes] = useState([]);
	const [user, setUser] = useState();
	const [nacionalidades, setNacionalidades] = useState([])
	const [telefonoExists, setTelefonoExists] = useState(false)

	useEffect(() => {
		axios.get('http://localhost:8080/sedes/all').then(res => {
			setSedes(res.data);
		}).catch(err => {
				console.log('Ha habido un problema cargando las sedes')
			})
	}, []);

	const onSubmit = (data, e) => {
		data = {
			...data,
			trabajadorId: currentUser.email
		}
		return isAddMode
			? createUser(data)
			: updateUser(usuario, data);

	}

	const createUser = (data) => {
		data = {
			...data,
			nacionalidad: nacionalidades
		}
		axios.post('http://localhost:8080/usuario/create', { data }).then(res => {
			setOpen(true);
		}).catch(error => {
			setError(true)
		})
	}

	const updateUser = (usr, data) => {
		data = {
			...data,
			nacionalidad: nacionalidades
		}
		axios.post('http://localhost:8080/usuario/update/{id}'.replace('{id}', usr), { data }).then(res => {
			setOpen(true);
		}).catch(error => {
			setError(true)
		})
	}

	const getUser = () => {
		if (!isAddMode) {
			axios.get('http://localhost:8080/usuario/getByDocumentacion/{n_doc}'.replace('{n_doc}', usuario))
				.then(response => {
					setUser(response.data[0])
					const userVar = response.data[0]
					const fields = ['nombre', 'apellido1', 'apellido2', 'tipo_documentacion', 'n_documentacion', 'genero', 'sedeId', 'trabajadorId', 'email', 'telefono', 'direccion', 'cp', 'localidad', 'provincia', 'pais_origen']
					fields.forEach(field => setValue(field, userVar[field]));
					const nacionalidadesVar = [];
					const data = response.data
					data.map((user, index) => {
						nacionalidadesVar.push({ name: 'nacionalidad' + index, value: user.nacionalidad })
					})
					setNacionalidades(nacionalidadesVar)
				});
		} else {
			setNacionalidades([{ name: 'nacionalidad', value: 'ES' }])
		}

	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setError(false)
		setOpen(false);
	};

	const comprobarTelefono = (e) => {
		axios.get('http://localhost:8080/usuario/checkTelefono/{telefono}'.replace('{telefono}', e.target.value))
			.then(response => {
				setTelefonoExists(response.data.userExists)
			})
	}

	const selectNacionalidad = (index, e) => {
		const nacionalidadesVar = [...nacionalidades];
		nacionalidadesVar[index] = { name: 'nacionalidad' + index, value: e.target.value }
		setNacionalidades(nacionalidadesVar)
	}

	const nuevoInputNacionalidad = () => {
		const nacionalidadesVar = [...nacionalidades];
		nacionalidadesVar.push({ name: 'nacionalidad', value: 'ES' })
		setNacionalidades(nacionalidadesVar)

	}

	const eliminarInputNacionalidad = (index) => {
		const nacionalidadesVar = [];
		nacionalidades.map((nacionalidad, i) => {
			if (i != index) {
				nacionalidadesVar.push(nacionalidad)
			}
		})
		setNacionalidades(nacionalidadesVar)
	}

	useEffect(() => { getUser() }, []);

	return (
		<>

			<Menu />
			<div className="container padding25">
				<form onSubmit={handleSubmit(onSubmit)}>
					<h3>{isAddMode ? 'Añadir Usuario' : 'Actualizar usuario'}</h3>
					<div className="card mb-3">
						<div className="card-header text-white bg-secondary">Información personal</div>
						<div className="card-body">
							<div className="form-row">
								<div className="form-group col-md-4">
									<label htmlFor="inputName">Nombre</label>
									<input type="text" className="form-control" id="inputName" name="nombre" placeholder='Nombre' required autoFocus
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
								<div className="form-group col-md-4">
									<label htmlFor="inputSurname">Apellido</label>
									<input type="text" className="form-control" id="inputSurname" name="apellido1" placeholder='Apellido' ref={register} />
								</div>
								<div className="form-group col-md-4">
									<label htmlFor="inputSurname2">Apellido 2</label>
									<input type="text" className="form-control" id="inputSurname2" name="apellido2" placeholder='Apellido2' ref={register} />
								</div>
							</div>
							<div className="form-row">
								<div className="form-group col-md-4">
									<label htmlFor="inputDocumentationType">Tipo Documentación</label>
									<select id="inputDocumentationType" defaultValue="dni" className="form-control" name="tipo_documentacion" ref={register}>
										<option value="dni">DNI</option>
										<option value="nie">NIE</option>
										<option value="pasaporte">Pasaporte</option>
									</select>
								</div>
								<div className="form-group col-md-4">
									<label htmlFor="inputDocumentation">Nº Documentación</label>
									<input type="text" className="form-control" id="inputDocumentation" name="n_documentacion" placeholder='11223344J' required autoFocus
										ref={register({
											required: {
												value: true,
												message: 'Número de documentación es requerido'
											}
										})} />
									<span className="text-danger text-small d-block mb-2">
										{errors.n_documentacion && errors.n_documentacion.message}
									</span> 
								</div>
								<div className="form-group col-md-4">
									<label htmlFor="inputGender">Género</label>
									<select id="inputGender" defaultValue="m" className="form-control" name="genero" ref={register}>
										<option value="m">Mujer</option>
										<option value="h">Hombre</option>
										<option value="o">Otro</option>
									</select>
								</div>
							</div>

							<div className="form-row">
								<div className="form-group col-md-6">
									<label>Sede</label>
									<select className="form-control" name="sedeId" ref={register}>
										{
											sedes.map((val) => {
												return <option value={val.sedeId} key={val.sedeId}>{val.nombre}</option>;
											})
										}
									</select>
								</div>

								<div className="form-group col-md-6">
									<label>Quién lo atiende</label>
									<input type="text" className="form-control" id="trabajadorId" name="trabajadorId" value={localStorage.nombre} disabled />
								</div>
							</div>
						</div>
					</div>

					<div className="card mb-3">
						<div className="card-header text-white bg-secondary">Datos de contacto</div>
						<div className="card-body">
							<div className="form-row">
								<div className="form-group col-md-8">
									<label htmlFor="inputEmail">Email</label>
									<input type="email" className="form-control" id="inputEmail" name="email" placeholder='example@example.com' ref={register} />
								</div>
								<div className="form-group col-md-4">
									<label htmlFor="inputTelephone">Teléfono</label>
									<input type="tel" className="form-control" id="inputTelephone" name="telefono" placeholder='666111222' ref={register} onBlur={(e) => comprobarTelefono(e)} />
									{(telefonoExists && isAddMode) ? <span style={{ color: 'red' }}>El telefono introducido ya existe</span> : null}
								</div>
							</div>
						</div>
					</div>


					<div className="card mb-3">
						<div className="card-header text-white bg-secondary">Dirección</div>
						<div className="card-body">
							<div className="form-row">
								<div className="form-group col-md-6">
									<label htmlFor="inputDirecction">Dirección</label>
									<input type="text" className="form-control" id="inputDirecction" name="direccion" ref={register} />
								</div>
								<div className="form-group col-md-3">
									<label htmlFor="InputCP">CP</label>
									<input type="postal-code" className="form-control" id="InputCP" name="cp" ref={register} />
								</div>
								<div className="form-group col-md-3">
									<label htmlFor="InputMunicipio">Municipio</label>
									<input type="text" className="form-control" id="InputMunicipio" name="localidad" ref={register} />
								</div>
							</div>

							<div className="form-row">
								<div className="form-group col-md-4">
									<label htmlFor="inputProvincia">Provincia</label>
									<select id="inputProvincia" defaultValue="guipuzcoa" className="form-control" name="provincia" ref={register}>
										<option value='alava'>Álava</option>
										<option value='albacete'>Albacete</option>
										<option value='alicante'>Alicante/Alacant</option>
										<option value='almeria'>Almería</option>
										<option value='asturias'>Asturias</option>
										<option value='avila'>Ávila</option>
										<option value='badajoz'>Badajoz</option>
										<option value='barcelona'>Barcelona</option>
										<option value='burgos'>Burgos</option>
										<option value='caceres'>Cáceres</option>
										<option value='cadiz'>Cádiz</option>
										<option value='cantabria'>Cantabria</option>
										<option value='castellon'>Castellón/Castelló</option>
										<option value='ceuta'>Ceuta</option>
										<option value='ciudadreal'>Ciudad Real</option>
										<option value='cordoba'>Córdoba</option>
										<option value='cuenca'>Cuenca</option>
										<option value='girona'>Girona</option>
										<option value='laspalmas'>Las Palmas</option>
										<option value='granada'>Granada</option>
										<option value='guadalajara'>Guadalajara</option>
										<option value='guipuzcoa'>Guipúzcoa</option>
										<option value='huelva'>Huelva</option>
										<option value='huesca'>Huesca</option>
										<option value='illesbalears'>Illes Balears</option>
										<option value='jaen'>Jaén</option>
										<option value='acoruña'>A Coruña</option>
										<option value='larioja'>La Rioja</option>
										<option value='leon'>León</option>
										<option value='lleida'>Lleida</option>
										<option value='lugo'>Lugo</option>
										<option value='madrid'>Madrid</option>
										<option value='malaga'>Málaga</option>
										<option value='melilla'>Melilla</option>
										<option value='murcia'>Murcia</option>
										<option value='navarra'>Navarra</option>
										<option value='ourense'>Ourense</option>
										<option value='palencia'>Palencia</option>
										<option value='pontevedra'>Pontevedra</option>
										<option value='salamanca'>Salamanca</option>
										<option value='segovia'>Segovia</option>
										<option value='sevilla'>Sevilla</option>
										<option value='soria'>Soria</option>
										<option value='tarragona'>Tarragona</option>
										<option value='santacruztenerife'>Santa Cruz de Tenerife</option>
										<option value='teruel'>Teruel</option>
										<option value='toledo'>Toledo</option>
										<option value='valencia'>Valencia/Valéncia</option>
										<option value='valladolid'>Valladolid</option>
										<option value='vizcaya'>Vizcaya</option>
										<option value='zamora'>Zamora</option>
										<option value='zaragoza'>Zaragoza</option>
									</select>
								</div>

								<div className="form-group col-md-4">
									<label htmlFor="inputCountry">País de Origen</label>
									<select id="inputCountry" defaultValue="ES" className="form-control" name="pais_origen" ref={register}>
										<option>OTRO</option>
										{
											nacionalidadList.map(nacionalidad => {
												return (<option value={nacionalidad.value}>{nacionalidad.label}</option>)
											})
										}

									</select>
								</div>

								<div className="form-group col-md-4">
									<label>Nacionalidad</label>
									{
										nacionalidades.map((n, index) => {
											return (
												<>
													<div className="form-row">



														<select defaultValue={n.value} className="form-control col-md-10" key={index} name={n.name + index} onChange={(e) => selectNacionalidad(index, e)}>
															<option>OTRO</option>
															{
																nacionalidadList.map((nacionalidad, id) => {
																	return (<option key={id} value={nacionalidad.value}>{nacionalidad.label}</option>)
																})
															}
														</select>
														<IconButton onClick={() => eliminarInputNacionalidad(index)} size="small" color="secondary" className="col-md-2">
															<CloseIcon fontSize="inherit" className="danger" />
														</IconButton>

													</div>


													<br />
												</>
											)
										})
									}
									<IconButton onClick={nuevoInputNacionalidad} size="small">
										<AddCircleIcon fontSize="inherit" /> Añadir nacionalidad
									</IconButton>
								</div>

							</div>
						</div>
					</div>

					<button type="submit" name="submit" className="btn btn-primary">{isAddMode ? 'Añadir Usuario' : 'Actualizar usuario'}</button>

					<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
						<Alert onClose={handleClose} severity="success">
							El usuario ha sido {isAddMode ? 'añadido' : 'actualizado'} correctamente!
        				</Alert>
					</Snackbar>

					<Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
						<Alert onClose={handleClose} severity="error">
							Ha habido algun error {isAddMode ? 'añadiendo' : 'actualizando'} el usuario!
        				</Alert>
					</Snackbar>
					<div className="modal" tabIndex="-1" role="dialog" id="confirmationModal">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Confirmación</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<p>Estas seguro de que quieres añadir un usuario?</p>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-danger" data-dismiss="modal" data-dismiss="modal">Cancelar</button>
									<button type="submit" className="btn btn-secondary" name="guardar">Guradar y salir</button>
									<button type="submit" className="btn btn-secondary" name="intervencion">Guardar y añadir caso</button>
								</div>
							</div>
						</div>
					</div>

				</form>
			</div>
		</>
	)
}