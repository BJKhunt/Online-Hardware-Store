import React, { useState, useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as api from '../../api/index.js';

import useStyles from './styles';

const CompanyForm = () => {
    const [address, setAddress] = useState('');
    const [gst, setGst] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [contact, setContact] = useState('');
    const [description, setDescription] = useState('');
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        //console.log(JSON.parse(localStorage.getItem('profile')).result);
        //setName(JSON.parse(localStorage.getItem('profile')).result.name);
        //setEmail(JSON.parse(localStorage.getItem('profile')).result.email);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form);
        confirmAlert({
            title: "Are You Sure?",
            message: "Your Seller Account Request will be verified within 2-3 Business Working Days...",
            buttons: [
                {
                    label: 'Send',
                    onClick: () => {
                        var companyData = { name: name, gst: gst, address: address, city: city, state: state, contact: contact, description: description };
                        api.addCompany(companyData)
                            .then(data => {
                                setOpen(true);
                                setName('');
                                setAddress('');
                                setCity('');
                                setState('');
                                setContact(''); setGst(''); setDescription('');
                            })
                            .catch(err => console.log(err));
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => {
                        setOpen(true);
                        setName('');
                        setAddress('');
                        setCity('');
                        setState('');
                        setContact(''); setGst(''); setDescription('');
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
                        <ContactMailIcon />
                    </Avatar>
                    <Typography variant="h5" component="h1" fontWeight="fontWeightBold">
                        Company Details
                    </Typography>
                    <Typography variant="body1" component="p" fontWeight="fontWeightMedium">
                        Become a Seller with us
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField name="name" type="text" fullWidth variant="outlined" label="Company Name" value={name} onChange={e => setName(e.target.value)} required autoFocus />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField name="gst" type="text" fullWidth variant="outlined" label="Gst No." value={gst} onChange={e => setGst(e.target.value)} required />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField name="address" type="text" fullWidth variant="outlined" label="Address" value={address} onChange={e => setAddress(e.target.value)} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="city" type="text" fullWidth variant="outlined" label="City" value={city} onChange={e => setCity(e.target.value)} required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="state" type="text" fullWidth variant="outlined" label="State" value={state} onChange={e => setState(e.target.value)} required />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField name="contact" type="email" fullWidth variant="outlined" label="Email Contact" value={contact} onChange={e => setContact(e.target.value)} required />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField name="description" type="text" fullWidth variant="outlined" label="Description" value={description} onChange={e => setDescription(e.target.value)} required />
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

export default CompanyForm;