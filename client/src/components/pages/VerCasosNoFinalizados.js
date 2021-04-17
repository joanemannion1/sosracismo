import React, { useState, useEffect } from 'react';
import history from '../../history';
import { PlusCircleFill } from 'react-bootstrap-icons';
import Menu from '../Navbar'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';

export default function VerCasosNoFinalizados() {
    const [AllCasos, setAllCasos] = useState([]);

    const MySwal = withReactContent(Swal)

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

    const eliminarCaso = (id) => {
        MySwal.fire({
            title: 'Estas segura?',
            text: "Este caso será eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8080/caso/delete/{id}'.replace('{id}', id))
                    .then(res => {
                        MySwal.fire(
                            'Eliminado!',
                            'El caso ha sido eliminado.',
                            'success'
                        )
                        window.location.href = window.location.href
                    })
                    .catch(err => {
                        MySwal.fire(
                            'Ha habido algun error!',
                            'El caso no se ha eliminado.',
                            'warning'
                        )
                    })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                MySwal.fire(
                    'Cancelado',
                    'El caso no se ha eliminado :)',
                    'error'
                )
            }
        })
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
                                                <button type='button' onClick={() => eliminarCaso(val.id)} className='btn btn-outline-danger btn-circle btn-lg btn-circle ml-2'>
                                                    <i className='fa fa-trash'></i>
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

