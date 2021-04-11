import React, { useState, useEffect } from 'react';
import history from '../../history';
import { PlusCircleFill } from 'react-bootstrap-icons';
import Menu from '../Navbar'

export default function VerCasosNoFinalizados() {
    const [AllCasos, setAllCasos] = useState([]);

    const getCasos = async () => {
        return fetch('http://localhost:8080/casos/allActive/{email}'.replace('{email}', localStorage.email))
            .then(response => response.json())
            .then(data => {
                setAllCasos(data);
            });
    }

    const goToVerCaso = (index) => {
        history.push('/VerCaso/{id}'.replace('{id}', index));
    }

    const goToAñadirIntervencion = (index) => {
        history.push('/AñadirIntervencion/{id}'.replace('{id}', index));
    }

    useEffect(() => { getCasos() }, []);

    return (
        <>
        <Menu />
            <div className="w-75 container padding25">
                <div className="table-responsive">
                    <table className="table no-wrap user-table mb-0" aria-label="tabla de usuarios">
                        <thead>
                            <tr>
                                <th scope="col" className="border-0 text-uppercase font-medium pl-4">#</th>
                                <th scope="col" className="border-0 text-uppercase font-medium">Usuario</th>
                                <th scope="col" className="border-0 text-uppercase font-medium">Finalizado</th>
                                <th scope="col" className="border-0 text-uppercase font-medium">Editar</th>
                                <th scope="col" className="border-0 text-uppercase font-medium">Última actualización</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                AllCasos.map((val, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="pl-4">{val.id}</td>
                                            <td>
                                                <h5 className="font-medium mb-o">{val.n_documentacion}</h5>
                                            </td>
                                            <td>
                                                <span className="text-muted" >{val.finalizado ? 'Si' : 'No'}</span><br />
                                            </td>
                                            <td>
                                                <span className="text-muted" >{val.updatedAt.substring(0,10)}</span><br />
                                            </td>
                                            <td>
                                                <button type='button' className='btn btn-outline-info btn-circle btn-lg btn-circle ml-2' onClick={() => goToAñadirIntervencion(val.id)}>
                                                    <PlusCircleFill />
                                                </button>
                                                <button type='button' className='btn btn-outline-info btn-circle btn-lg btn-circle ml-2' onClick={() => goToVerCaso(val.id)}>
                                                    <i className='fa fa-edit'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )

                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

