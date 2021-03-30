import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar'
import { PlusCircleFill } from 'react-bootstrap-icons';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import ExportInformation from '../ExportInformation'
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import history from '../../history';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

export default function VerUsuario(filters) {
    const classes = useStyles();
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosDefault, setUsuariosDefault] = useState([]);
    const [allCasos, setAllCasos] = useState([]);
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

    const goToAñadirCaso = (index) => {
        let usr = usuarios[index]
        history.push('/AñadirCaso/{usuario}'.replace('{usuario}', usr.n_documentacion));
    }

    const goToEditarUsuario = (index) => {
        let usr = usuarios[index]
        history.push('/AñadirUsuario/{usuario}'.replace('{usuario}', usr.n_documentacion));
    }

    const goToAñadirUsuario = () => {
        history.push('/AñadirUsuario');
    }

    const goToVerCaso = (index) => {
        history.push('/VerCaso/{caso}'.replace('{caso}', index));
    }


    const handleClose = () => setOpenModal(false);

    const getData = async () => {
        return await fetch('http://localhost:8080/usuarios/all/{email}'.replace('{email}', localStorage.email))
            .then(response => response.json())
            .then(data => {
                const filteredUsers = data.filter(function (a) {
                    return !this[a.n_documentacion] && (this[a.n_documentacion] = true);
                }, Object.create(null));
                setUsuarios(filteredUsers)
                setUsuariosDefault(filteredUsers)
                setAllCasos(data);
            });
    }

    const getCasos = async () => {
        return await fetch('http://localhost:8080/casos/all/{email}'.replace('{email}', localStorage.email))
            .then(response => response.json())
            .then(data => {
                setAllCasos(data);
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
    useEffect(() => { getCasos() }, []);

    return (
        <>
            <Container >
                <Row className="justify-content-md-center">

                    <Col md={4}><SearchBar
                        input={input}
                        onChange={updateInput} />
                    </Col>

                    {/* <Col md={{ span: 4, offset: 4 }}><ExportInformation data={usuarios}/></Col> */}

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
                                                        <tr key={i}>
                                                            <td className="pl-4" onClick={() => thisReplaceModalItem(i)}>{i}</td>
                                                            <td onClick={() => thisReplaceModalItem(i)}>
                                                                <h5 className="font-medium mb-o">{val.nombre} {val.apellido1} {val.apellido2}</h5>
                                                                <span className="text-muted">{val.n_documentacion}</span>
                                                            </td>
                                                            <td onClick={() => thisReplaceModalItem(i)}>
                                                                <span className="text-muted" onClick={() => sendEmail(val.email)}><i className="fa fa-envelope" aria-hidden="true"></i>{val.email ? val.email : '-----'}</span><br />
                                                                <span className="text-muted" onClick={() => sendWhatsapp(val.telefono)}><i className="fa fa-whatsapp" aria-hidden="true"></i>{val.telefono ? val.telefono : '----'}</span>
                                                            </td>
                                                            <td>
                                                                <button type='button' className='btn btn-outline-info btn-circle btn-lg btn-circle ml-2' onClick={() => goToAñadirCaso(i)}>
                                                                    <PlusCircleFill />
                                                                </button>
                                                                <button type='button' className='btn btn-outline-info btn-circle btn-lg btn-circle ml-2' onClick={() => goToEditarUsuario(i)}>
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
                    <Container>
                        <Row>
                            <Col md={12}>
                                <p>Nombre completo: {usuario.nombre} {usuario.apellido1} {usuario.apellido2}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <p>Email: {usuario.email}</p>
                            </Col>
                            <Col md={6}>
                                <p>Telefono: {usuario.telefono}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <h5>Casos:</h5>
                                {allCasos.map((val, index) => {
                                    if (val.n_documentacion === usuario.n_documentacion) {
                                        return <p>Id: {val.id} Finalizado: {val.finalizado ? 'Si' : 'No'}
                                            <IconButton onClick={() => goToVerCaso(val.id)} className={classes.margin} size="small">
                                                <ArrowForwardIcon fontSize="inherit" />
                                            </IconButton>
                                        </p>
                                    }
                                })
                                }


                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClose}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

