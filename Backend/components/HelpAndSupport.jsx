import React from 'react';
import { Typography, Container, Box } from '@mui/material';

export default function HelpAndSupport() {
  return (
    <Container>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Help and Support
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          Frequently Asked Questions (FAQs)
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Q: How do I reset my password?</strong><br />
          A: You can reset your password by clicking on the "Forgot Password?" link on the login page.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Q: How do I contact support?</strong><br />
          A: You can reach out to our support team at support@example.com.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Q: Where can I find the terms of service?</strong><br />
          A: The terms of service can be found at the bottom of the page or in the footer links.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          Contact Information
        </Typography>
        <Typography variant="body1" paragraph>
          For further assistance, please contact us at: <a href="mailto:support@example.com">support@example.com</a>
        </Typography>
      </Box>
    </Container>
  );
}
