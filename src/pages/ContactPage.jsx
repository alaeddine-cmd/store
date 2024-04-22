import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material'; // Import Material-UI components
import { Footer, Navbar } from "../Components";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <Container className="my-3 py-3">
        <Typography variant="h4" align="center">Contact Us</Typography>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div className="form my-3">
                <TextField
                  label="Name"
                  variant="outlined"
                  placeholder="Enter your name"
                  fullWidth
                />
              </div>
              <div className="form my-3">
                <TextField
                  label="Email"
                  variant="outlined"
                  placeholder="name@example.com"
                  fullWidth
                />
              </div>
              <div className="form my-3">
                <TextField
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={5}
                  placeholder="Enter your message"
                  fullWidth
                />
              </div>
              <div className="text-center">
                <Button
                  variant="contained"
                  color="primary"
                  className="my-2 px-4 mx-auto"
                  disabled
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default ContactPage;
