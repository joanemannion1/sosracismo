import React, { useState, useEffect } from 'react';
import { Download, PlusCircleFill } from 'react-bootstrap-icons';
import Menu from '../Navbar'
import axios from 'axios';
import GetAppIcon from '@material-ui/icons/GetApp';
import download from 'downloadjs'
import IconButton from '@material-ui/core/IconButton';
require("downloadjs")

export default function VerIntervenciones({ casoId }) {
    const [AllIntervenciones, setAllIntervenciones] = useState([]);

    const getCasos = async () => {
        return fetch('http://localhost:8080/intervenciones/caso/{casoId}'.replace('{casoId}', casoId))
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setAllIntervenciones(data);
            });
    }

    const downloadFile = async (id, filename, type) => {
        axios.get('http://localhost:8080/file/download/{id}'.replace('{id}', id),{
            responseType: 'blob'
          }).then(res => {
            console.log(res);
            return download(res.data, filename, type)
        }).catch((error) => {
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
                                <th scope="col" className="border-0 text-uppercase font-medium">Nombre</th>
                                <th scope="col" className="border-0 text-uppercase font-medium">Descripcion</th>
                                <th scope="col" className="border-0 text-uppercase font-medium">Fecha</th>
                                <th scope="col" className="border-0 text-uppercase font-medium">Documento</th>
                                <th scope="col" className="border-0 text-uppercase font-medium">Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                AllIntervenciones.map((val, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="pl-4">{val.id}</td>
                                            <td>
                                                <span className="text-muted" >{val.nombre}</span><br />
                                            </td>
                                            <td>
                                                <span className="text-muted" >{val.descripcion}</span><br />
                                            </td>
                                            <td>
                                                <span className="text-muted" >{val.createdAt.substring(0, 10)}</span><br />
                                            </td>
                                            <td>
                                                { val.docNombre ? (<IconButton onClick={() => downloadFile(val.docId, val.docNombre, val.type)} size="small">
                                                    <GetAppIcon fontSize="inherit" />
                                                </IconButton>) : null }
                                                <span className="text-muted" onClick={() => downloadFile(val.docId, val.docNombre, val.type)} >{val.docNombre}</span><br />
                                            </td>
                                            <td>
                                                <button type='button' className='btn btn-outline-info btn-circle btn-lg btn-circle ml-2'>
                                                    <PlusCircleFill />
                                                </button>
                                                <button type='button' className='btn btn-outline-info btn-circle btn-lg btn-circle ml-2'>
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
