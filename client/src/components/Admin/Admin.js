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
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import { Skeleton } from "@material-ui/lab";
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';

const Admin = () => {
    const [user, setUser] = useState([]);
    let history = useHistory();

    useEffect(() => {
        var data = JSON.parse(localStorage.getItem('profile'));
        console.log(data.result);
        api.getUnverifiedCompanies()
            .then(data => {
                setUser(data.data);
                console.log(data.data);
            })
            .catch(err => console.log(err))
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
        history.push('/');
    }

    function approveClick(row, e) {
        e.preventDefault();
        api.verifyCompany(row)
            .then(data => {
                console.log(data);
                console.log("its working");
                api.getUnverifiedCompanies()
                    .then(data => {
                        setUser(data.data);
                        console.log(data.data);
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    return (
        <Container maxWidth="lg">
            <Button variant="outlined" style={{ width: 120, marginBottom: 12 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundcolor="gray">Back</Button>
            {user.map((row, index) =>
                <Box mb={1} key={index}>
                    <Card className={classes.root} variant="outlined">
                        <CardHeader
                            title={
                                <Typography variant="overline" component="div">
                                    <Box fontWeight={520} fontSize="h6.fontSize">
                                        {row.name}
                                    </Box>
                                </Typography>
                            }
                            action={
                                <Button variant="contained" color="secondary" className={classes.button} startIcon={<VerifiedUserOutlinedIcon />} onClick={(e) => approveClick(row, e)}>
                                    Approve
                                </Button>
                            }
                        />
                        <CardContent>
                            <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
                                <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
                                    <Typography variant="overline" component="div">
                                        <Box fontWeight={500} fontSize="body1.fontSize">
                                            Address : {row.address}
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={3} md={3} className={classes.gcontainer}>
                                    <Typography variant="overline" component="div">
                                        <Box fontWeight={500} fontSize="body1.fontSize">
                                            City : {row.city}
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={3} md={3} className={classes.gcontainer}>
                                    <Typography variant="overline" component="div">
                                        <Box fontWeight={500} fontSize="body1.fontSize">
                                            State : {row.state}
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
                                    <Typography variant="overline" component="div">
                                        <Box fontWeight={500} fontSize="body1.fontSize">
                                            Gst : {row.gst}
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
                                    <Typography variant="overline" component="div">
                                        <Box fontWeight={500} fontSize="body1.fontSize">
                                            Contact : {row.contact}
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                                    <Typography variant="body2" component="div">
                                        <Box fontWeight={500} fontSize="body1.fontSize">
                                            {row.description}
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                                    <Typography variant="subtitle2" component="div" align="right" style={{ marginTop: 15 }}>
                                        <Box fontWeight={500} fontSize="subtitle2.fontSize">
                                            Created at {new Date(row.date).toUTCString()}
                                        </Box>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Container>
    );
};

export default Admin;
