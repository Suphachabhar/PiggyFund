import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {

  const classes = useStyles();

  let [data, setData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    errors: {}
  });

  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const validate = () => {
    let fname = data.fname;
    let lname = data.lname;
    let email = data.email;
    let password = data.password;
    
    let errors = {};
    let isValid = true;

    if (!fname) {
      isValid = false;
      errors["fname"] = "Please enter your first name.";
    }

    if (!lname) {
      isValid = false;
      errors["lname"] = "Please enter your last name.";
    }

    if (!email) {
      isValid = false;
      errors["email"] = "Please enter your email.";
    }

    if (typeof email !== "undefined") {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(email)) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }

    if (!password) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }

    if (password.length < 6) {
      isValid = false;
      errors["password"] = "Please enter at least 6 password.";
    }

    setData({ ...data, errors: errors });

    return isValid;
  }

  const history = useHistory();
  
  const submitData = () => {
    console.log(data)
    if (validate()) {
      console.log('register success')
      history.push('/tracker')
    }
  }

  let { fname, lname, email, password } = data;
  
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <div className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField 
                  onChange={(e) => onChange(e)} 
                  value={fname} 
                  name="fname" 
                  label="First Name"
                  type="fname" 
                  placeholder="Enter your first name" 
                  variant="outlined"
                  required
                  fullWidth
                  autoComplete="fname"
                />
                <div className="text-danger">{data.errors.fname}</div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  onChange={(e) => onChange(e)} 
                  value={lname} 
                  name="lname" 
                  label="Last Name"
                  type="lname" 
                  placeholder="Enter your last name" 
                  variant="outlined"
                  required
                  fullWidth
                  autoComplete="lname"
                />
                <div className="text-danger">{data.errors.lname}</div>
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => submitData()}
                >
                    Sign Up
                </Button>
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  )
}
