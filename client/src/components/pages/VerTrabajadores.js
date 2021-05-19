import React, { useState, useEffect } from 'react';
import Menu from '../Navbar'
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { authenticationService } from '../../_services';
import history from '../../history';

export default function VerTrabajadores() {
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
    const [AllTrabajadores, setAllTrabajadores] = useState([]);

    const MySwal = withReactContent(Swal)

    const getTrabajadores = async () => {
        return fetch('http://localhost:8080/trabajadores/all')
            .then(response => response.json())
            .then(data => {
                setAllTrabajadores(data);
            }).catch(error => {
                console.log("Ha habido un error obteniendo los datos")
            })
    }

    const goToEditTrabajador = (email) => {
        history.push('/ActualizarTrabajador/{id}'.replace('{id}', email));
    }

    const deleteTrabajador = (email) => {
        MySwal.fire({
            title: 'Estas segura?',
            text: "Este trabajador será eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8080/trabajador/delete/{id}'.replace('{id}', email))
                    .then(res => {
                        MySwal.fire(
                            'Eliminado!',
                            'El trabajador ha sido eliminado.',
                            'success'
                        )
                        window.location.href = window.location.href
                    })
                    .catch(err => {
                        MySwal.fire(
                            'Ha habido algun error!',
                            'El trabajador no se ha eliminado.',
                            'warning'
                        )
                    })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                MySwal.fire(
                    'Cancelado',
                    'El trabajador no se ha eliminado :)',
                    'error'
                )
            }
        })
    }

    useEffect(() => { getTrabajadores() }, []);

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
                                <th scope="col" className="border-0 text-uppercase font-medium">Admin</th>
                                <th scope="col" className="border-0 text-uppercase font-medium">Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                AllTrabajadores.map((val, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="pl-4">{i}</td>
                                            <td>
                                                <span className="text-muted" >{val.nombre}</span><br />
                                            </td>
                                            <td>
                                                <span className="text-muted" >{val.email}</span><br />
                                            </td>
                                            <td>
                                                <span className="text-muted" >{val.createdAt.substring(0, 10)}</span><br />
                                            </td>
                                            <td>
                                                <span className="text-muted" >{val.admin ? 'Sí' : 'No'}</span><br />
                                            </td>
                                            <td>
                                                <button type='button'  onClick={() => goToEditTrabajador(val.email)} className='btn btn-outline-info btn-circle btn-lg btn-circle ml-2'>
                                                    <i className='fa fa-edit'></i>
                                                </button>
                                                <button type='button' onClick={() => deleteTrabajador(val.email)} className='btn btn-outline-danger btn-circle btn-lg btn-circle ml-2'>
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

