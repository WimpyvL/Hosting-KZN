import React from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';

export default function Reports() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Generate Reports
      </Typography>
      <TextField
        label="Start Date"
        type="date"
        defaultValue="2024-01-01"
        sx={{ mr: 2, width: '45%' }}
      />
      <TextField
        label="End Date"
        type="date"
        defaultValue="2024-12-31"
        sx={{ width: '45%' }}
      />
      <Box sx={{ mt: 2, '& button': { m: 1 } }}>
        <Button
          variant="contained"
          onClick={() => {
            // Implement generate sales report logic here
            console.log('Generate Sales Report');
          }}
        >
          Generate Sales Report
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            // Implement generate commission report logic here
            console.log('Generate Commission Report');
          }}
        >
          Generate Commission Report
        </Button>
      </Box>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Report Preview
      </Typography>
      <Box sx={{ border: '1px solid #ccc', p: 2, mt: 1 }}>
        {/* Placeholder for report preview */}
        <Typography variant="body2">
          Report preview will be displayed here.
        </Typography>
      </Box>
    </Box>
  );
}
