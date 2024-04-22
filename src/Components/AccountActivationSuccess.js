import React from 'react';
import './AccountActivationSuccess.css'; // Import your custom CSS file

function AccountActivationSuccess() {
  return (
    <div className="container">
      <div className="paper">
        <div className="avatar">
          <img src="/assets/logo_2.png" alt="lock icon" />
        </div>
        <h1 className="title">Account Activation Successful!</h1>
        <p className="body-text">Congratulations! Your account has been successfully activated.</p>
      </div>
    </div>
  );
}

export default AccountActivationSuccess;
