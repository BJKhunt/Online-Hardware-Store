import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import * as api from '../../api/index.js';
import { Button, Typography, Container, Grid } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import DeleteIcon from '@material-ui/icons/Delete';
import { Skeleton } from "@material-ui/lab";
require("es6-promise").polyfill();
require("isomorphic-fetch");


const DataTrigger = () => {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true)
    let history = useHistory();

    function getTriggers() {
        api.getTrigger()
            .then(data => {
                //console.log(data);
                setList(data.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        setLoading(true);
        getTriggers();
    }, []);

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
        date: {
            marginRight: 3,
            align: `right`,
        },
        gcontainer: {
            paddingLeft: "30px",
            paddingRight: "10px"
        }
    });

    const classes = useStyles();

    const deleteClick = async (id, e) => {
        e.preventDefault();
        //console.log(id);
        api.deleteTrigger(id)
            .then(data => {
                console.log(data);
                getTriggers();
            })
            .catch(err => console.log(err));
    }

    function handleClick(e) {
        e.preventDefault();
        history.push('/');
    }

    return (
        <div>
            { loading ?
                <div>
                    <Skeleton height={200} />
                    <Skeleton height={200} />
                    <Skeleton height={200} />
                </div>
                :
                <Container maxWidth="lg">
                    <Button variant="outlined" style={{ width: 120, marginBottom: 12 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundcolor="gray">Back</Button>
                    {list.map((row, index) =>
                        <Box mb={1} key={index}>
                            <Card className={classes.root} variant="outlined">
                                <CardHeader
                                    title={
                                        <Typography variant="overline" component="div">
                                            <Box fontWeight={520} fontSize="h6.fontSize">
                                                {row.symbol} - {row.name}
                                            </Box>
                                        </Typography>
                                    }
                                    action={
                                        <Button variant="contained" color="secondary" className={classes.button} startIcon={<DeleteIcon />} onClick={(e) => deleteClick(row._id, e)}>
                                            Delete
                                        </Button>
                                    }
                                />
                                <CardContent>
                                    <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
                                        <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
                                            <Typography variant="overline" component="div">
                                                <Box fontWeight={500} fontSize="body1.fontSize">
                                                    lowerlimit : {row.strikelowerprice}$
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
                                            <Typography variant="overline" component="div">
                                                <Box fontWeight={500} fontSize="body1.fontSize">
                                                    upperlimit : {row.strikeupperprice}$
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
                                            <Typography variant="overline" component="div">
                                                <Box fontWeight={500} fontSize="body1.fontSize">
                                                    mailTo : {row.email}
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
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
                </Container>}
        </div>

    );
};

export default DataTrigger;
