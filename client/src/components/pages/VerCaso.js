import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DiscriminacionForm from './DiscriminacionForm'
import TrabajadoraHogarForm from './TrabajadoraHogarForm'
import ExtranjeriaForm from './ExtranjeriaForm';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Menu from '../Navbar'
import auth from '../auth';
import history from '../../history';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function VerCaso({ casoId }) {
    useEffect(() => {
		if(!auth.isAuthenticated()) {
			history.push('/LogIn')
		}
	}, []);
    const classes = useStyles();

    const [caso, setCaso] = useState([]);
    const [casoType, setCasoType] = useState('');

    const MySwal = withReactContent(Swal)

    const getCaso = () => {
        axios.get('http://localhost:8080/caso/{id}'.replace('{id}', casoId))
            .then(response => {
                setCaso(response.data[0])
            });
    }

    const finalizarCaso = () => {
        MySwal.fire({
            title: 'Estas segura?',
            text: "Este caso sera finalizado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Si, finalizar!',
            cancelButtonText: 'No, cancelar!!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get('http://localhost:8080/caso/finalizar/{id}'.replace('{id}', casoId))
                    .then(res => {
                        MySwal.fire(
                            'Finalizado!',
                            'El caso ha sido finalizado.',
                            'success'
                        )
                        window.location.href = window.location.href
                    })
                    .catch(err => {
                        MySwal.fire(
                            'Ha habido algun error!',
                            'El caso no se ha finalizado.',
                            'warning'
                        )
                    })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                MySwal.fire(
                    'Cancelado',
                    'El caso no ha sido finalizado :)',
                    'error'
                )
            }
        })


    }

    const eliminarCaso = () => {
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
                axios.delete('http://localhost:8080/caso/delete/{id}'.replace('{id}', casoId))
                    .then(res => {
                        MySwal.fire(
                            'Eliminado!',
                            'El caso ha sido eliminado.',
                            'success'
                        )
                        window.history.back()
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

    const getCasoType = () => {
        axios.get('http://localhost:8080/casoType/{id}'.replace('{id}', casoId))
            .then(response => {
                console.log(response.data[0])
                setCasoType(response.data[0].tablename)
            });
    }

    const goToVerIntervencion = () => {
        history.push('/VerIntervencion/{caso}'.replace('{caso}', casoId));
    }

    const goToAñadirIntervencion = () => {
        history.push('/AñadirIntervencion/{caso}'.replace('{caso}', casoId));
    }


    useEffect(() => { getCaso() }, []);
    useEffect(() => { getCasoType() }, []);
    return (
        <>
            <Menu />
            <div className={classes.root} style={{ paddingTop: "10px" }}>
                <Container maxWidth="md" style={{ textAlignVertical: "center", textAlign: "center", }}>
                    <h4>Usuario: {caso.n_documentacion}</h4>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <p>Id caso: {caso.id}</p>
                        </Grid>
                        <Grid item xs={4}>
                            <p>Finalizado: {caso.finalizado ? 'Si' : 'No'}</p>
                        </Grid>
                        <Grid item xs={4}>
                            <p>Última actualización: {caso.updatedAt}</p>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <button type="button" name="finalizar" className="btn btn-primary" onClick={finalizarCaso}>Finalizar caso</button>
                        </Grid>
                        <Grid item xs={3}>
                            <button type="button" name="verIntervencion" className="btn btn-primary" onClick={goToVerIntervencion}>Ver intervenciones</button>
                        </Grid>
                        <Grid item xs={3}>
                            <button type="button" name="añadirIntervencion" className="btn btn-primary" onClick={goToAñadirIntervencion}>Añadir intervencion</button>
                        </Grid>
                        <Grid item xs={3}>
                            <button type="button" name="eliminarCaso" className="btn btn-danger" onClick={() => eliminarCaso()}>Eliminar Caso <i className='fa fa-trash'></i> </button>
                        </Grid>
                        
                    </Grid>
                    <hr />
                    <div>
                        {casoType === 'Discriminacion' ? <DiscriminacionForm usuario={caso.n_documentacion} caso={casoId} /> : null}
                        {casoType === 'TrabajadoraHogar' ? <TrabajadoraHogarForm usuario={caso.n_documentacion} caso={casoId} /> : null}
                        {casoType === 'Extranjeria' ? <ExtranjeriaForm usuario={caso.n_documentacion} caso={casoId} /> : null}
                    </div>
                </Container>

                <br />

            </div>
        </>
    )
}