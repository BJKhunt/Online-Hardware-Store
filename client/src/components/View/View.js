import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import * as api from '../../api/index.js';
import { Button, Grid, Typography, Container, CardMedia } from '@material-ui/core';
//import Datatable from '../Datatable/Datatable.js';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import ShopOutlinedIcon from '@material-ui/icons/ShopOutlined';

const View = () => {
  let history = useHistory();
  const [id, setId] = useState('');
  const [productData, setProductData] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [sizeList, setSizeList] = useState([]);
  let params = useParams();

  useEffect(() => {
    var _id = params.id;
    setId(_id);
    api.getProductById(_id)
      .then(data => {
        setCompanyData(data.data.companyData);
        setSizeList(data.data.productData.size);
        setProductData(data.data.productData);
      })
      .catch(err => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    },
    viewbutton: {
      align: 'center',
      width: 320,
      margin: 10
    }
  });

  const classes = useStyles();

  function handleClick(e) {
    e.preventDefault();
    history.push('/');
  }

  function orderClick(e) {
    e.preventDefault();
    history.push({ pathname: `/orderform/${id}`, state: { id: id } });
  }

  function inquiryClick(e) {
    e.preventDefault();
    var userid = 'blah';
    history.push({ pathname: `/inquiry/${id}/${userid}`, state: { id: id, userid: userid } });
  }

  return (
    <Container maxWidth="lg">
      <Button variant="outlined" style={{ width: 120, marginTop: 10 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundcolor="gray">Back</Button>
      <hr />
      <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
        <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
          <Typography variant="button" className={classes.typoColor} component="div" align="center">
            <Box fontWeight={550} fontSize="h5.fontSize">
              Title : {productData.name}
            </Box>
          </Typography>
          <hr />
        </Grid>
        <Grid item xs={12} sm={8} md={8} className={classes.gcontainer}>
          <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
            <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
              <Typography variant="overline" className={classes.typoColor} component="div">
                <Box fontWeight={500} fontSize="h6.fontSize">
                  Catagory : {productData.catagory}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
              <Typography variant="overline" className={classes.typoColor} component="div">
                <Box fontWeight={500} fontSize="h6.fontSize">
                  Finish : {productData.finish}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
              <Typography variant="overline" className={classes.typoColor} component="div">
                <Box fontWeight={500} fontSize="h6.fontSize">
                  Price : {productData.price}$
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
              <Typography variant="overline" className={classes.typoColor} component="div">
                <Box fontWeight={500} fontSize="h6.fontSize">
                  Available Sizes : {sizeList.map((row) => <span> {row} ,</span>)}
                </Box>
              </Typography>
            </Grid>
            <hr />
            <Grid item xs={12} sm={12} md={12} className={classes.gcontainer}>
              <Typography variant="overline" className={classes.typoColor} component="div">
                <Box fontWeight={500} fontSize="h6.fontSize">
                  Manufactured By : {companyData.name}
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} md={4} className={classes.gcontainer}>
          <CardMedia className={classes.media} image={productData.url || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={productData.name} />
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
        <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
          <Button variant="contained" className={classes.viewbutton} fontSize="large" color="secondary" startIcon={<ShopOutlinedIcon />} onClick={(e) => orderClick(e)}>Order this</Button>
        </Grid>
        <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
          <Button variant="contained" className={classes.viewbutton} fontSize="large" color="secondary" startIcon={<QueryBuilderOutlinedIcon />} onClick={(e) => inquiryClick(e)}>Make Inquiry</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default View;
