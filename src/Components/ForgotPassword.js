import React, { useState } from 'react';
import './ForgotPassword.css'; // Import your custom CSS file
import { useNavigate } from 'react-router-dom'; // Import useHistory for navigation

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openV, setOpenV] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
  });

  const history = useNavigate();

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
    <div className="container">
      <div className="paper">
        <div className="avatar">
          <img src="/assets/logo_2.png" alt="lock icon" style={{ width: '50%', height: '50%' }} />
        </div>
        <h1 className="title">Forgot Password</h1>
        <form className="form" noValidate onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formData.email}
          >
            Send Password Reset Email
          </button>
          <div className="text-right">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => history.push('/login')}
            >
              Back to Sign In
            </button>
          </div>
          {isLoading && (
            <div className="loading-bar">
              <div className="progress" />
            </div>
          )}
        </form>
      </div>
      <div className="modal" style={{ display: open ? 'block' : 'none' }}>
        <div className="modal-content">
          <span className="close" onClick={handleClose}>&times;</span>
          <h2>Email not found</h2>
          <p>Please check again your email.</p>
          <button className="btn btn-primary" onClick={handleClose}>OK</button>
        </div>
      </div>
      <div className="modal" style={{ display: openV ? 'block' : 'none' }}>
        <div className="modal-content">
          <span className="close" onClick={handleCloseV}>&times;</span>
          <h2><Email /> Mail Sent</h2>
          <p>Password reset instructions sent to your email address.</p>
          <button className="btn btn-primary" onClick={handleCloseV}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
