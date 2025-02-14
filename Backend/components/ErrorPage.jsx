import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <Container>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          The page you are looking for does not exist. It might have been removed or the URL might be incorrect.
        </Typography>
        <Typography variant="body1" paragraph>
          You can go back to the <Link to="/">Home Page</Link> or use the search bar to find what you need.
        </Typography>
      </Box>
    </Container>
  );
}
