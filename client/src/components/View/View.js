import React, { useState, useEffect, useRef } from 'react';
import { Typography, Container, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';

import 'highcharts/css/stocktools/gui.css';
import 'highcharts/css/annotations/popup.css';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Data from 'highcharts/modules/data';
import Indicators from "highcharts/indicators/indicators-all.js";
import DragPanes from "highcharts/modules/drag-panes.js";
import AnnotationsAdvanced from "highcharts/modules/annotations-advanced.js";
import PriceIndicator from "highcharts/modules/price-indicator.js";
import FullScreen from "highcharts/modules/full-screen.js";
import StockTools from "highcharts/modules/stock-tools.js";
import exporting from 'highcharts/modules/exporting';
import exporData from 'highcharts/modules/export-data';
import offlineExporting from 'highcharts/modules/offline-exporting';
import theme from 'highcharts/themes/sunset';
import HC_more from "highcharts/highcharts-more";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//import Helmet from 'react-helmet';
//import TradingViewWidget, { Themes } from 'react-tradingview-widget';

import * as api from '../../api/index.js';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
require("es6-promise").polyfill();
require("isomorphic-fetch");

//var ohlc = [], volume = [];
HC_more(Highcharts);
offlineExporting(Highcharts);
exporting(Highcharts);
exporData(Highcharts);
Data(Highcharts);
Indicators(Highcharts);
DragPanes(Highcharts);
AnnotationsAdvanced(Highcharts);
PriceIndicator(Highcharts);
FullScreen(Highcharts);
StockTools(Highcharts);
theme(Highcharts);
// eslint-disable-next-line no-unused-vars
var groupingUnits = [[
  'week',                         // unit name
  [1]                             // allowed multiples
], [
  'month',
  [1, 2, 3, 4, 6]
]];


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Container>{children}</Container>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
/*
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
*/
const View = () => {

  const [stock, setStock] = useState([])
  const [similarstck, setSimilarstck] = useState([]);
  const [ohlc, setOhlc] = useState([]);
  const [candlepricedata, setCandlepricedata] = useState([]);
  const [candlevolumedata, setCandlevolumedata] = useState([]);
  const [juststock, setJuststock] = useState([]);
  const [volume, setVolume] = useState([]);
  const [iserror, setIserror] = useState(false);
  let params = useParams();
  var chartComponent = useRef(null);
  let history = useHistory();
  const [value, setValue] = React.useState(0);
  const [currentprice, setCurrentprice] = useState(0.00);
  const [upperlimit, setUpperlimit] = useState(0.00);
  const [lowerlimit, setLowerlimit] = useState(0.00);
  const [isuppererror, setIsuppererror] = useState(false);
  const [islowererror, setIslowererror] = useState(false);
  const [email, setEmail] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  /*
  const handleChangeIndex = (index) => {
    setValue(index);
  };*/
  useEffect(() => {
    const s = params.symbol;
    //const n = location.state;
    setEmail(JSON.parse(localStorage.getItem('profile')).result.email);
    console.log(s);
    api.getFundamental(s)
      .then((data) => {
        console.log(data.data);
        setStock(data.data);
        setJuststock({ symbol: data.data.symbol, name: data.data.name });
        setSimilarstck(data.data.similar);
      })
      .catch(err => {
        api.getStocksymbol(s)
          .then((data) => {
            setJuststock({ symbol: data.data.symbol, name: data.data.name });
          })
          .catch(err => console.log(err));
        setIserror(true);
        console.log(err);
      });

    api.getPrice(s)
      .then((data) => {

        var dummyOhlc = [], dummyVolume = [];
        var priceData = data.data;
        console.log(priceData);
        for (var i in priceData) {
          dummyOhlc.push([
            priceData[i].date * 1000, // the date
            priceData[i].open, // open
            priceData[i].high, // high
            priceData[i].low, // low
            priceData[i].close // close
          ]);
          dummyVolume.push([
            priceData[i].date * 1000, // the date
            priceData[i].volume // the volume
          ]);
        }
        console.log(dummyOhlc);
        setOhlc(dummyOhlc);
        setVolume(dummyVolume);
      })
      .catch(err => console.log(err));

    api.getLiveprice(s)
      .then(data => {
        var priceData = data.data;
        console.log(priceData);
        var dummyCandleprice = [], dummyCandlevolume = [];
        var len = priceData.length;
        setCurrentprice(priceData[len - 1].close);
        for (var i in priceData) {
          dummyCandleprice.push([
            priceData[i].date * 1000, // the date
            priceData[i].open, // open
            priceData[i].high, // high
            priceData[i].low, // low
            priceData[i].close // close
          ]);
          dummyCandlevolume.push([
            priceData[i].date * 1000, // the date
            priceData[i].volume // volume
          ]);
        }
        console.log(dummyCandleprice);
        setCandlepricedata(dummyCandleprice);
        setCandlevolumedata(dummyCandlevolume);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    /*interval = setInterval(() => {
      api.getLiveprice(s)
        .then(data => {
          var priceData = data.data;
          console.log(priceData);
          var dummyCandle = [];
          for (var i in priceData) {
            dummyCandle.push([
              priceData[i].date * 1000, // the date
              priceData[i].open, // open
              priceData[i].high, // high
              priceData[i].low, // low
              priceData[i].close // close
            ]);
          }
          console.log(dummyCandle);
          setCandledata(dummyCandle);
        })
        .catch(err => console.log(err));
    }, 60000);

    return () => { clearInterval(interval); };*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundcolor: theme.palette.background.paper,
      padding: theme.spacing(3),
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
      backgroundcolor: 'red',
    },
    rounded: {
      color: '#fff',
      backgroundColor: '#f0a',
      width: theme.spacing(30),
      height: theme.spacing(3),
    },
    itsTrue: {
      height: '670px',
    },
  }));

  const classes = useStyles();

  const configLiveprice = {
    chart: {
      height: (9 / 16 * 100 + 6) + '%',
      events: {
        load: function () {
          setInterval(function () {
            api.getLiveprice(params.symbol)
              .then(data => {
                var dummyprice = data.data;
                console.log(dummyprice);
                var len = dummyprice.length;
                setCurrentprice(dummyprice[len - 1].close);
                var d = dummyprice[len - 1].date * 1000;
                var o = dummyprice[len - 1].open;
                var h = dummyprice[len - 1].high;
                var l = dummyprice[len - 1].low;
                var c = dummyprice[len - 1].close;
                var v = dummyprice[len - 1].volume;
                chartComponent.current.chart.series[0].addPoint([d, o, h, l, c], true, true);
                chartComponent.current.chart.series[1].addPoint([d, v], true, true);
              })
              .catch(err => console.log(err));
          }, 60000);
        }
      }
    },

    title: {
      text: `${juststock.symbol} - ${juststock.name} Live Price`,
      style: { "color": "#001433", "fontSize": "21px" },
    },

    yAxis: [{
      labels: {
        align: 'left'
      },
      height: '80%',
      resize: {
        enabled: true
      }
    }, {
      labels: {
        align: 'left'
      },
      top: '80%',
      height: '20%',
      offset: 0
    }],
    tooltip: {
      shape: 'square',
      headerShape: 'callout',
      borderWidth: 0,
      shadow: false,
      positioner: function (width, height, point) {
        var chart = this.chart,
          position;

        if (point.isHeader) {
          position = {
            x: Math.max(
              // Left side limit
              chart.plotLeft,
              Math.min(
                point.plotX + chart.plotLeft - width / 2,
                // Right side limit
                chart.chartWidth - width - chart.marginRight
              )
            ),
            y: point.plotY
          };
        } else {
          position = {
            x: point.series.chart.plotLeft,
            y: point.series.yAxis.top - chart.plotTop
          };
        }
        return position;
      }
    },

    rangeSelector: {
      buttons: [{
        type: 'minute',
        count: 15,
        text: '15m'
      }, {
        type: 'hour',
        count: 1,
        text: '1h'
      }, {
        type: 'hour',
        count: 3,
        text: '3h'
      }, {
        type: 'all',
        count: 1,
        text: 'All'
      }],
      selected: 1,
      inputEnabled: false
    },

    series: [{
      id: `${juststock.symbol}-candlestick`,
      name: `${juststock.symbol} - Stock Price`,
      type: 'candlestick',
      data: candlepricedata,
      tooltip: {
        valueDecimals: 2
      },
      lastVisiblePrice: {
        enabled: true,
        color: 'red'
      }
    }, {
      type: 'column',
      id: `${juststock.symbol}-volume`,
      name: `${juststock.symbol} Volume`,
      data: candlevolumedata,
      yAxis: 1
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 800
        },
        chartOptions: {
          rangeSelector: {
            inputEnabled: false
          }
        }
      }]
    }
  };

  const configPrice = {
    title: {
      text: `${juststock.symbol} - ${juststock.name}`,
      style: { "color": "#001433", "fontSize": "25px" },
    },
    chart: {
      height: (9 / 16 * 100 + 6) + '%',
    },
    yAxis: [{
      labels: {
        align: 'left'
      },
      height: '80%',
      resize: {
        enabled: true
      }
    }, {
      labels: {
        align: 'left'
      },
      top: '80%',
      height: '20%',
      offset: 0
    }],
    tooltip: {
      shape: 'square',
      headerShape: 'callout',
      borderWidth: 0,
      shadow: false,
      positioner: function (width, height, point) {
        var chart = this.chart,
          position;

        if (point.isHeader) {
          position = {
            x: Math.max(
              // Left side limit
              chart.plotLeft,
              Math.min(
                point.plotX + chart.plotLeft - width / 2,
                // Right side limit
                chart.chartWidth - width - chart.marginRight
              )
            ),
            y: point.plotY
          };
        } else {
          position = {
            x: point.series.chart.plotLeft,
            y: point.series.yAxis.top - chart.plotTop
          };
        }
        return position;
      }
    },

    series: [{
      type: 'candlestick',
      id: `${juststock.symbol}-ohlc`,
      name: `${juststock.symbol} Stock Price`,
      data: ohlc
    }, {
      type: 'column',
      id: `${juststock.symbol}-volume`,
      name: `${juststock.symbol} Volume`,
      data: volume,
      yAxis: 1
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 800
        },
        chartOptions: {
          rangeSelector: {
            inputEnabled: false
          }
        }
      }]
    }
  };

  function handleClick(e) {
    e.preventDefault();
    history.push('/');
    window.location.reload();
  }

  function gotoStock(item, e) {
    e.preventDefault();
    history.push(`/view/${item}`);
    window.location.reload();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            var triggerData = { symbol: params.symbol, strikeupperprice: upperlimit, email: email, strikelowerprice: lowerlimit };
            api.createTrigger(triggerData)
              .then(data => {
                console.log(data);
                setLowerlimit(0);
                setUpperlimit(0);
                history.push('/triggers');
                window.location.reload();
              })
              .catch(err => console.log(err));
          }
        },
        {
          label: 'No',
          onClick: () => {
            setLowerlimit(0);
            setUpperlimit(0);
          }
        }
      ]
    });

  };

  return (

    <Container maxWidth="lg">
      <Button variant="outlined" style={{ width: 120, marginBottom: 7 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundcolor="gray">Back</Button>

      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Chart" />
          <Tab label="Fundamental Data" />
          <Tab label="Real Time" />
          <Tab label="Add Triger" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Container maxWidth="lg" className={classes.itsTrue}>
          {/* <Button variant="outlined" style={{ width: 120, marginBottom: 7 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundColor="gray">Back</Button> */}
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={configPrice}
          />
          <hr />
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paper className={classes.root} style={{ textTransform: "none" }}>
          {!iserror ?
            <Grid container spacing={3}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={stock.logo} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={3}>
                  <Grid item xs>
                    <Typography variant="h4" >
                      {stock.symbol} - {stock.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {stock.ceo}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {stock.hq_address}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {stock.hq_state}, {stock.hq_country}
                    </Typography>
                    <Typography variant="body2">
                      MarketCap : {stock.marketcap}$
                  </Typography>
                    <Typography variant="body2">
                      Employees : {stock.employees}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="body1" align="right">{stock.exchangeSymbol}</Typography>
                  <Typography variant="body2" align="right">{stock.exchange}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} container spacing={1}>
                <Button variant="contained" size="small" style={{ color: '#fff', backgroundColor: '#6699ff', marginRight: '8px' }}>
                  {stock.sector}
                </Button>
                <Button variant="contained" size="small" style={{ color: '#fff', backgroundColor: '#6699ff' }}>
                  {stock.industry}
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  {stock.description}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }} paragraph>
                  Listed from {stock.listdate}
                </Typography>
                <Link href={stock.url} variant="body2">
                  {stock.url}
                </Link>
                <Typography variant="body2" style={{ cursor: 'pointer' }} paragraph>
                  Similar :
              </Typography>
                {
                  similarstck.map((item, index) =>
                    <Button variant="contained" size="medium" onClick={(e) => gotoStock(item, e)} style={{ color: '#000', backgroundColor: '#ddff99', marginRight: '12px' }} key={index} >
                      {item}
                    </Button>
                  )
                }
              </Grid>
            </Grid>
            : <h2>Sorry, Don't have data...</h2>}
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container maxWidth="lg" className={classes.itsTrue}>
          {/* <Button variant="outlined" style={{ width: 120, marginBottom: 7 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundColor="gray">Back</Button> */}
          <HighchartsReact
            highcharts={Highcharts}
            ref={chartComponent}
            constructorType={"stockChart"}
            options={configLiveprice}
          />
          <hr />
        </Container>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Typography variant="h4">
            Current Price : {currentprice}$
                </Typography>
          <br />
          <hr /><br />
          Upper limit : <TextField value={upperlimit} name="upperlimit" error={isuppererror} helperText="should be grater than current Price" onChange={e => { setUpperlimit(e.target.value); if (e.target.value < currentprice) { setIsuppererror(true); } else { setIsuppererror(false); } }} autoFocus required />
          <br /><hr />
          <br />
          Lower limit : <TextField value={lowerlimit} name="lowerlimit" error={islowererror} helperText="should be less than current Price" onChange={e => { setLowerlimit(e.target.value); if (e.target.value > currentprice) { setIslowererror(true); } else { setIslowererror(false); } }} required />
          <br /><hr /><br />
          Email Address : <TextField name="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <hr /><br />
          <Button variant="contained" type="submit" color="secondary" size="large" style={{ width: 250 }}> Add </Button>
        </form>
      </TabPanel>
    </Container>
  );
};

export default View;