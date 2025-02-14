import React from 'react';
import { Typography, Container, Box } from '@mui/material';

export default function HomePage() {
  return (
    <Container>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Agent Referral Application
        </Typography>
        <Typography variant="body1" paragraph>
          This application is designed to manage agents, clients, sales, and commissions in a referral-based system.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Testimonials
        </Typography>
        <Typography variant="body1" paragraph>
          "This app has transformed the way I manage my referrals!" - Happy Agent
        </Typography>
        <Typography variant="body1" paragraph>
          "A must-have tool for any agent!" - Satisfied Client
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Quick Links
        </Typography>
        <Typography variant="body1" paragraph>
          - <a href="/register">Register</a>
          - <a href="/login">Login</a>
          - <a href="/agent-dashboard">Agent Dashboard</a>
          - <a href="/admin-dashboard">Admin Dashboard</a>
        </Typography>
      </Box>
    </Container>
  );
}
