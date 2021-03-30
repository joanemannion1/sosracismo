import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'

export default function VerCaso({casoId}) {
    const [caso, setCaso] = useState([]);

    const getCaso = () => {
        axios.get('http://localhost:8080/caso/{id}'.replace('{id}', casoId))
            .then(response => {
                setCaso(response.data[0])
            });
    }

    const getCasoEspecifico = () => {
        axios.get('http://localhost:8080/casoEspecifico/{id}'.replace('{id}', casoId))
            .then(response => {
                console.log(response.data[0])
            });
    }

    useEffect(() => { getCaso() }, []);
    useEffect(() => { getCasoEspecifico() }, []);
    return (
        <>
          <p>Id: {caso.id}</p>
          <p>Finalizado: {caso.finalizado ? "Si" : "No"}</p>
          <p>Usuario: {caso.n_documentacion}</p>
        </>
    )
}