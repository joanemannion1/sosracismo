import React, { useState, useEffect } from 'react';
import axios from 'axios'
import DiscriminacionForm from './DiscriminacionForm'
import TrabajoraHogarForm from './TrabajadoraHogarForm'
import ExtranjeriaForm from './ExtranjeriaForm'
import Menu from '../Navbar'

export default function AñadirCaso({user}) {
    const [showTrabajador, setShowTrabajador] = useState(false);
    const [showDiscriminacion, setShowDiscriminacion] = useState(false);
    const [showExtranjeria, setShowExtranjeria] = useState(false);
    const [usuario, setUsuario] = useState([])

    const onClickTrabajador = () => { setShowTrabajador(!showTrabajador) };
    const onClickDiscriminacion = () => { setShowDiscriminacion(!showDiscriminacion) };
    const onClickExtranjeria = () => { setShowExtranjeria(!showExtranjeria) };

    const getData = () => {
        axios.get('http://localhost:8080/usuario/getByDocumentacion/{n_doc}'.replace('{n_doc}', user))
            .then(response => {
                setUsuario(response.data[0])
            });
    }

    useEffect(() => { getData() }, []);
    return (
        <>
        <Menu />
            <div className="container padding25">
                <h3>Añadir Caso : {usuario.nombre} {usuario.apellido1}</h3>
                {/* TRABAJADORA DEL HOGAR */}
                <div className="card mb-3">
                    <div className="card-header text-white bg-secondary" onClick={onClickTrabajador}>Trabajadora del Hogar <i className="fas fa-arrow-down"></i></div>
                    <div className={showTrabajador ? 'card-body' : 'hidden'} id="TrabajadoraDelHogar">
                        <TrabajoraHogarForm usuario={usuario.n_documentacion}/>
                    </div>
                </div>
                {/* DISCRIMINACIÓN */}
                <div className="card mb-3">
                    <div className="card-header text-white bg-secondary" onClick={onClickDiscriminacion}>Discriminación <i className="fas fa-arrow-down"></i></div>
                    <div className={showDiscriminacion ? 'card-body' : 'hidden'} id="Discriminacion">
                        <DiscriminacionForm usuario={usuario.n_documentacion}/>
                    </div>
                </div>
                {/* EXTRANJERÍA */}
                <div className="card mb-3">

                    <div className="card-header text-white bg-secondary" onClick={onClickExtranjeria}>Extranjería <i className="fas fa-arrow-down"></i></div>
                    <div className={showExtranjeria ? 'card-body' : 'hidden'} id="Extranjeria">
                        <ExtranjeriaForm usuario={usuario.n_documentacion}/>
                    </div>
                </div>
            </div>
        </>
    )
}