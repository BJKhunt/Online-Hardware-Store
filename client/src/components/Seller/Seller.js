import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import * as api from '../../api/index.js';
import { Button, Grid, Typography, Container, CardMedia } from '@material-ui/core';
//import Datatable from '../Datatable/Datatable.js';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import CompanyForm from '../CompanyForm/CompanyForm';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Seller = () => {
    const [isc, setIsc] = useState(false);
    const [list, setList] = useState([]);
    let history = useHistory();

    useEffect(() => {
        var data = JSON.parse(localStorage.getItem('profile'));
        console.log(data.result);
        setIsc(data.result.isCompany);
        api.getProduct()
            .then(data => {
                console.log(data.data);
                setList(data.data)
            })
            .catch(err => console.log(err))
    }, [])

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
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
            marginBottom: 15,
        },
        avatar: {
            backgroundColor: 'red',
        },
        gcontainer: {
            paddingLeft: "50px",
            paddingRight: "20px"
        },
        media: {
            height: 50,
            paddingTop: '56.25%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backgroundBlendMode: 'darken',
        },
        conma: {
            margin: 15,
        },
        typoColor: {
            color: "#000000"
        }
    });

    const classes = useStyles();

    function updateClick(row, e) {
        e.preventDefault();
        //history.push('/productform');
    }

    function deleteClick(row, e) {
        e.preventDefault();
        confirmAlert({
            title: "Are You Sure to Delete this Product?",
            buttons: [
                {
                    label: 'Send',
                    onClick: () => {
                        api.deleteProduct(row._id)
                            .then(data => {
                                api.getProduct()
                                    .then(data => setList(data.data))
                                    .catch(err => console.log(err));
                            })
                            .catch(err => console.log(err));
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => {

                    }
                }
            ]
        });
    }

    function handleClick(e) {
        e.preventDefault();
        history.push('/');
    }

    function gotoCreate(e) {
        e.preventDefault();
        history.push('/productform');
    }

    function gotoOrders(e) {
        e.preventDefault();
        history.push('/orders');
    }

    function gotoInquiries(e) {
        e.preventDefault();
        history.push('/inquiries');
    }

    return (
        <div>
            {
                !isc ?
                    <CompanyForm />
                    :
                    <Container maxWidth="lg">
                        <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
                            <Grid item xs={12} sm={3} md={3} className={classes.gcontainer}>
                                <Button variant="outlined" style={{ width: 120, marginTop: 10 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundcolor="gray">Back</Button>
                            </Grid>
                            <Grid item xs={12} sm={3} md={3} className={classes.gcontainer}>
                                <Button variant="contained" style={{ width: 250, marginTop: 10 }} fontSize="large" color="secondary" startIcon={<AddCircleOutlineOutlinedIcon />} align="center" onClick={(e) => gotoCreate(e)}>Add Product</Button>
                            </Grid>
                            <Grid item xs={12} sm={3} md={3} className={classes.gcontainer}>
                                <Button variant="contained" style={{ width: 250, marginTop: 10 }} fontSize="large" color="secondary" align="center" onClick={(e) => gotoOrders(e)}>Manage Orders</Button>
                            </Grid>
                            <Grid item xs={12} sm={3} md={3} className={classes.gcontainer}>
                                <Button variant="contained" style={{ width: 250, marginTop: 10 }} fontSize="large" color="secondary" align="center" onClick={(e) => gotoInquiries(e)}>Manage Inquiries</Button>
                            </Grid>
                        </Grid>
                        <hr />
                        {list.map((row, index) =>
                            <Link to={{ pathname: `/view/${row._id}`, state: { id: row._id } }} key={index} style={{ textDecoration: 'none' }} >
                                <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start" className={classes.conma}>
                                    <Grid item xs={12} sm={4} md={4} className={classes.gcontainer}>
                                        <CardMedia className={classes.media} image={row.url || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={row.name} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
                                        <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
                                            <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                                                <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
                                                    <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                                                        <Typography variant="button" className={classes.typoColor} component="div" align="center">
                                                            <Box fontWeight={550} fontSize="h5.fontSize">
                                                                SKU No : {row.sku}
                                                            </Box>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                                                        <Typography variant="overline" className={classes.typoColor} component="div" align="center">
                                                            <Box fontWeight={500} fontSize="h6.fontSize">
                                                                {row.name}
                                                            </Box>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                                                <Typography variant="overline" className={classes.typoColor} component="div" align="center">
                                                    <Box fontWeight={500} fontSize="h6.fontSize">
                                                        {row.catagory}
                                                    </Box>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={2} md={2} className={classes.gcontainer}>
                                        <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
                                            <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                                                <Button variant="contained" align="right" color="secondary" className={classes.button} startIcon={<UpdateOutlinedIcon />} onClick={(e) => updateClick(row, e)}>
                                                    Update
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                                                <Button variant="contained" align="right" color="secondary" className={classes.button} startIcon={<DeleteIcon />} onClick={(e) => deleteClick(row, e)}>
                                                    Delete
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Link>
                        )}
                        <hr />
                    </Container>
            }
        </div>
    );
};

export default Seller;
