import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material'; // Import Material-UI components
import { Footer, Navbar } from "../Components";
import mens from "../Components/mens.jpg";
import women from "../Components/women.jpeg";
import './AboutPage.css';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <Container className="my-3 py-3">
        <Typography variant="h4" align="center" gutterBottom>
          About Us
        </Typography>
        <hr />
        <Typography variant="body1" className="lead about-us-text">
          At Stitch Switch, we specialize in crafting high-quality embroidered clothing for both men and women. With meticulous attention to detail, we bring your designs to life on hoodies, shirts, and more. Our passion lies in creating unique pieces that reflect your individual style. Whether you're looking for a standout piece to elevate your wardrobe or seeking the perfect canvas for your brand's logo, we've got you covered. Our custom embroidery service allows you to add a personal touch to your apparel, making each piece truly one-of-a-kind. At Stitch Switch, we understand the importance of quality, creativity, and attention to detail. Let us help you make a statement with our expert embroidery services. Explore the possibilities and express yourself with confidence.
        </Typography>

        <Typography variant="h5" align="center" gutterBottom className="py-4">Our Products</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card className="h-100">
              <CardMedia
                component="img"
                image={mens}
                alt="Men's Clothing"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  Men's Clothing
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className="h-100">
              <CardMedia
                component="img"
                image={women}
                alt="Women's Clothing"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  Women's Clothing
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default AboutPage;
