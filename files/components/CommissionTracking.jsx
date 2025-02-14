import React from 'react';
import { Typography, Container, Box, List, ListItem, ListItemText } from '@mui/material';

export default function CommissionTracking() {
  // Dummy data for commission tracking
  const commissions = [
    { id: 1, sale: 'Sale 1', commission: 100, status: 'Pending' },
    { id: 2, sale: 'Sale 2', commission: 150, status: 'Completed' },
  ];

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
          Commission Tracking
        </Typography>

        {/* List of commissions */}
        <List>
          {commissions.map(commission => (
            <ListItem key={commission.id}>
              <ListItemText
                primary={`Sale: ${commission.sale}`}
                secondary={`Commission: $${commission.commission} - Status: ${commission.status}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
