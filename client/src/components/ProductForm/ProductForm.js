import React, { useState, useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField, Select, MenuItem, Chip, Input } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import FileBase from 'react-file-base64';
import * as api from '../../api/index.js';

import useStyles from './styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const sizes = [`96 MM`, `128 MM`, `160 MM`, `224 MM`, `228 MM`, `Large`, `Medium`, `Small`]

const ProductForm = () => {
    const [sku, setSku] = useState('');
    const [url, setUrl] = useState('');
    const [catagory, setCatagory] = useState('');
    const [name, setName] = useState('');
    const [finish, setFinish] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState([]);
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(form);
        confirmAlert({
            title: "Are You Sure?",
            buttons: [
                {
                    label: 'Send',
                    onClick: () => {
                        var companyid = JSON.parse(localStorage.getItem('profile')).result.c_id;
                        var productData = { url: url, name: name, catagory: catagory, sku: sku, finish: finish, price: price, size: size, companyid: companyid };
                        api.createProduct(productData)
                            .then(data => {
                                setOpen(true);
                                setName('');
                                setUrl(''); setCatagory('');
                                setSku('');
                                setFinish('');
                                setPrice(''); setSize([]);
                                history.push('/seller');
                            })
                            .catch(err => console.log(err));
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => {
                        setName('');
                        setCatagory(''); setUrl('');
                        setSku('');
                        setFinish('');
                        setPrice(''); setSize([]);
                    }
                }
            ]
        });
    };

    function handleClick(e) {
        e.preventDefault();
        history.push('/seller');
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
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5" component="h1" fontWeight="fontWeightBold">
                        Product Details
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField name="name" type="text" fullWidth variant="outlined" label="Product Title" value={name} onChange={e => setName(e.target.value)} required autoFocus />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField name="catagory" type="text" fullWidth variant="outlined" label="Catagory" value={catagory} onChange={e => setCatagory(e.target.value)} required />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField name="sku" type="text" fullWidth variant="outlined" label="SKU No." value={sku} onChange={e => setSku(e.target.value)} required />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Select value={finish} label="Finish" onChange={e => setFinish(e.target.value)} fullWidth variant="outlined" required>
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="SS MATT">SS MATT</MenuItem>
                                    <MenuItem value="Brass Antique">Brass Antique</MenuItem>
                                    <MenuItem value="Copper Gold">Copper Gold</MenuItem>
                                    <MenuItem value="Rose Gold">Rose Gold</MenuItem>
                                    <MenuItem value="CP Crome">CP Crome</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Select multiple value={size} label="Sizes" fullWidth variant="outlined" required onChange={e => setSize(e.target.value)} input={<Input />}
                                    renderValue={(selected) => (
                                        <div className={classes.chips}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} className={classes.chip} />
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {sizes.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FileBase type="file" multiple={false} onDone={({ base64 }) => setUrl(base64)} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField name="price" type="text" fullWidth variant="outlined" label="Price" value={price} onChange={e => setPrice(e.target.value)} required />
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

export default ProductForm;