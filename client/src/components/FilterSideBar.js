import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Hidden, Drawer, Divider, CssBaseline, List, ListItem, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import VerUsuario from './pages/VerUsuario';
import PublicIcon from '@material-ui/icons/Public';
import WcIcon from '@material-ui/icons/Wc';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Button} from 'react-bootstrap';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
    },
}));

export default function ClippedDrawer() {
    const classes = useStyles();
    const [checkedNacionalidad, setCheckedNacionalidad] = useState([]);
    const [openSede, setOpenSede] = React.useState(false);
    const [openNacionalidad, setOpenNacionalidad] = React.useState(false);
    const [nacionalidad, setNacionalidad] = useState([]);
    const [sede, setSede] = useState([]);
    const [checkedSede, setCheckedSede] = useState([]);

    const handleToggleNacionalidad = (value) => () => {
        const currentIndex = checkedNacionalidad.indexOf(value);
        const newChecked = [...checkedNacionalidad];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedNacionalidad(newChecked);
    };

    const handleToggleSede = (value) => () => {
        const currentIndex = checkedSede.indexOf(value);
        const newChecked = [...checkedSede];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedSede(newChecked);
    };

    const getNacionalidad = async () => {
        return await fetch('http://localhost:8080/usuarios/nacionalidad/{email}'.replace('{email}', localStorage.email))
            .then(response => response.json())
            .then(data => {
               setNacionalidad(data)
                const newArray = [];
                data.map((val) => {newArray.push(val.nacionalidad);});
                setCheckedNacionalidad(newArray)
            });
    }

    const getSede = async () => {
        return await fetch('http://localhost:8080/sedes/all')
            .then(response => response.json())
            .then(data => {
                setSede(data)
                const newArray = [];
                data.map((val) => {newArray.push(val.sedeId);});
                setCheckedSede(newArray)
            });
    }

    const handleClick = () => {
        setOpenSede(!openSede);
    };

    const handleNacionalidad = () => {
        setOpenNacionalidad(!openNacionalidad);
    };


    useEffect(() => { getNacionalidad()}, []);
    useEffect(() => { getSede() }, []);    
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Ver Usuarios
          </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem button onClick={handleNacionalidad}>
                            <ListItemIcon>
                                <PublicIcon />
                            </ListItemIcon>
                            <ListItemText primary="Nacionalidad" />
                            {openNacionalidad ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openNacionalidad} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
                                    nacionalidad.map((val, i) => {
                                        return (
                                            <>
                                               
                                                <ListItem button className={classes.nested} key={"nac_" + i} onClick={handleToggleNacionalidad(val.nacionalidad ? val.nacionalidad : null)}>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            value={val.nacionalidad ? val.nacionalidad : ' '}
                                                            checked={checkedNacionalidad.indexOf(val.nacionalidad ? val.nacionalidad : null) !== -1}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-label': {i}} }
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText primary={val.nacionalidad ? val.nacionalidad : 'Sin Nacionalidaad'} />
                                                </ListItem>
                                            </>
                                        )
                                    })
                                }
                            </List>
                        </Collapse>
                        <ListItem button>
                            <ListItemIcon>
                                <WcIcon />
                            </ListItemIcon>
                            <ListItemText primary="Genero" />
                        </ListItem>
                        <ListItem button onClick={handleClick}>
                            <ListItemIcon>
                                <HomeWorkIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sede" />
                            {openSede ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openSede} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            {
                                    sede.map((val, i) => {
                                        return (
                                            <>
                                                <ListItem button className={classes.nested} key={"sede_" + i} onClick={handleToggleSede(val.sedeId)}>
                                                    <ListItemIcon key={i}>
                                                        <Checkbox
                                                            key={i}
                                                            value={val.sedeId}
                                                            edge="start"
                                                            checked={checkedSede.indexOf(val.sedeId) !== -1}
                                                            tabIndex={-1}
                                                            disableRipple
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText primary={val.nombre} />
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
            <main className={classes.content}>
                <Toolbar />
                <VerUsuario filters={{'nacionalidad' : checkedNacionalidad, 'sede': checkedSede}}/>
            </main>
        </div>
    );
}
