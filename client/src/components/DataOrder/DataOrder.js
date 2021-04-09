import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import * as api from '../../api/index.js';
import { Button, Typography, Container, Grid } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Skeleton } from "@material-ui/lab";
require("es6-promise").polyfill();
require("isomorphic-fetch");

var user;

const DataOrder = () => {

    const [list, setList] = useState([]);
    // const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true)
    let history = useHistory();
    const [show, setShow] = useState(false);
    // const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setLoading(true);
        user = JSON.parse(localStorage.getItem('profile'));
        if (user.result.isCompany)
            setShow(true);
        api.getOrder()
            .then(data => {
                console.log(data.data);
                setList(data.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
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
        },
        gcontainersubject: {
            paddingLeft: "30px",
            paddingRight: "10px",
            backgroundColor: "#8c8c8c"
        },
        gcontainerbody: {
            paddingLeft: "20px",
            paddingRight: "10px",
            paddingBottom: "10px",
            paddingTop: "6px",
            marginBottom: "15px",
            backgroundColor: "#cccccc"
        },
        conma: {
            margin: 15
        },
        typoColor: {
            color: "#000000"
        },
        typoColorSubject: {
            color: "#000000",
            paddingLeft: "15px",
            paddingRight: "10px",
            paddingBottom: "5px",
            paddingTop: "5px",
        }
    });

    const classes = useStyles();

    function handleClick(e) {
        e.preventDefault();
        history.push('/');
    }

    function doOperation(row, e, flag) {
        e.preventDefault();
        console.log(row);
        // eslint-disable-next-line eqeqeq
        if (row.orderData.status.toLowerCase() == 'pending' && flag) {
            api.acceptOrder(row.orderData._id)
                .then(data => {
                    api.getOrder()
                        .then(data => setList(data.data))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
        // eslint-disable-next-line eqeqeq
        else if (row.orderData.status.toLowerCase() == 'inprocess' && flag) {
            api.dispatchOrder(row.orderData._id)
                .then(data => {
                    api.getOrder()
                        .then(data => setList(data.data))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
        // eslint-disable-next-line eqeqeq
        else if (row.orderData.status.toLowerCase() == 'pending' && !flag) {
            api.declineOrder(row.orderData._id)
                .then(data => {
                    api.getOrder()
                        .then(data => setList(data.data))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
        // eslint-disable-next-line eqeqeq
        else if (row.orderData.status.toLowerCase() == 'dispatched' && flag) {
            // setDisabled(true);
        }
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
                    {list.map((row, index) => <div key={index}>
                        <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start" key={index}>
                            <Grid item xs={12} sm={12} md={12} className={classes.gcontainersubject}>
                                <Typography variant="button" className={classes.typoColorSubject} component="div">
                                    <Box fontWeight={550} fontSize="h6.fontSize">
                                        OrderId : {row.orderData._id}
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.gcontainersubject}>
                                <Typography variant="button" className={classes.typoColorSubject} component="div">
                                    <Box fontWeight={550} fontSize="h6.fontSize">
                                        OrderStatus : {row.orderData.status}
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid container spacing={1} className={classes.gcontainerbody} direction="row" justify="flex-start" alignItems="flex-start">
                                <Grid item xs={12} sm={9} md={9} className={classes.gcontainer}>
                                    <Grid container spacing={1} className={classes.gcontainerbody} direction="row" justify="flex-start" alignItems="flex-start">
                                        <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                                            <Typography variant="body1" className={classes.typoColor} component="div">
                                                <Box fontWeight={500} fontSize="h6.fontSize">
                                                    Product Name : {row.productData.name}
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                                            <Typography variant="body1" className={classes.typoColor} component="div">
                                                <Box fontWeight={500} fontSize="h6.fontSize">
                                                    Seller Name : {row.companyData.name}
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                                            <Typography variant="body1" className={classes.typoColor} component="div">
                                                <Box fontWeight={500} fontSize="h6.fontSize">
                                                    Product Price : {row.productData.price}
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                                            <Typography variant="body1" className={classes.typoColor} component="div">
                                                <Box fontWeight={500} fontSize="h6.fontSize">
                                                    Quantity : {row.orderData.quantity}
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                                            <Typography variant="body1" className={classes.typoColor} component="div">
                                                <Box fontWeight={500} fontSize="h6.fontSize">
                                                    Total Amount : {row.orderData.amount}
                                                </Box>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                                            <Typography variant="body2" className={classes.typoColor} component="div">
                                                <Box fontWeight={500} fontSize="body1.fontSize">
                                                    *{new Date(row.orderData.date).toUTCString()}
                                                </Box>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={3} md={3} className={classes.gcontainer}>
                                    <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                                        {show ?
                                            (() => {
                                                switch (row.orderData.status.toLowerCase()) {
                                                    case "pending": return <Button variant="contained" style={{ width: 250, marginTop: 10 }} fontSize="large" color="secondary" align="center" onClick={(e) => doOperation(row, e, true)}>Accept</Button>;
                                                    case "inprocess": return <Button variant="contained" style={{ width: 250, marginTop: 10 }} fontSize="large" color="secondary" align="center" onClick={(e) => doOperation(row, e, true)}>Dispatch</Button>;
                                                    case "dispatched": return <Button variant="contained" style={{ width: 250, marginTop: 10 }} fontSize="large" color="secondary" align="center" disabled onClick={(e) => doOperation(row, e, true)}>dispatched</Button>;;
                                                    default: return null;
                                                }
                                            })()
                                            : null}
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                                        {
                                            // eslint-disable-next-line eqeqeq
                                            (show && row.orderData.status.toLowerCase() == 'pending') ?
                                                <Button variant="contained" style={{ width: 250, marginTop: 10 }} fontSize="large" color="secondary" align="center" onClick={(e) => doOperation(row, e, false)}>Decline</Button>
                                                : null}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    )
                    }
                </Container >}
        </div >

    );
};

export default DataOrder;
