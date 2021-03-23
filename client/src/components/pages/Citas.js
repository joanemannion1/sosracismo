import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DateObject from "react-date-object";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useForm } from 'react-hook-form';

const sweetAlertStyles = { display: "block", marginTop: "-100px" };
require('moment/locale/es.js')
const MySwal = withReactContent(Swal)

export default function Citas() {
    const [citas, setCitas] = useState([]);
    const [usuarios, setUsuarios] = useState([])
    const [usuariosDefault, setUsuariosDefault] = useState([])
    const localizer = momentLocalizer(moment);
    const [alert, setAlert] = useState(null);
    const onSubmit = (data) => console.log(JSON.stringify(data));
    
    const { register, handleSubmit } = useForm();

    // const getData = async () => {
    //     return await fetch('http://localhost:8080/citas/all/')
    //         .then(response => response.json())
    //         .then(data => {
    //             setCitas(data)
    //         });
    // }

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
    useEffect(() => { getUsers() }, []);

    const successAlert = (slotInfo) => {
        let slotStart = new DateObject(slotInfo.start)
        let slotEnd = new DateObject(slotInfo.end)
        let date = slotStart.format("YYYY-MM-DD")
        let startTime = slotStart.format("HH:mm")
        let endTime = slotEnd.format("HH:mm")

        MySwal.fire({
            title: <p>Nueva cita</p>,
            confirmButtonText: 'Añadir cita',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            focusConfirm: false,
            reverseButtons: true,
            html : 
            <form>
                <hr />
                <input
                    type='text'
                    name="titulo"
                    ref={register}
                    className="form-control"
                    placeholder={'Titulo'}
                />
                <br />
                <input
                    type={'date'}
                    name="date"
                    ref={register}
                    className="form-control"
                    defaultValue={date}
                />
                <br />
                <input
                    type={'time'}
                    name="start"
                    ref={register}
                    className="form-control"
                    defaultValue={startTime}
                />
                <br />
                <input
                    type={'time'}
                    name="end"
                    ref={register}
                    className="form-control"
                    defaultValue={endTime}
                />
                <br />
                <input
                    type={'text'}
                    name="notas"
                    ref={register}
                    className="form-control"
                    placeholder={'Notas'}
                />
                <br />
                <Autocomplete
                    id="country-states-demo"
                    options={usuarios}
                    style={{ width: 300, position: 'absolute' }}
                    classes={{
                        option: classes.option,
                    }}
                    autoHighlight
                    filterOptions={x => x}
                    getOptionLabel={(option) => option.nombre}
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
                <br/>
                <br/>
            </form>,
            preConfirm: () => {
                {handleSubmit(onSubmit)}
                // axios.post('http://localhost:8080/usuario/create', { data }).then(res => {
                //     console.log(res);
                //     setOpen(true);
                // });
            }
        
        })
}

return (
    <>
        {alert}
        <Calendar
            selectable={true}
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={citas}
            style={{ height: "100vh" }}
            messages={{
                next: "Sig.",
                previous: "Ant.",
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día"
            }}
            onSelectSlot={(slotInfo) => successAlert(slotInfo)}
            popup={true}
        />

    </>
)
}