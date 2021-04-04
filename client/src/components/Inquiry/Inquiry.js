import React, { useState, useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory, useParams } from 'react-router-dom';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as api from '../../api/index.js';

import useStyles from './styles';

const Inquiry = () => {
    const [from, setFrom] = useState('');
    const [pid, setPid] = useState('');
    const [name, setName] = useState('');
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = React.useState(false);
    let history = useHistory();
    let params = useParams();
    const classes = useStyles();

    useEffect(() => {
        setFrom(JSON.parse(localStorage.getItem('profile')).result.email);
        let _id = params.id;
        console.log(_id);
        setPid(_id);
        api.getProductById(_id)
            .then(data => {
                console.log(data.data);
                setName(data.data.productData.name);
                setTo(data.data.companyData.contact);
            })
            .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form);
        confirmAlert({
            title: subject,
            message: message,
            buttons: [
                {
                    label: 'Send',
                    onClick: () => {
                        var inquiryData = { productid: pid, subject: subject, message: message, from: from, to: to };
                        api.addInquiry(inquiryData)
                            .then(data => {
                                setOpen(true);
                                setMessage('');
                                setSubject('');
                                setPid(''); setName(''); setFrom(''); setTo('');
                                history.push('/');
                            })
                            .catch(err => console.log(err));
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => {
                        setMessage('');
                        setSubject('');
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
                        Make Inquiry
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField disabled name="from" type="email" fullWidth variant="outlined" label="From" value={from} onChange={e => setFrom(e.target.value)} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField disabled name="to" type="email" fullWidth variant="outlined" label="To" value={to} onChange={e => setTo(e.target.value)} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField disabled name="name" type="text" fullWidth variant="outlined" label="ProductName" value={name} onChange={e => setName(e.target.value)} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField name="subject" type="text" fullWidth variant="outlined" label="Subject" value={subject} onChange={e => setSubject(e.target.value)} required autoFocus />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField name="message" type="text" fullWidth variant="outlined" label="Message" value={message} onChange={e => setMessage(e.target.value)} required />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
                            Send Message
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Container>
    );
};

export default Inquiry;