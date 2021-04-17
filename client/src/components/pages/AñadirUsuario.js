import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '../Navbar'
import { Redirect } from 'react-router-dom';
import auth from '../auth';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function AñadirUsuario({ usuario }) {
	console.log(auth.getEmail())

	const isAddMode = !usuario;

	const { register, errors, handleSubmit, setValue } = useForm();
	const [open, setOpen] = useState()
	const [sedes, setSedes] = useState([]);
	const [user, setUser] = useState({});

	useEffect(() => {
		axios.get('http://localhost:8080/sedes/all').then(res => {
			setSedes(res.data);
		})
			.catch(err => {
				console.log(err);
			})
	}, []);

	const onSubmit = (data, e) => {
		data = {
			...data,
			trabajadorId: localStorage.email
		}
		return isAddMode
			? createUser(data)
			: updateUser(usuario, data);

	}

	const createUser = (data) => {
		axios.post('http://localhost:8080/usuario/create', { data }).then(res => {
			console.log(res);
			setOpen(true);
		});
	}

	const updateUser = (usr, data) => {
		axios.post('http://localhost:8080/usuario/update/{id}'.replace('{id}', usr), { data }).then(res => {
			console.log(res);
			setOpen(true);
		});
	}

	const getUser = () => {
		if (!isAddMode) {
			axios.get('http://localhost:8080/usuario/getByDocumentacion/{n_doc}'.replace('{n_doc}', usuario))
				.then(response => {
					setUser(response.data[0])
					const userVar = response.data[0]
					const fields = ['nombre', 'apellido1', 'apellido2', 'tipo_documentacion', 'n_documentacion', 'genero', 'sedeId', 'trabajadorId', 'email', 'telefono', 'direccion', 'cp', 'localidad', 'provincia', 'pais_origen', 'nacionalidad']
					fields.forEach(field => setValue(field, userVar[field]));

				});
		}
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};


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
									<input type="text" className="form-control" id="inputDocumentation" name="n_documentacion" placeholder='11223344J' ref={register} />
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
									<select className="form-control" name="sedeId" defaultValue={localStorage.sedeId} ref={register}>
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
									<input type="tel" className="form-control" id="inputTelephone" name="telefono" placeholder='666111222' ref={register} />
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
										<option value="AF">Afganistán</option>
										<option value="AL">Albania</option>
										<option value="DE">Alemania</option>
										<option value="AD">Andorra</option>
										<option value="AO">Angola</option>
										<option value="AI">Anguilla</option>
										<option value="AQ">Antártida</option>
										<option value="AG">Antigua y Barbuda</option>
										<option value="AN">Antillas Holandesas</option>
										<option value="SA">Arabia Saudí</option>
										<option value="DZ">Argelia</option>
										<option value="AR">Argentina</option>
										<option value="AM">Armenia</option>
										<option value="AW">Aruba</option>
										<option value="AU">Australia</option>
										<option value="AT">Austria</option>
										<option value="AZ">Azerbaiyán</option>
										<option value="BS">Bahamas</option>
										<option value="BH">Bahrein</option>
										<option value="BD">Bangladesh</option>
										<option value="BB">Barbados</option>
										<option value="BE">Bélgica</option>
										<option value="BZ">Belice</option>
										<option value="BJ">Benin</option>
										<option value="BM">Bermudas</option>
										<option value="BY">Bielorrusia</option>
										<option value="MM">Birmania</option>
										<option value="BO">Bolivia</option>
										<option value="BA">Bosnia y Herzegovina</option>
										<option value="BW">Botswana</option>
										<option value="BR">Brasil</option>
										<option value="BN">Brunei</option>
										<option value="BG">Bulgaria</option>
										<option value="BF">Burkina Faso</option>
										<option value="BI">Burundi</option>
										<option value="BT">Bután</option>
										<option value="CV">Cabo Verde</option>
										<option value="KH">Camboya</option>
										<option value="CM">Camerún</option>
										<option value="CA">Canadá</option>
										<option value="TD">Chad</option>
										<option value="CL">Chile</option>
										<option value="CN">China</option>
										<option value="CY">Chipre</option>
										<option value="VA">Ciudad del Vaticano (Santa Sede)</option>
										<option value="CO">Colombia</option>
										<option value="KM">Comores</option>
										<option value="CG">Congo</option>
										<option value="CD">Congo, República Democrática del</option>
										<option value="KR">Corea</option>
										<option value="KP">Corea del Norte</option>
										<option value="CI">Costa de Marfíl</option>
										<option value="CR">Costa Rica</option>
										<option value="HR">Croacia (Hrvatska)</option>
										<option value="CU">Cuba</option>
										<option value="DK">Dinamarca</option>
										<option value="DJ">Djibouti</option>
										<option value="DM">Dominica</option>
										<option value="EC">Ecuador</option>
										<option value="EG">Egipto</option>
										<option value="SV">El Salvador</option>
										<option value="AE">Emiratos Árabes Unidos</option>
										<option value="ER">Eritrea</option>
										<option value="SI">Eslovenia</option>
										<option value="ES">España</option>
										<option value="US">Estados Unidos</option>
										<option value="EE">Estonia</option>
										<option value="ET">Etiopía</option>
										<option value="FJ">Fiji</option>
										<option value="PH">Filipinas</option>
										<option value="FI">Finlandia</option>
										<option value="FR">Francia</option>
										<option value="GA">Gabón</option>
										<option value="GM">Gambia</option>
										<option value="GE">Georgia</option>
										<option value="GH">Ghana</option>
										<option value="GI">Gibraltar</option>
										<option value="GD">Granada</option>
										<option value="GR">Grecia</option>
										<option value="GL">Groenlandia</option>
										<option value="GP">Guadalupe</option>
										<option value="GU">Guam</option>
										<option value="GT">Guatemala</option>
										<option value="GY">Guayana</option>
										<option value="GF">Guayana Francesa</option>
										<option value="GN">Guinea</option>
										<option value="GQ">Guinea Ecuatorial</option>
										<option value="GW">Guinea-Bissau</option>
										<option value="HT">Haití</option>
										<option value="HN">Honduras</option>
										<option value="HU">Hungría</option>
										<option value="IN">India</option>
										<option value="ID">Indonesia</option>
										<option value="IQ">Irak</option>
										<option value="IR">Irán</option>
										<option value="IE">Irlanda</option>
										<option value="BV">Isla Bouvet</option>
										<option value="CX">Isla de Christmas</option>
										<option value="IS">Islandia</option>
										<option value="KY">Islas Caimán</option>
										<option value="CK">Islas Cook</option>
										<option value="CC">Islas de Cocos o Keeling</option>
										<option value="FO">Islas Faroe</option>
										<option value="HM">Islas Heard y McDonald</option>
										<option value="FK">Islas Malvinas</option>
										<option value="MP">Islas Marianas del Norte</option>
										<option value="MH">Islas Marshall</option>
										<option value="UM">Islas menores de Estados Unidos</option>
										<option value="PW">Islas Palau</option>
										<option value="SB">Islas Salomón</option>
										<option value="SJ">Islas Svalbard y Jan Mayen</option>
										<option value="TK">Islas Tokelau</option>
										<option value="TC">Islas Turks y Caicos</option>
										<option value="VI">Islas Vírgenes (EEUU)</option>
										<option value="VG">Islas Vírgenes (Reino Unido)</option>
										<option value="WF">Islas Wallis y Futuna</option>
										<option value="IL">Israel</option>
										<option value="IT">Italia</option>
										<option value="JM">Jamaica</option>
										<option value="JP">Japón</option>
										<option value="JO">Jordania</option>
										<option value="KZ">Kazajistán</option>
										<option value="KE">Kenia</option>
										<option value="KG">Kirguizistán</option>
										<option value="KI">Kiribati</option>
										<option value="KW">Kuwait</option>
										<option value="LA">Laos</option>
										<option value="LS">Lesotho</option>
										<option value="LV">Letonia</option>
										<option value="LB">Líbano</option>
										<option value="LR">Liberia</option>
										<option value="LY">Libia</option>
										<option value="LI">Liechtenstein</option>
										<option value="LT">Lituania</option>
										<option value="LU">Luxemburgo</option>
										<option value="MK">Macedonia, Ex-República Yugoslava de</option>
										<option value="MG">Madagascar</option>
										<option value="MY">Malasia</option>
										<option value="MW">Malawi</option>
										<option value="MV">Maldivas</option>
										<option value="ML">Malí</option>
										<option value="MT">Malta</option>
										<option value="MA">Marruecos</option>
										<option value="MQ">Martinica</option>
										<option value="MU">Mauricio</option>
										<option value="MR">Mauritania</option>
										<option value="YT">Mayotte</option>
										<option value="MX">México</option>
										<option value="FM">Micronesia</option>
										<option value="MD">Moldavia</option>
										<option value="MC">Mónaco</option>
										<option value="MN">Mongolia</option>
										<option value="MS">Montserrat</option>
										<option value="MZ">Mozambique</option>
										<option value="NA">Namibia</option>
										<option value="NR">Nauru</option>
										<option value="NP">Nepal</option>
										<option value="NI">Nicaragua</option>
										<option value="NE">Níger</option>
										<option value="NG">Nigeria</option>
										<option value="NU">Niue</option>
										<option value="NF">Norfolk</option>
										<option value="NO">Noruega</option>
										<option value="NC">Nueva Caledonia</option>
										<option value="NZ">Nueva Zelanda</option>
										<option value="OM">Omán</option>
										<option value="NL">Países Bajos</option>
										<option value="PA">Panamá</option>
										<option value="PG">Papúa Nueva Guinea</option>
										<option value="PK">Paquistán</option>
										<option value="PY">Paraguay</option>
										<option value="PE">Perú</option>
										<option value="PN">Pitcairn</option>
										<option value="PF">Polinesia Francesa</option>
										<option value="PL">Polonia</option>
										<option value="PT">Portugal</option>
										<option value="PR">Puerto Rico</option>
										<option value="QA">Qatar</option>
										<option value="UK">Reino Unido</option>
										<option value="CF">República Centroafricana</option>
										<option value="CZ">República Checa</option>
										<option value="ZA">República de Sudáfrica</option>
										<option value="DO">República Dominicana</option>
										<option value="SK">República Eslovaca</option>
										<option value="RE">Reunión</option>
										<option value="RW">Ruanda</option>
										<option value="RO">Rumania</option>
										<option value="RU">Rusia</option>
										<option value="EH">Sahara Occidental</option>
										<option value="KN">Saint Kitts y Nevis</option>
										<option value="WS">Samoa</option>
										<option value="AS">Samoa Americana</option>
										<option value="SM">San Marino</option>
										<option value="VC">San Vicente y Granadinas</option>
										<option value="SH">Santa Helena</option>
										<option value="LC">Santa Lucía</option>
										<option value="ST">Santo Tomé y Príncipe</option>
										<option value="SN">Senegal</option>
										<option value="SC">Seychelles</option>
										<option value="SL">Sierra Leona</option>
										<option value="SG">Singapur</option>
										<option value="SY">Siria</option>
										<option value="SO">Somalia</option>
										<option value="LK">Sri Lanka</option>
										<option value="PM">St Pierre y Miquelon</option>
										<option value="SZ">Suazilandia</option>
										<option value="SD">Sudán</option>
										<option value="SE">Suecia</option>
										<option value="CH">Suiza</option>
										<option value="SR">Surinam</option>
										<option value="TH">Tailandia</option>
										<option value="TW">Taiwán</option>
										<option value="TZ">Tanzania</option>
										<option value="TJ">Tayikistán</option>
										<option value="TF">Territorios franceses del Sur</option>
										<option value="TP">Timor Oriental</option>
										<option value="TG">Togo</option>
										<option value="TO">Tonga</option>
										<option value="TT">Trinidad y Tobago</option>
										<option value="TN">Túnez</option>
										<option value="TM">Turkmenistán</option>
										<option value="TR">Turquía</option>
										<option value="TV">Tuvalu</option>
										<option value="UA">Ucrania</option>
										<option value="UG">Uganda</option>
										<option value="UY">Uruguay</option>
										<option value="UZ">Uzbekistán</option>
										<option value="VU">Vanuatu</option>
										<option value="VE">Venezuela</option>
										<option value="VN">Vietnam</option>
										<option value="YE">Yemen</option>
										<option value="YU">Yugoslavia</option>
										<option value="ZM">Zambia</option>
										<option value="ZW">Zimbabue</option>
									</select>
								</div>

								<div className="form-group col-md-4">
									<label htmlFor="inputNationality">Nacionalidad</label>
									<select id="inputNationality" defaultValue="ES" className="form-control" name="nacionalidad" ref={register}>
										<option>OTRO</option>
										<option value="AF">Afganistán</option>
										<option value="AL">Albania</option>
										<option value="DE">Alemania</option>
										<option value="AD">Andorra</option>
										<option value="AO">Angola</option>
										<option value="AI">Anguilla</option>
										<option value="AQ">Antártida</option>
										<option value="AG">Antigua y Barbuda</option>
										<option value="AN">Antillas Holandesas</option>
										<option value="SA">Arabia Saudí</option>
										<option value="DZ">Argelia</option>
										<option value="AR">Argentina</option>
										<option value="AM">Armenia</option>
										<option value="AW">Aruba</option>
										<option value="AU">Australia</option>
										<option value="AT">Austria</option>
										<option value="AZ">Azerbaiyán</option>
										<option value="BS">Bahamas</option>
										<option value="BH">Bahrein</option>
										<option value="BD">Bangladesh</option>
										<option value="BB">Barbados</option>
										<option value="BE">Bélgica</option>
										<option value="BZ">Belice</option>
										<option value="BJ">Benin</option>
										<option value="BM">Bermudas</option>
										<option value="BY">Bielorrusia</option>
										<option value="MM">Birmania</option>
										<option value="BO">Bolivia</option>
										<option value="BA">Bosnia y Herzegovina</option>
										<option value="BW">Botswana</option>
										<option value="BR">Brasil</option>
										<option value="BN">Brunei</option>
										<option value="BG">Bulgaria</option>
										<option value="BF">Burkina Faso</option>
										<option value="BI">Burundi</option>
										<option value="BT">Bután</option>
										<option value="CV">Cabo Verde</option>
										<option value="KH">Camboya</option>
										<option value="CM">Camerún</option>
										<option value="CA">Canadá</option>
										<option value="TD">Chad</option>
										<option value="CL">Chile</option>
										<option value="CN">China</option>
										<option value="CY">Chipre</option>
										<option value="VA">Ciudad del Vaticano (Santa Sede)</option>
										<option value="CO">Colombia</option>
										<option value="KM">Comores</option>
										<option value="CG">Congo</option>
										<option value="CD">Congo, República Democrática del</option>
										<option value="KR">Corea</option>
										<option value="KP">Corea del Norte</option>
										<option value="CI">Costa de Marfíl</option>
										<option value="CR">Costa Rica</option>
										<option value="HR">Croacia (Hrvatska)</option>
										<option value="CU">Cuba</option>
										<option value="DK">Dinamarca</option>
										<option value="DJ">Djibouti</option>
										<option value="DM">Dominica</option>
										<option value="EC">Ecuador</option>
										<option value="EG">Egipto</option>
										<option value="SV">El Salvador</option>
										<option value="AE">Emiratos Árabes Unidos</option>
										<option value="ER">Eritrea</option>
										<option value="SI">Eslovenia</option>
										<option value="ES">España</option>
										<option value="US">Estados Unidos</option>
										<option value="EE">Estonia</option>
										<option value="ET">Etiopía</option>
										<option value="FJ">Fiji</option>
										<option value="PH">Filipinas</option>
										<option value="FI">Finlandia</option>
										<option value="FR">Francia</option>
										<option value="GA">Gabón</option>
										<option value="GM">Gambia</option>
										<option value="GE">Georgia</option>
										<option value="GH">Ghana</option>
										<option value="GI">Gibraltar</option>
										<option value="GD">Granada</option>
										<option value="GR">Grecia</option>
										<option value="GL">Groenlandia</option>
										<option value="GP">Guadalupe</option>
										<option value="GU">Guam</option>
										<option value="GT">Guatemala</option>
										<option value="GY">Guayana</option>
										<option value="GF">Guayana Francesa</option>
										<option value="GN">Guinea</option>
										<option value="GQ">Guinea Ecuatorial</option>
										<option value="GW">Guinea-Bissau</option>
										<option value="HT">Haití</option>
										<option value="HN">Honduras</option>
										<option value="HU">Hungría</option>
										<option value="IN">India</option>
										<option value="ID">Indonesia</option>
										<option value="IQ">Irak</option>
										<option value="IR">Irán</option>
										<option value="IE">Irlanda</option>
										<option value="BV">Isla Bouvet</option>
										<option value="CX">Isla de Christmas</option>
										<option value="IS">Islandia</option>
										<option value="KY">Islas Caimán</option>
										<option value="CK">Islas Cook</option>
										<option value="CC">Islas de Cocos o Keeling</option>
										<option value="FO">Islas Faroe</option>
										<option value="HM">Islas Heard y McDonald</option>
										<option value="FK">Islas Malvinas</option>
										<option value="MP">Islas Marianas del Norte</option>
										<option value="MH">Islas Marshall</option>
										<option value="UM">Islas menores de Estados Unidos</option>
										<option value="PW">Islas Palau</option>
										<option value="SB">Islas Salomón</option>
										<option value="SJ">Islas Svalbard y Jan Mayen</option>
										<option value="TK">Islas Tokelau</option>
										<option value="TC">Islas Turks y Caicos</option>
										<option value="VI">Islas Vírgenes (EEUU)</option>
										<option value="VG">Islas Vírgenes (Reino Unido)</option>
										<option value="WF">Islas Wallis y Futuna</option>
										<option value="IL">Israel</option>
										<option value="IT">Italia</option>
										<option value="JM">Jamaica</option>
										<option value="JP">Japón</option>
										<option value="JO">Jordania</option>
										<option value="KZ">Kazajistán</option>
										<option value="KE">Kenia</option>
										<option value="KG">Kirguizistán</option>
										<option value="KI">Kiribati</option>
										<option value="KW">Kuwait</option>
										<option value="LA">Laos</option>
										<option value="LS">Lesotho</option>
										<option value="LV">Letonia</option>
										<option value="LB">Líbano</option>
										<option value="LR">Liberia</option>
										<option value="LY">Libia</option>
										<option value="LI">Liechtenstein</option>
										<option value="LT">Lituania</option>
										<option value="LU">Luxemburgo</option>
										<option value="MK">Macedonia, Ex-República Yugoslava de</option>
										<option value="MG">Madagascar</option>
										<option value="MY">Malasia</option>
										<option value="MW">Malawi</option>
										<option value="MV">Maldivas</option>
										<option value="ML">Malí</option>
										<option value="MT">Malta</option>
										<option value="MA">Marruecos</option>
										<option value="MQ">Martinica</option>
										<option value="MU">Mauricio</option>
										<option value="MR">Mauritania</option>
										<option value="YT">Mayotte</option>
										<option value="MX">México</option>
										<option value="FM">Micronesia</option>
										<option value="MD">Moldavia</option>
										<option value="MC">Mónaco</option>
										<option value="MN">Mongolia</option>
										<option value="MS">Montserrat</option>
										<option value="MZ">Mozambique</option>
										<option value="NA">Namibia</option>
										<option value="NR">Nauru</option>
										<option value="NP">Nepal</option>
										<option value="NI">Nicaragua</option>
										<option value="NE">Níger</option>
										<option value="NG">Nigeria</option>
										<option value="NU">Niue</option>
										<option value="NF">Norfolk</option>
										<option value="NO">Noruega</option>
										<option value="NC">Nueva Caledonia</option>
										<option value="NZ">Nueva Zelanda</option>
										<option value="OM">Omán</option>
										<option value="NL">Países Bajos</option>
										<option value="PA">Panamá</option>
										<option value="PG">Papúa Nueva Guinea</option>
										<option value="PK">Paquistán</option>
										<option value="PY">Paraguay</option>
										<option value="PE">Perú</option>
										<option value="PN">Pitcairn</option>
										<option value="PF">Polinesia Francesa</option>
										<option value="PL">Polonia</option>
										<option value="PT">Portugal</option>
										<option value="PR">Puerto Rico</option>
										<option value="QA">Qatar</option>
										<option value="UK">Reino Unido</option>
										<option value="CF">República Centroafricana</option>
										<option value="CZ">República Checa</option>
										<option value="ZA">República de Sudáfrica</option>
										<option value="DO">República Dominicana</option>
										<option value="SK">República Eslovaca</option>
										<option value="RE">Reunión</option>
										<option value="RW">Ruanda</option>
										<option value="RO">Rumania</option>
										<option value="RU">Rusia</option>
										<option value="EH">Sahara Occidental</option>
										<option value="KN">Saint Kitts y Nevis</option>
										<option value="WS">Samoa</option>
										<option value="AS">Samoa Americana</option>
										<option value="SM">San Marino</option>
										<option value="VC">San Vicente y Granadinas</option>
										<option value="SH">Santa Helena</option>
										<option value="LC">Santa Lucía</option>
										<option value="ST">Santo Tomé y Príncipe</option>
										<option value="SN">Senegal</option>
										<option value="SC">Seychelles</option>
										<option value="SL">Sierra Leona</option>
										<option value="SG">Singapur</option>
										<option value="SY">Siria</option>
										<option value="SO">Somalia</option>
										<option value="LK">Sri Lanka</option>
										<option value="PM">St Pierre y Miquelon</option>
										<option value="SZ">Suazilandia</option>
										<option value="SD">Sudán</option>
										<option value="SE">Suecia</option>
										<option value="CH">Suiza</option>
										<option value="SR">Surinam</option>
										<option value="TH">Tailandia</option>
										<option value="TW">Taiwán</option>
										<option value="TZ">Tanzania</option>
										<option value="TJ">Tayikistán</option>
										<option value="TF">Territorios franceses del Sur</option>
										<option value="TP">Timor Oriental</option>
										<option value="TG">Togo</option>
										<option value="TO">Tonga</option>
										<option value="TT">Trinidad y Tobago</option>
										<option value="TN">Túnez</option>
										<option value="TM">Turkmenistán</option>
										<option value="TR">Turquía</option>
										<option value="TV">Tuvalu</option>
										<option value="UA">Ucrania</option>
										<option value="UG">Uganda</option>
										<option value="UY">Uruguay</option>
										<option value="UZ">Uzbekistán</option>
										<option value="VU">Vanuatu</option>
										<option value="VE">Venezuela</option>
										<option value="VN">Vietnam</option>
										<option value="YE">Yemen</option>
										<option value="YU">Yugoslavia</option>
										<option value="ZM">Zambia</option>
										<option value="ZW">Zimbabue</option>
									</select>
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