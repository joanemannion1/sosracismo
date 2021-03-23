import React, { useState, useEffect } from 'react';
import UserList from '../UserList';
import SearchBar from '../SearchBar'
import UserModal from '../Modal';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { Button, Modal, Container, Row, Col, Form } from 'react-bootstrap';
import ExportInformation from '../ExportInformation'
export default function VerUsuario(filters) {
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosDefault, setUsuariosDefault] = useState([]);
    const [input, setInput] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [requiredItem, setRequiredItem] = useState(0);
    const [usuario, setUsuario] = useState({ 'nombre': '', 'email': '' });
    const sendWhatsapp = (number) => {
        const href = "https://wa.me/34" + number;
        const newWindow = window.open(href, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const sendEmail = (email) => {
        const href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + email;
        const newWindow = window.open(href, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const thisReplaceModalItem = (index) => {
        setRequiredItem(index);
        setOpenModal(true);
        setUsuario(usuarios[index]);
    }

    const handleClose = () => setOpenModal(false);

    const getData = async () => {
        return await fetch('http://localhost:8080/usuarios/all/{email}'.replace('{email}', localStorage.email))
            .then(response => response.json())
            .then(data => {
                setUsuarios(data)
                setUsuariosDefault(data)
            });
    }

    const updateInput = async (input) => {
        const filtered = usuariosDefault.filter(user => {
            const telefono = '' + (user.telefono ? user.telefono : ' ');
            return (((user.nombre.toLowerCase().includes(input.toLowerCase())) || (user.n_documentacion.toLowerCase().includes(input.toLowerCase())) || (telefono.includes(input.toLowerCase()))) && (filters.filters.nacionalidad.indexOf(user.nacionalidad) !== -1) && (filters.filters.sede.indexOf(user.sedeId) !== -1));
        })
        setInput(input);
        setUsuarios(filtered);
    }

    
    useEffect(() => { updateInput(input) }, [filters]);

    useEffect(() => { getData() }, []);

    return (
        <>
            <Container >
                <Row className="justify-content-md-center">

                    <Col md={4}><SearchBar
                        input={input}
                        onChange={updateInput} />
                    </Col>

                    <Col md={{ span: 4, offset: 4 }}><ExportInformation data={usuarios}/></Col>

                </Row>

                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-uppercase mb-0">Usuarios</h5>
                            </div>

                            <div className="table-responsive">
                                <table className="table no-wrap user-table mb-0" aria-label="tabla de usuarios">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="border-0 text-uppercase font-medium pl-4">#</th>
                                            <th scope="col" className="border-0 text-uppercase font-medium">Nombre</th>
                                            <th scope="col" className="border-0 text-uppercase font-medium">Email</th>
                                            <th scope="col" className="border-0 text-uppercase font-medium">Editar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuarios.map((val, i) => {
                                            if (val) {
                                                return (
                                                    <>
                                                        <tr key={i} onClick={() => thisReplaceModalItem(i)}>
                                                            <td className="pl-4">{i}</td>
                                                            <td>
                                                                <h5 className="font-medium mb-o">{val.nombre} {val.apellido1} {val.apellido2}</h5>
                                                                <span className="text-muted">{val.n_documentacion}</span>
                                                            </td>
                                                            <td>
                                                                <span className="text-muted" onClick={() => sendEmail(val.email)}><i className="fa fa-envelope" aria-hidden="true"></i>{val.email ? val.email : '-----'}</span><br />
                                                                <span className="text-muted" onClick={() => sendWhatsapp(val.telefono)}><i className="fa fa-whatsapp" aria-hidden="true"></i>{val.telefono ? val.telefono : '----'}</span>
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
                                                    </>

                                                )
                                            }
                                            return null
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Modal show={openModal} onHide={handleClose} dialogClassName='custom-dialog'>
                <Modal.Header closeButton={true}>
                    <Modal.Title>{usuario.nombre}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Email: </p>
                    <p>{usuario.email}</p>
                    <p>Telefono: </p>
                    <p>{usuario.telefono}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClose}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

