import React, { useState } from 'react';
import { Footer, Navbar } from '../components';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

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
          history.push('/login');
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
      <div className={`container my-3 py-3`}>
        <h1 className="text-center">Register</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form my-3">
                <label htmlFor="Name">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="Email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">Registration successful!</div>}
              <div className="my-3">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="text-decoration-underline text-info">
                    Login
                  </Link>{' '}
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Register
                </button>
              </div>
              {isLoading && <div style={{ marginTop: '10px' }}>
                <progress style={{ width: '100%' }} />
              </div>}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
