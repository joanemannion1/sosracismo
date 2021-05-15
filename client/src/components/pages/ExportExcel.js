import React, { useState, useEffect } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Menu from '../Navbar'
import { nacionalidadList } from '../NacionalidadList'
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { authenticationService } from '../../_services';
import history from '../../history';

export default function ExportExcel() {
    let currentUser = ''
    if (authenticationService.currentUserValue) { 
        currentUser = authenticationService.currentUserValue
    }else {
        history.push('/LogIn')
    }
    
    const [nacionalidad, setNacionalidad] = useState([]);
    const [necesidad, setNecesidad] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const location = useLocation();

    const filterDate = (e) => {
        if (e.target.name === 'fechaInicio') {
            console.log(e.target.value)
            setStartDate(e.target.value)
        } else if (e.target.name === 'fechaFin') {
            setEndDate(e.target.value)
        }

    }

    useEffect(() => { 
        const getNecesidad = async () => {
            axios.post('http://localhost:8080/necesidadUsuario/', { startDate: startDate, endDate: endDate })
                .then(response => {
                    setNecesidad(response.data);
                }).catch(error => {
                    console.log("Ha habido un error obteniendo los datos")
                })
        }
    
     }, []);

    useEffect(() => { const getNacionalidad = async () => {
        setStartDate(location.state.startDate)
        setEndDate(location.state.endDate)
        return fetch('http://localhost:8080/usuarios/count/nacionalidad'.replace('{email}', currentUser.email))
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setNacionalidad(data);
            }).catch(error => {
                console.log("Ha habido un error obteniendo los datos")
            })
    } }, [startDate, endDate]);

    return (
        <div>
            <Menu />
            <Container style={{ textAlignVertical: "center", textAlign: "center"}}>
                <br />
                <Row className="justify-content-md-center">

                    <Col md={4}>
                        <h6>Desde: </h6>
                        <input type="date" className="form-control" value={startDate} name="fechaInicio" onChange={(e) => filterDate(e)} />

                    </Col>
                    <Col md={4}>
                        <h6>Hasta: </h6>
                        <input type="date" className="form-control" value={endDate} name="fechaFin" onChange={(e) => filterDate(e)} />
                    </Col>
                </Row>

                <br/>

                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    className="btn btn-primary"
                    buttonText="Descargar xls" />
                <br/>
                <table id="table-to-xls" >
                    <table className="table">
                        <tr>
                            <th>Herrialdea / Pais</th>
                            <th>Mujeres</th>
                            <th>Hombres</th>
                        </tr>
                        {

                            nacionalidad.map(n => {
                                return (
                                    <tr>
                                        <td>{n.nacionalidad ? nacionalidadList.find(x => x.value === n.nacionalidad).label : ' '}</td>
                                        <td>{n.mujer ? n.mujer : ''}</td>
                                        <td>{n.hombre ? n.hombre : ''}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>

                    <br />

                    <table className="table">
                        <tr>
                            <th>Gaiak / Materias</th>
                            <th>Mujeres</th>
                            <th>Hombres</th>
                        </tr>
                        {
                            necesidad.map(n => {
                                return (
                                    <tr>
                                        <td>{n.necesidad}</td>
                                        <td>{n.mujer ? n.mujer : ''}</td>
                                        <td>{n.hombre ? n.hombre : ''}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </table>
            </Container>

        </div>
    )
}