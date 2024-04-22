import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import { Footer, Navbar } from '../Components';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook to navigate programmatically

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, pwd: password }),
      });

      if (response.ok) {
        setSuccess(true);
        setError(null);

        setTimeout(() => {
          navigate('/login'); // Navigate to the login page after successful registration
        }, 2000);
      } else {
        const errorData = await response.json();

        if (errorData.message === 'Email already exists') {
          setError('Email already exists');
          setSuccess(false);
        } else if (errorData.message === 'Password must contain at least one lowercase letter, one uppercase letter, and one number') {
          setError('Password must contain at least one lowercase letter, one uppercase letter, and one number');
          setSuccess(false);
        } else {
          setError('Registration failed. Please try again.');
          setSuccess(false);
        }
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError('An error occurred. Please try again later.');
      setSuccess(false);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs" style={{ marginTop: '50px', marginBottom: '200px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success">Registration successful!</Typography>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            style={{ marginTop: '20px' }}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
          <Grid item>
            <Typography variant="body2">
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Grid>
        </Grid>
        {isLoading && <progress style={{ width: '100%', marginTop: '20px' }} />}
      </Container>
      <Footer />
    </>
  );
};

export default Register;
