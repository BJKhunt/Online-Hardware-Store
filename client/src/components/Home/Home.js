import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import * as api from '../../api/index.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button, Grid, Typography, Container, TextField } from '@material-ui/core';
//import Datatable from '../Datatable/Datatable.js';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import DeleteIcon from '@material-ui/icons/Delete';
import { Skeleton } from "@material-ui/lab";
import Admin from '../Admin/Admin';

const Home = () => {
    const [isc, setIsc] = useState(false);
    const [isa, setIsa] = useState(false);
    let history = useHistory();

    useEffect(() => {
        var data = JSON.parse(localStorage.getItem('profile'));
        console.log(data.result);
        setIsc(data.result.isCompany);
        // eslint-disable-next-line eqeqeq
        if (data.result.email == 'admin@gmail.com') {
            setIsa(true);
        }
    }, [])

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            backgroundColor: "#f2f2f2"
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 8,
        },
        button: {
            marginRight: 3,
            align: `right`,
        },
        avatar: {
            backgroundColor: 'red',
        },
        gcontainer: {
            paddingLeft: "50px",
            paddingRight: "20px"
        }
    });

    const classes = useStyles();

    function handleClick(e) {
        e.preventDefault();
        history.push('/seller');
    }

    return (
        <Container maxWidth="lg">
            <h1>Welcome</h1>
            {isa ?
                <Admin />
                :
                <Grid container spacing={4} justify="center" alignItems="center">
                    <Grid item xs>
                        <Button variant="contained" onClick={handleClick} type="submit" color="secondary" size="small">{!isc ? <p>Want to Become a seller ??</p> : <p>go to Your Products</p>}</Button>
                    </Grid>
                </Grid>
            }
        </Container>
    );
};

export default Home;
