import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../picture/logo.jpg';

import cookie from 'react-cookies'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://ak.picdn.net/shutterstock/videos/7221199/thumb/1.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  img: {
    width: '120%', 
    height: '120%', 
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {

  const classes = useStyles();
  
  let [data, setData] = useState({
    email: '',
    password: '',
    errors: {}
  });

  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const validate = () => {
    
    let email = data.email;
    let password = data.password;

    let errors = {};

    let ids = 0;

    if (email === "may@gmail.com" || email === "ken@gmail.com") {
      if (password === "test") {
        if (email === "may@gmail.com") {
          ids = 1;
        } else {
          ids = 2;
        }
      } else {
        errors["password"] = "Please enter your correct password";
      }
    } else {
      errors["email"] = "Please enter your correct email";
    }

    setData({ ...data, errors: errors });

    return ids;
  }

  const history = useHistory();
  
  const submitData = () => {
    let user = validate()
    if (user === 1 || user === 2) {
      cookie.save('userInfo', user, { path: '/' })
      history.push(`/tracker`)
    }
  }

  let { email, password } = data;
  
  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <img className={classes.img} src={logo} alt="logo" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
              <TextField 
                onChange={(e) => onChange(e)} 
                value={email} 
                name="email" 
                label="Email"
                type="email" 
                placeholder="Enter your email" 
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoComplete="email"
              />
              <div className="text-danger">{data.errors.email}</div>
              <TextField 
                onChange={(e) => onChange(e)} 
                value={password} 
                name="password" 
                label="Password"
                type="password" 
                placeholder="Enter password" 
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoComplete="password"
              />
              <div className="text-danger">{data.errors.password}</div>
              <Button 
                onClick={() => submitData()}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>

              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
