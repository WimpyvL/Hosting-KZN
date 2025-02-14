import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

export default function SalesList({ sales }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy sales data (if sales prop is not provided)
  const dummySales = [
    { id: 1, agent: 'agent1@example.com', amount: 100, status: 'Pending', date: '2024-01-01' },
    { id: 2, agent: 'agent2@example.com', amount: 150, status: 'Approved', date: '2024-02-15' },
  ];

  // Use sales prop if available, otherwise use dummy data
  const salesData = sales || dummySales;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSales = salesData.filter(sale =>
    sale.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.amount.toString().includes(searchTerm) ||
    sale.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search Input */}
      <TextField
        label="Search Sales"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2, width: '100%' }}
      />

      <List>
        {filteredSales.map(sale => (
          <ListItem key={sale.id}>
            <ListItemText
              primary={`Sale Amount: $${sale.amount}`}
              secondary={`Agent: ${sale.agent} - Status: ${sale.status} - Date: ${sale.date}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="approve"
                onClick={() => {
                  // Implement approve payout logic here
                  console.log(`Approve payout for sale: ${sale.id}`);
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="reject"
                onClick={() => {
                  // Implement reject payout logic here
                  console.log(`Reject payout for sale: ${sale.id}`);
                }}
              >
                <CloseIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
