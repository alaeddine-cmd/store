import React, { useState } from 'react';
import { Email } from '@material-ui/icons';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Typography,
  Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import './ForgotPassword.css'


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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ForgotPassword(props) {
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openV, setOpenV] = React.useState(false);
  const [formData, setFormData] = useState({
    email: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(false);
    try {
      setIsLoading(true);
      const response = await fetch('https://volo-back.onrender.com/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        if (response.status === 200 && data.message === 'Password reset instructions sent to your email address.') {
          setOpenV(true); // show the dialog
        }
      }
      else if (response.status === 404 && data.message === 'User not found') {
        setOpen(true); // show the dialog
      }
    } catch (error) {
      console.log(error)
    }
    setTimeout(() => setIsLoading(false), 1000); // Stop loading after 3 seconds

  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseV = () => {
    setOpenV(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        <img src="/assets/logo_2.png" alt="lock icon" style={{ width: '50%', height: '50%' }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!formData.email}
          >
            Send Password Reset Email
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="" variant="body2" onClick={() => { navigate('/login') }}>
                Back to Sign In
              </Link>
            </Grid>
          </Grid>
          {isLoading && <Box style={{ marginTop: '10px' }} sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>}
        </form>
      </div>
      <Box mt={5} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        maxWidth="xs"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Email not found
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please check again your email.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ backgroundColor: '#3f51b5', opacity: 1, height: 40 }}
            color="primary">
            <p style={{ color: 'white' }}>ok</p>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openV}
        onClose={handleCloseV}
        aria-labelledby="draggable-dialog-title"
        maxWidth="xs"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          <IconButton style={{ fontSize: 24, marginRight: '5px' }}><Email /></IconButton>

          Mail Sent
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Password reset instructions sent to your email address.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseV} style={{ backgroundColor: '#3f51b5', opacity: 1, height: 40 }}
            color="primary">
            <p style={{ color: 'white' }}>ok</p>
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ForgotPassword;