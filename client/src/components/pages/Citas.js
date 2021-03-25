import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from 'axios';
import "react-big-calendar/lib/css/react-big-calendar.css";
import DateObject from "react-date-object";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Container, Row, Col } from 'react-bootstrap';
import { AppBar, Toolbar, Typography, Drawer, CssBaseline, List, ListItem, ListItemIcon } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 300;

const useStylesDrawer = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        paddingTop: '100px'
    },
}));


const sweetAlertStyles = { display: "block", marginTop: "-100px" };
require('moment/locale/es.js')
const MySwal = withReactContent(Swal)

export default function Citas() {
    const classesDrawer = useStylesDrawer();
    const [citas, setCitas] = useState([]);
    const [filteredCitas, setFilteredCitas] = useState([]);
    const [usuarios, setUsuarios] = useState([])
    const [trabajadores, setTrabajadores] = useState([])
    const [usuariosDefault, setUsuariosDefault] = useState([])
    const localizer = momentLocalizer(moment);
    const [alert, setAlert] = useState(null);
    const [checkedTrabajador, setCheckedTrabajador] = useState([localStorage.email]);

    const updateCitas = async () => {
        const filtered = citas.filter(cita => {
            return (checkedTrabajador.indexOf(cita.trabajadorId) !== -1);
        })
        setFilteredCitas(filtered);
    }

    const getCitas = async () => {
        return await fetch('http://localhost:8080/citas/all/')
            .then(response => response.json())
            .then(data => {
                data[0].map((val => {
                    val.start = new Date(val.start)
                    val.end = new Date(val.end)
                }))
                const filtered = data[0].map(item => item.trabajadorId).filter((value, index, self) => self.indexOf(value) === index)
                setCitas(data[0])
                setTrabajadores(filtered)
                const filtered2 = data[0].filter(cita => {
                    return (checkedTrabajador.indexOf(cita.trabajadorId) !== -1);
                })
                setFilteredCitas(filtered2);
            });
    }

    const useStyles = makeStyles({
        option: {
            fontSize: 15,
            '& > span': {
                marginRight: 10,
                fontSize: 18,
            },
        },

    });
    const classes = useStyles();
    const getUsers = async () => {
        return fetch('http://localhost:8080/usuarios/all/{email}'.replace('{email}', localStorage.email))
            .then(response => response.json())
            .then(data => {
                setUsuarios(data);
                setUsuariosDefault(data);
            });
    }

    const handleInputChange = async (input) => {
        const filtered = usuariosDefault.filter(user => {
            const telefono = '' + (user.telefono ? user.telefono : ' ');
            return ((user.nombre.toLowerCase().includes(input.toLowerCase())) || (user.n_documentacion.toLowerCase().includes(input.toLowerCase())) || (telefono.includes(input.toLowerCase())));
        })
        setUsuarios(filtered);
    }
    
    const selectEvent = (event) => {
        MySwal.fire({
            title: <p>{event.title}</p>,
            confirmButtonText: 'Eliminar',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonText: 'Cerrar',
            focusConfirm: false,
            reverseButtons: true,
            html:
                <Container>
                    <Row>
                        <Col md={6}>
                            <h5>Inicio:</h5>
                            <p>{event.start.toLocaleString()}</p>
                        </Col>
                        <Col md={6}>
                            <h5>Fin:</h5>
                            <p>{event.end.toLocaleString()}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h5>Usuario:</h5>
                            <p>{event.n_documentacion}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <h5>Notas:</h5>
                            <p>{event.notas}</p>
                        </Col>
                    </Row>
                </Container>
        }).then((result) => {
            if (result.isConfirmed) {
                MySwal.fire({
                    title: 'Estas segura?',
                    text: "No podras recuperar esta cita!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminar!',
                    cancelButtonText: 'No, cancelar!!',
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                    axios.delete('http://localhost:8080/cita/delete/{id}'.replace('{id}', event.id)
                    ).then(res => {
                        MySwal.fire(
                            'Eliminado!',
                            'La cita se ha eliminado.',
                            'success'
                          )
                          window.location.href = window.location.href
                    })
                        .catch(err => {
                            MySwal.fire(
                                'Ha habido algun error!',
                                'La cita  no se ha eliminado.',
                                'warning'
                              )
                        })
                      
                    } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                      MySwal.fire(
                        'Cancelado',
                        'La cita no se ha eliminado:)',
                        'error'
                      )
                    }
                  })
            }
          })
    }
    const selectSlot = (slotInfo) => {
        let slotStart = new DateObject(slotInfo.start)
        let slotEnd = new DateObject(slotInfo.end)
        let date = slotStart.format("YYYY-MM-DD")
        let startTime = slotStart.format("HH:mm")
        let endTime = slotEnd.format("HH:mm")

        const { value: formValues } = MySwal.fire({
            title: <p>Nueva cita</p>,
            confirmButtonText: 'Añadir cita',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            focusConfirm: false,
            reverseButtons: true,
            html:
                <form>
                    <hr />
                    <input
                        type='text'
                        id="titulo"
                        className="form-control"
                        placeholder={'Titulo'}
                    />
                    <br />
                    <input
                        type={'date'}
                        id="date"
                        className="form-control"
                        defaultValue={date}
                    />
                    <br />
                    <input
                        type={'time'}
                        id="start"
                        className="form-control"
                        defaultValue={startTime}
                    />
                    <br />
                    <input
                        type={'time'}
                        id="end"
                        className="form-control"
                        defaultValue={endTime}
                    />
                    <br />
                    <input
                        type={'text'}
                        id="notas"
                        className="form-control"
                        placeholder={'Notas'}
                    />
                    <br />
                    <Autocomplete
                        id="usuario"
                        options={usuarios}
                        style={{ width: 300, position: 'absolute' }}
                        classes={{
                            option: classes.option,
                        }}
                        autoHighlight
                        filterOptions={x => x}
                        getOptionLabel={(option) => option.n_documentacion}
                        renderOption={(option) => (
                            <React.Fragment>
                                <span>{option.nombre}</span>
                                {option.nombre} {option.apellido1} +{option.telefono}
                            </React.Fragment>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Escoge un usuario"
                                variant="outlined"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />
                    <br />
                    <br />
                </form>,
            preConfirm: () => {
                let startdate = new DateObject(document.getElementById('date').value + document.getElementById('start').value)
                let enddate = new DateObject(document.getElementById('date').value + document.getElementById('end').value)
                let formData = {
                    nombre: document.getElementById('titulo').value,
                    fechaInicio: startdate.toDate(),
                    fechaFin: enddate.toDate(),
                    notas: document.getElementById('notas').value,
                    usuario: document.getElementById('usuario').value,
                    trabajador: localStorage.email

                }

                axios.post('http://localhost:8080/cita/create', { formData }).then(res => {
                    console.log(res);
                });
                window.location.href = window.location.href
            }

        })
    }

    const handleToggle = (value) => () => {
        const currentIndex = checkedTrabajador.indexOf(value);
        const newChecked = [...checkedTrabajador];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedTrabajador(newChecked);
        updateCitas();
    };

    useEffect(() => { getUsers() }, []);
    useEffect(() => { getCitas() }, [citas]);
    useEffect(() => { updateCitas()}, [checkedTrabajador]);

    return (
        <>
            <div className={classesDrawer.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classesDrawer.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Calendario
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classesDrawer.drawer}
                    variant="permanent"
                    classesDrawer={{
                        paper: classesDrawer.drawerPaper,
                    }}
                >
                    <Toolbar />
                    <div className={classesDrawer.drawerContainer}>
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Trabajador" />
                        </ListItem>
                        <Collapse in={true} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
                                    trabajadores.map((val, i) => {
                                        return (
                                            <>
                                                <ListItem button className={classes.nested} key={i} onClick={handleToggle(val)}>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            value={val}
                                                            checked={checkedTrabajador.indexOf(val) !== -1}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-label': {i}} }
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText primary={val} />
                                                </ListItem>
                                            </>
                                        )
                                    })
                                }
                            </List>
                        </Collapse>
                    </List>
                    </div>
                </Drawer>
                <main className={classesDrawer.content}>
                    {alert}
                    <Calendar
                        selectable={true}
                        localizer={localizer}
                        events={filteredCitas}
                        defaultDate={new Date()}
                        defaultView="month"
                        style={{ height: "100vh" }}
                        messages={{
                            next: "Sig.",
                            previous: "Ant.",
                            today: "Hoy",
                            month: "Mes",
                            week: "Semana",
                            day: "Día"
                        }}
                        onSelectSlot={(slotInfo) => selectSlot(slotInfo)}
                        popup={true}
                        onSelectEvent={(event) => selectEvent(event)}
                        eventPropGetter={event => ({
                            style: {
                                backgroundColor: event.color,
                            },
                        })}
                    />
                </main>
            </div>
        </>
    )
}