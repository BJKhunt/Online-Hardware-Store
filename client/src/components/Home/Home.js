import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import * as api from '../../api/index.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button, Grid, Typography, Container, TextField, CardMedia } from '@material-ui/core';
//import Datatable from '../Datatable/Datatable.js';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import ShopOutlinedIcon from '@material-ui/icons/ShopOutlined';
import { Skeleton } from "@material-ui/lab";
import Admin from '../Admin/Admin';

const Home = () => {
    const [isc, setIsc] = useState(false);
    const [isa, setIsa] = useState(false);
    const [list, setList] = useState([]);
    const [disabled, setDisabled] = useState(false);
    let history = useHistory();

    useEffect(() => {
        var data = JSON.parse(localStorage.getItem('profile'));
        console.log(data.result);
        setIsc(data.result.isCompany);
        setDisabled(data.result.isCompany);
        // eslint-disable-next-line eqeqeq
        if (data.result.email == 'admin@gmail.com') {
            setIsa(true);
        }
        api.getAllProduct()
            .then(data => setList(data.data))
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
        media: {
            height: 50,
            paddingTop: '56.25%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backgroundBlendMode: 'darken',
        },
        button: {
            marginRight: 30,
            align: `center`,
            marginBottom: 15,
        },
        avatar: {
            backgroundColor: 'red',
        },
        gcontainer: {
            paddingLeft: "50px",
            paddingRight: "20px"
        },
        conma: {
            margin: 15
        },
        typoColor: {
            color: "#000000"
        }
    });

    const classes = useStyles();

    function handleClick(e) {
        e.preventDefault();
        history.push('/seller');
    }

    function orderClick(row, e) {
        e.preventDefault();
    }

    function inquiryClick(row, e) {
        e.preventDefault();
        console.log(row.name);
        history.push({ pathname: `/inquiry/${row._id}`, state: { id: row._id } });
    }

    function ordersClick(e) {
        e.preventDefault();
    }

    function inquiriesClick(e) {
        e.preventDefault();
        history.push(`/inquiries`);
    }

    return (
        <Container maxWidth="lg">
            {isa ?
                <Admin />
                :
                <div>
                    <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
                        <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                            {
                                !isc ?
                                    <Button variant="contained" className={classes.button} onClick={handleClick} style={{ width: 300, marginTop: 10 }} fontSize="large" color="secondary">Want to Become a seller ??</Button>
                                    :
                                    <Button variant="contained" className={classes.button} onClick={handleClick} style={{ width: 300, marginTop: 10 }} fontSize="large" color="secondary">go to Your Products</Button>
                            }
                            {
                                !disabled ?
                                    <Button variant="contained" disabled={disabled} className={classes.button} onClick={ordersClick} style={{ width: 300, marginTop: 10 }} fontSize="large" color="secondary">Orders</Button>

                                    : null
                            }
                            {
                                !disabled ?
                                    <Button variant="contained" disabled={disabled} className={classes.button} onClick={inquiriesClick} style={{ width: 300, marginTop: 10 }} fontSize="large" color="secondary">Inquiries</Button>
                                    : null
                            }

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
                                            <Button variant="contained" align="right" color="secondary" className={classes.button} startIcon={<ShopOutlinedIcon />} onClick={(e) => orderClick(row, e)}>
                                                Order
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
                                            <Button variant="contained" align="right" color="secondary" className={classes.button} startIcon={<QueryBuilderOutlinedIcon />} onClick={(e) => inquiryClick(row, e)}>
                                                Inquiry
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Link>
                    )}
                    <hr />
                </div>
            }
        </Container>
    );
};

export default Home;
