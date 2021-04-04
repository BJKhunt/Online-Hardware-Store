
import { Typography, Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/NavigateBeforeTwoTone';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Joker from '../../images/J.jfif'
import { Link } from "react-router-dom";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {
  Grid
} from '@material-ui/core/'
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    alignItems: 'center',
    align: 'center',
  },
  media: {
    paddingTop: '81.25%',
    borderRadius: '50%',
    margin: '28px'
  },
  root2: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  gcontainer: {
    paddingLeft: "50px",
    paddingRight: "20px"
  }
}));


const About = () => {

  let history = useHistory();
  function handleClick(e) {
    e.preventDefault();
    history.push('/');
  }

  const classes = useStyles();
  //const preventDefault = (event) => event.preventDefault();

  return (

    <div className={classes.root2}>
      <Button variant="outlined" style={{ width: 120, marginBottom: 7 }} fontSize="medium" color="inherit" startIcon={<ArrowBack style={{ fontSize: 30 }} />} onClick={(e) => handleClick(e)} backgroundcolor="gray">Back</Button>

      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={4} md={4} className={classes.gcontainer}>

        </Grid>
        <Grid item xs={12} sm={6} md={6} className={classes.gcontainer}>
          <Card className={classes.root} style={{ border: "none", boxShadow: "none" }} align="center">
            <CardMedia
              className={classes.media}
              image="https://avatars.githubusercontent.com/u/68754074?s=400&u=37f826742eb8745cceda3f0f5c0f4bac2fad3e6c&v=4"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="h1" fontWeight="fontWeightBold">
                Brijesh Khunt
              </Typography>
              <Typography variant="body1" component="p">
                Want to be a Quant Trader...
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={{ pathname: 'https://github.com/BJKhunt' }} target="_blank" >
                <GitHubIcon fontSize="large" />
              </Link>
              <Link to={{ pathname: 'https://www.linkedin.com/in/bjkhunt' }} target="_blank" >
                <LinkedInIcon fontSize="large" />
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3} md={3} className={classes.gcontainer}>

        </Grid>
      </Grid>
    </div>

  );
};

export default About;
