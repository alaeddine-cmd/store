import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory for navigation

function ResetPassword() {
  const [open, setOpen] = useState(false);
  const [openInvalid, setOpenInvalid] = useState(false);
  const [openInvalidPassword, setOpenInvalidPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resetToken = new URLSearchParams(window.location.search).get('token');
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
          setTimeout(() => history.push('/login'), 1000); // Redirect to login page after 1 second
        }
      } else if (response.status === 400) {
        if (data.message === 'Invalid or expired password reset token') {
          setOpenInvalid(true);
        } else if (data.message === 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number') {
          setOpenInvalidPassword(true);
        }
      }
    } catch (error) {
      console.log(error);
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
  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <div className="paper">
        <h1 className="title">Reset Password</h1>
        <form className="form" noValidate onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="New Password"
              name="password"
              value={formData.password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm New Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formData.password || formData.password !== formData.confirmPassword}
          >
            Reset Password
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
        </form>
      </div>
      <div className="modal" style={{ display: open ? 'block' : 'none' }}>
        <div className="modal-content">
          <span className="close" onClick={handleClose}>&times;</span>
          <h2>Password</h2>
          <p>Password reset successful</p>
          <button className="btn btn-primary" onClick={handleClose}>OK</button>
        </div>
      </div>
      <div className="modal" style={{ display: openInvalid ? 'block' : 'none' }}>
        <div className="modal-content">
          <span className="close" onClick={handleCloseInvalid}>&times;</span>
          <h2>Password</h2>
          <p>Invalid or expired password reset token</p>
          <button className="btn btn-primary" onClick={handleCloseInvalid}>OK</button>
        </div>
      </div>
      <div className="modal" style={{ display: openInvalidPassword ? 'block' : 'none' }}>
        <div className="modal-content">
          <span className="close" onClick={handleCloseInvalidPassword}>&times;</span>
          <h2>Password</h2>
          <p>Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number</p>
          <button className="btn btn-primary" onClick={handleCloseInvalidPassword}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
