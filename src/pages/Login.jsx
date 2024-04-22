import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer, Navbar } from '../components';

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
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="form-control"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-3">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={pwd}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="my-3">
                <p>
                  New Here?{' '}
                  <Link to="/register" className="text-decoration-underline text-info">
                    Register
                  </Link>{' '}
                </p>
                {isLoading && <progress style={{ width: '100%' }} />}
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      {open && (
        <div className="modal">
          <div className="modal-content">
            <h2>Email not verified</h2>
            <p>Please check your email to verify your account.</p>
            <button onClick={handleClose} className="btn btn-primary">Ok</button>
          </div>
        </div>
      )}

      {openUserNotFound && (
        <div className="modal">
          <div className="modal-content">
            <h2>User not found</h2>
            <p>Please check again while typing your email account</p>
            <button onClick={handleCloseUserNotFound} className="btn btn-primary">Ok</button>
          </div>
        </div>
      )}

      {openIncorrectPassword && (
        <div className="modal">
          <div className="modal-content">
            <h2>Incorrect password</h2>
            <p>Please check again while typing your password</p>
            <button onClick={handleCloseIncorrectPassword} className="btn btn-primary">Ok</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
