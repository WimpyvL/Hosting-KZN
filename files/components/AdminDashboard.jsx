import React from 'react';
import { Typography, Container, Box, Grid, Card, CardContent } from '@mui/material';

export default function AdminDashboard() {
  return (
    <Container>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>

        {/* Overview of Application Performance */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Total Users
                </Typography>
                <Typography variant="h4">100</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Active Agents
                </Typography>
                <Typography variant="h4">75</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Total Commissions
                </Typography>
                <Typography variant="h4">$10,000</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Data Visualization Section */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Performance Metrics
          </Typography>
          {/* Placeholder for charts/graphs */}
          <Typography variant="body1">
            [Insert charts or graphs here to visualize data trends]
          </Typography>
        </Box>

        {/* User Management Quick Access */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            User Management
          </Typography>
          <Typography variant="body1">
            [Links to manage users, view activity, etc.]
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
