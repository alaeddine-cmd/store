import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
  Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { Lock, LockOpen } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import './ResetPassword.css'

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

export default function ResetPassword(props) {
  const [open, setOpen] = React.useState(false);
  const [openInvalid, setOpenInvalid] = React.useState(false);
  const [openInvalidPassword, setOpenInvalidPassword] = React.useState(false);
  const classes = useStyles();
/*   const [passwordError, setPasswordError] = useState("");
 */  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  /*   const { resetToken } = useParams();
   */
  const [formDataErrors, setFormDataErrors] = useState({
    password: '',
    confirmPassword: '',
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resetToken = new URLSearchParams(window.location.search).get('token');
      console.log(resetToken)
      const response = await fetch(`https://volo-back.onrender.com/api/reset-password/${resetToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        if (data.message === 'Password reset successful') {
          setOpen(true);
          setTimeout(() => navigate('/login'), 1000); // Stop loading after 3 seconds

        }
      }
      else if (response.status === 400) {
        if (data.message === 'Invalid or expired password reset token') {
          setOpenInvalid(true);
        } else if (data.message === 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number') {
          setOpenInvalidPassword(true);
        }

      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseInvalid = () => {
    setOpenInvalid(false);
  };
  const handleCloseInvalidPassword = () => {
    setOpenInvalidPassword(false);
  };
  const validatePassword = (password) => {
    const lowerCaseRegex = /^(?=.*[a-z])/;
    const upperCaseRegex = /^(?=.*[A-Z])/;
    const numberRegex = /^(?=.*\d)/;

    let errors = { ...formDataErrors };
    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!lowerCaseRegex.test(password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    } else if (!upperCaseRegex.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!numberRegex.test(password)) {
      errors.password = 'Password must contain at least one number';
    } else {
      errors.password = '';
    }
    setFormDataErrors(errors);
  };


  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    let errors = { ...formDataErrors };
    setFormData({ ...formData, [name]: value });
    if (name === 'password') {
      if (value !== '') {
        validatePassword(value);
      } else {
        errors.password = 'Password is required';
        setFormDataErrors(errors);
      }
    }
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        errors.confirmPassword = 'Passwords do not match';
      } else {
        errors.confirmPassword = '';
      }
    }
    setFormDataErrors(errors);
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        <img src="/assets/logo_2.png" alt="lock icon" style={{ width: '50%', height: '50%' }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!formData.password || formData.password !== formData.confirmPassword}
          >
            Reset Password
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="" variant="body2" onClick={() => { navigate('/login') }}>
                Back to Sign In
              </Link>
            </Grid>
          </Grid>
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
          password
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Password reset successful
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
        open={openInvalid}
        onClose={handleCloseInvalid}
        aria-labelledby="draggable-dialog-title"
        maxWidth="xs"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        <IconButton style={{ fontSize: 24, marginRight: '5px' }}><LockOpen /></IconButton>
          password
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Invalid or expired password reset token
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInvalid} style={{ backgroundColor: '#3f51b5', opacity: 1, height: 40 }}
            color="primary">
            <p style={{ color: 'white' }}>ok</p>
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openInvalidPassword}
        onClose={handleCloseInvalidPassword}
        aria-labelledby="draggable-dialog-title"
        maxWidth="xs"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          <IconButton style={{ fontSize: 24, marginRight: '5px' }}><Lock /></IconButton>
          Password
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInvalidPassword} style={{ backgroundColor: '#3f51b5', opacity: 1, height: 40 }}
            color="primary">
            <p style={{ color: 'white' }}>ok</p>
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );

}
