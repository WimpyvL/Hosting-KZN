import React from 'react';
import { Typography, Container, Box } from '@mui/material';

export default function ClientDashboard() {
  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Client Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to your dashboard!
        </Typography>
        {/* Add more client-specific information here */}
      </Box>
    </Container>
  );
}
