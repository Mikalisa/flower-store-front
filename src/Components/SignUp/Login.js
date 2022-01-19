import React ,  { useState } from 'react';
import { useHistory  } from "react-router-dom";
import axios from "axios";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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


export default function Login({ setToken }) {


  const classes = useStyles();
  const navigate  = useHistory();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");






  const changeEmail = (e) => {
      setEmail(e.target.value);
    };




  const changePassword = (e) => {
    setPassword(e.target.value);
  };


  const checkLogin = async (e) => {

    e.preventDefault();


    try {

      const response = await axios.post("https://flower-sto.herokuapp.com/login", {
        email: email,
        password: password,

      });
     
      setToken(response.data.token);


      // Store token in local storage
      localStorage.setItem('token', response.data.token);



      // Store user data in local storage
      localStorage.setItem('data', JSON.stringify(response.data.user));


      // If admin login then redirect to admin page
      if(response.data.user.userLevel == "admin"){

        navigate.push("/manage");

      }else {

         navigate.push("/");
      }
     
      

     

    } catch (error) {
      console.log(error);
    }
  };



    

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            
         
            <Grid item xs={12}>

              <TextField
                variant="outlined"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                onChange={(e) => changeEmail(e)}

              />
            </Grid>


            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {changePassword(e);}}
              />
            </Grid>
           
          </Grid>


          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {checkLogin(e);}} > 
          
            Sign In
          </Button>

         
        </form>
      </div>

    </Container>
  );
}