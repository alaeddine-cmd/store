import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import {
  Button,
  LinearProgress,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openUserNotFound, setOpenUserNotFound] = React.useState(false);
  const [openIncorrectPassword, setOpenIncorrectPassword] = React.useState(false);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      console.log("Submitting form with email:", email);
      console.log("Submitting form with password:", pwd);

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

      console.log("Login response data:", data);

      if (data.message === 'Logged in successfully') {
        localStorage.setItem('username_stitch', data.name);
        localStorage.setItem('userData', JSON.stringify(data));
        navigate('/shop');
      } else if (data.message === 'Email not verified') {
        setOpen(true); // show the dialog
      } else if (data.message === 'User not found') {
        setOpenUserNotFound(true); // show the dialog
      } else if (data.message === 'Incorrect password') {
        setOpenIncorrectPassword(true); // show the dialog
      } else {
        setError("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred. Please try again later.");
    }

    setIsLoading(false);
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
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
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <TextField
                  type="email"
                  name="email"
                  label="Email address"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-3">
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  value={pwd}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link to="/register" className="text-decoration-underline text-info">
                    Register
                  </Link>{" "}
                </p>
                {isLoading && <Box style={{ marginTop: '10px' }}>
                  <LinearProgress />
                </Box>}
              </div>
              <div className="text-center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        maxWidth="xs"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Email not verified
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please check your email to verify your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUserNotFound}
        onClose={handleCloseUserNotFound}
        aria-labelledby="draggable-dialog-title"
        maxWidth="xs"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          User not found
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please check again while typing your email account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserNotFound} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openIncorrectPassword}
        onClose={handleCloseIncorrectPassword}
        aria-labelledby="draggable-dialog-title"
        maxWidth="xs"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Incorrect password
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please check again while typing your password
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseIncorrectPassword} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
