import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid } from '@mui/material'; // Import Material-UI components
import { Footer, Navbar } from '../Components';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUserNotFound, setOpenUserNotFound] = useState(false);
  const [openIncorrectPassword, setOpenIncorrectPassword] = useState(false);
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pwd }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();

      if (data.message === 'Logged in successfully') {
        localStorage.setItem('username_stitch', data.name);
        localStorage.setItem('userData', JSON.stringify(data));
        history.push('/shop');
      } else if (data.message === 'Email not verified') {
        setOpen(true);
      } else if (data.message === 'User not found') {
        setOpenUserNotFound(true);
      } else if (data.message === 'Incorrect password') {
        setOpenIncorrectPassword(true);
      } else {
        setError('An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      setError(error.message || 'An error occurred. Please try again later.');
    }

    setIsLoading(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseUserNotFound = () => {
    setOpenUserNotFound(false);
  };
  const handleCloseIncorrectPassword = () => {
    setOpenIncorrectPassword(false);
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs" style={{ marginTop: '50px', marginBottom: '200px'}}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={handleChange}
                name="email"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={pwd}
                onChange={handleChange}
                name="password"
                required
              />
            </Grid>
          </Grid>
          {error && <Typography color="error">{error}</Typography>}
          <div style={{ marginTop: '20px' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>
        <div className="my-3">
          <Typography>
            New Here?{' '}
            <Link to="/register" className="text-decoration-underline text-info">
              Register
            </Link>
          </Typography>
        </div>
        {isLoading && <progress style={{ width: '100%', marginTop: '20px' }} />}
      </Container>
      <Footer />
      {open && (
        <div className="modal">
          <div className="modal-content">
            <Typography variant="h6">Email not verified</Typography>
            <Typography>Please check your email to verify your account.</Typography>
            <Button onClick={handleClose} color="primary">Ok</Button>
          </div>
        </div>
      )}
      {openUserNotFound && (
        <div className="modal">
          <div className="modal-content">
            <Typography variant="h6">User not found</Typography>
            <Typography>Please check again while typing your email account</Typography>
            <Button onClick={handleCloseUserNotFound} color="primary">Ok</Button>
          </div>
        </div>
      )}
      {openIncorrectPassword && (
        <div className="modal">
          <div className="modal-content">
            <Typography variant="h6">Incorrect password</Typography>
            <Typography>Please check again while typing your password</Typography>
            <Button onClick={handleCloseIncorrectPassword} color="primary">Ok</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
