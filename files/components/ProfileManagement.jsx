import React, { useState } from 'react';
import { Typography, Container, Box, TextField, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileManagement() {
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateEmail(email);
      alert("Email updated successfully!");
    } catch (error) {
      console.error('Failed to update email:', error);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }
    try {
      await updatePassword(password);
      alert("Password updated successfully!");
    } catch (error) {
      console.error('Failed to update password:', error);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile Management
        </Typography>

        {/* Email Update Section */}
        <form onSubmit={handleEmailUpdate}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Email
          </Button>
        </form>

        {/* Password Update Section */}
        <form onSubmit={handlePasswordUpdate} style={{ marginTop: '20px' }}>
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Password
          </Button>
        </form>
      </Box>
    </Container>
  );
}
