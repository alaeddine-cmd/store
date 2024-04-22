import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Avatar,
  Box,
} from '@material-ui/core';
import './AccountActivationSuccess.css'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AccountActivationSuccess() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        <img src="/assets/logo_2.png" alt="lock icon" style={{ width: '50%', height: '50%' }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Account Activation Successful!
        </Typography>
        <Typography variant="body1">
          Congratulations! Your account has been successfully activated.
        </Typography>
      </div>
      <Box mt={5} />
    </Container>
  );
}

export default AccountActivationSuccess;
