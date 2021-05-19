import React, { useState, useEffect } from 'react';
import Menu from '../Navbar'
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { authenticationService } from '../../_services';
import history from '../../history';

export default function VerSedes() {
    let currentUser = ''
    if (authenticationService.currentUserValue) {
        currentUser = authenticationService.currentUserValue.token
        axios.get("http://localhost:8080/authenticate/trabajador", {
            headers: { 'x-access-token': currentUser },
        }).then((response) => {
            if (response.data.admin !== 1) {
                history.push('/')
            }
        })
    } else {
        history.push('/LogIn')
    }
    const [AllSedes, setAllSedes] = useState([]);

    const MySwal = withReactContent(Swal)

    const getSedes = async () => {
        return fetch('http://localhost:8080/sedes/all')
            .then(response => response.json())
            .then(data => {
                setAllSedes(data);
            }).catch(error => {
                console.log("Ha habido un error obteniendo los datos")
            })
    }

    const goToEditarSede = (index) => {
        history.push('/ActualizarSede/{sede}'.replace('{sede}', index));
    }

    const deleteSede = (index) => {
        MySwal.fire({
            title: 'Estas segura?',
            text: "Esta sede será eliminada!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8080/sede/delete/{id}'.replace('{id}', index))
                    .then(res => {
                        MySwal.fire(
                            'Eliminado!',
                            'La sede ha sido eliminada.',
                            'success'
                        )
                        window.location.href = window.location.href
                    })
                    .catch(err => {
                        MySwal.fire(
                            'Ha habido algun error!',
                            'La sede no se ha eliminado.',
                            'warning'
                        )
                    })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                MySwal.fire(
                    'Cancelado',
                    'La sede no se ha eliminado :)',
                    'error'
                )
            }
        })
    }

    useEffect(() => { getSedes() }, []);

    return (
        <>

            <Menu />
            <div className="w-75 container padding25">
                <div className="table-responsive">
                    <table className="table no-wrap user-table mb-0" aria-label="tabla de usuarios">
                        <thead>
                            <tr>
                                <th scope="col" className="border-0 text-uppercase font-medium pl-4">#</th>
                                <th scope="col" className="border-0 text-uppercase font-medium">Nombre</th>
                                <th scope="col" className="border-0 text-uppercase font-medium">Localidad</th>
                                <th scope="col" className="border-0 text-uppercase font-medium">Fecha</th>
                                <th scope="col" className="border-0 text-uppercase font-medium">Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                AllSedes.map((val, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="pl-4">{val.sedeId}</td>
                                            <td>
                                                <span className="text-muted" >{val.nombre}</span><br />
                                            </td>
                                            <td>
                                                <span className="text-muted" >{val.localidad}</span><br />
                                            </td>
                                            <td>
                                                <span className="text-muted" >{val.createdAt.substring(0, 10)}</span><br />
                                            </td>
                                            <td>
                                                <button type='button'  onClick={() => goToEditarSede(val.sedeId)} className='btn btn-outline-info btn-circle btn-lg btn-circle ml-2'>
                                                    <i className='fa fa-edit'></i>
                                                </button>
                                                <button type='button' onClick={() => deleteSede(val.sedeId)} className='btn btn-outline-danger btn-circle btn-lg btn-circle ml-2'>
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

