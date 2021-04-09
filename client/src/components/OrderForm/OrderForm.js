import React, { useState, useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory, useParams } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ShopOutlinedIcon from '@material-ui/icons/ShopOutlined';
import * as api from '../../api/index.js';

import useStyles from './styles';

const OrderForm = () => {
    const [productid, setProductid] = useState('');
    const [companyid, setCompanyid] = useState('');
    const [amount, setAmount] = useState('');
    const [quantity, setQuantity] = useState('');
    const [transport, setTransport] = useState('');
    const [price, setPrice] = useState('');
    const [cname, setCname] = useState('');
    const [pname, setPname] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const params = useParams();
    const classes = useStyles();

    useEffect(() => {
        let _id = params.id;
        setProductid(_id);
        api.getProductById(_id)
            .then(data => {
                setCompanyid(data.data.companyData._id)
                setPname(data.data.productData.name);
                setCname(data.data.companyData.name);
                setPrice(data.data.productData.price);
            })
            .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form);
        confirmAlert({
            title: "Are You Sure?",
            message: "Once the Order placed,You cannot Modify or Cancel the Order..",
            buttons: [
                {
                    label: 'Send',
                    onClick: () => {
                        var orderData = { city: city, state: state, companyid: companyid, productid: productid, quantity: quantity, amount: amount, transport: transport, status: "Pending" };
                        api.addOrder(orderData)
                            .then(data => {
                                setOpen(true);
                                history.push('/');
                            })
                            .catch(err => console.log(err));
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => {
                        setOpen(true);
                        setPname(''); setCname(''); setProductid(''); setCompanyid(''); setAmount(''); setQuantity('');
                        setTransport('');
                        setCity('');
                        setState('');
                        setPrice('');
                    }
                }
            ]
        });
    };

    function handleClick(e) {
        e.preventDefault();
        history.push('/');
    }

    return (
        <Container maxWidth="lg" style={{ marginBottom: 20 }}>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>
                    Sent...
                </Alert>
            </Collapse>
            <Button variant="outlined" style={{ width: 120, marginTop: 10 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundcolor="gray">Back</Button>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <ShopOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5" component="h1" fontWeight="fontWeightBold">
                        Make Order
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField name="pname" disabled type="text" fullWidth variant="outlined" label="Product Name" value={pname} onChange={e => setPname(e.target.value)} required />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField name="cname" disabled type="text" fullWidth variant="outlined" label="Company Name" value={cname} onChange={e => setCname(e.target.value)} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="price" disabled type="text" fullWidth variant="outlined" label="Price" value={price} onChange={e => setPrice(e.target.value)} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="quantity" type="number" fullWidth variant="outlined" label="Quantity" value={quantity} onChange={e => { setQuantity(e.target.value); setAmount(price * e.target.value); }} required autoFocus />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField name="transport" type="text" fullWidth variant="outlined" label="Transport Name" value={transport} onChange={e => setTransport(e.target.value)} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="city" type="text" fullWidth variant="outlined" label="City" value={city} onChange={e => setCity(e.target.value)} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="state" type="text" fullWidth variant="outlined" label="State" value={state} onChange={e => setState(e.target.value)} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="button" component="h5" align="center">
                                    <Box fontWeight={500} fontSize="body1.fontSize">
                                        Amount : {amount}
                                    </Box>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
                            Submit
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Container>
    );
};

export default OrderForm;