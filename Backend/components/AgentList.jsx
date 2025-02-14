import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Switch,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

export default function AgentList({ agents }) {
  return (
    <List>
      {agents.map(agent => (
        <ListItem key={agent.id}>
          <ListItemText
            primary={agent.email}
            secondary={`Referral Code: ${agent.referralCode}`}
          />
          <ListItemSecondaryAction>
            <Tooltip title="View Details">
              <IconButton edge="end" aria-label="view">
                <VisibilityIcon onClick={() => {
                  // Implement view agent details logic here
                  console.log(`View details for agent: ${agent.email}`);
                }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Agent">
              <IconButton edge="end" aria-label="edit">
                <EditIcon onClick={() => {
                  // Implement edit agent logic here
                  console.log(`Edit agent: ${agent.email}`);
                }} />
              </IconButton>
            </Tooltip>
             <Tooltip title="Toggle Admin">
              <Switch
                edge="end"
                onChange={() => {
                  // Implement agent activation/deactivation logic here
                  console.log(`Toggle admin for agent: ${agent.email}`);
                }}
                checked={agent.isAdmin} // Replace with actual agent status
              />
            </Tooltip>
            <Tooltip title="Toggle Activation">
              <Switch
                edge="end"
                onChange={() => {
                  // Implement agent activation/deactivation logic here
                  console.log(`Toggle activation for agent: ${agent.email}`);
                }}
                checked={agent.isActive} // Replace with actual agent status
              />
            </Tooltip>
            <Tooltip title="Delete Agent">
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  // Implement agent deletion logic here
                  console.log(`Delete agent: ${agent.email}`);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}
