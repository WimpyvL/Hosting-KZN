import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography variant="h6">
          Agent Referral App
        </Typography>
      </Toolbar>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        {currentUser ? (
          <>
            {currentUser.email === 'admin@loop69.co.za' && (
              <ListItem
                button
                component={Link}
                to="/admin-dashboard"
              >
                <ListItemText primary="Admin Dashboard" />
              </ListItem>
            )}
            <ListItem
              button
              component={Link}
              to="/agent-dashboard"
            >
              <ListItemText primary="Agent Dashboard" />
            </ListItem>
             <ListItem
              button
              component={Link}
              to="/client-dashboard"
            >
              <ListItemText primary="Client Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/update-profile">
              <ListItemText primary="Update Profile" />
            </ListItem>
            <ListItem button onClick={async () => {
              try {
                await logout();
              } catch (error) {
                console.error("Logout failed:", error);
              }
            }}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemText primary="Register" />
            </ListItem>
             <ListItem button component={Link} to="/admin-register">
              <ListItemText primary="Admin Register" />
            </ListItem>
            <ListItem button component={Link} to="/admin-login">
              <ListItemText primary="Admin Login" />
            </ListItem>
            <ListItem button component={Link} to="/client-register">
              <ListItemText primary="Client Sign Up" />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
}
