import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: 'rgba(100,0,128, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  root: {
    maxWidth: 500,
    backgroundColor: "#262626"
  },
  media: {
    paddingTop: '81.25%',
    borderRadius: '50%',
    margin: '28px'
  },
  root2: {
    flexGrow: 1,
    padding: theme.spacing(2),
    background: '#262626',
    marginLeft: '0px',
    marginRight: '0px',
    marginTop: "10px",
    bottom: 0,
    top: 'auto',

  },
  gcontainer: {
    paddingLeft: "50px",
    paddingRight: "20px"
  }
}));
