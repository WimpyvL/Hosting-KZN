import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  Typography,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

export default function AgentDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [referredClients, setReferredClients] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [pendingCommissions, setPendingCommissions] = useState(0);

  useEffect(() => {
    const fetchReferredClients = async () => {
      if (currentUser) {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', currentUser.email));

        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const referralCode = userData.referralCode;

            const clientsRef = collection(db, 'clients');
            const clientsQuery = query(clientsRef, where('referredBy', '==', referralCode));
            const clientsSnapshot = await getDocs(clientsQuery);

            const clientsList = clientsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setReferredClients(clientsList);
          }
        } catch (error) {
          console.error('Error fetching referred clients:', error);
        }
      }
    };

    fetchReferredClients();
  }, [currentUser]);

  return (
    <Container>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Agent Dashboard
        </Typography>

        {/* Key Metrics */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Total Earnings
                </Typography>
                <Typography variant="h4">${totalEarnings}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Pending Commissions
                </Typography>
                <Typography variant="h4">${pendingCommissions}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Referred Clients
                </Typography>
                <Typography variant="h4">{referredClients.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Referred Clients List */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Referred Clients
          </Typography>
          <List>
            {referredClients.map((client) => (
              <ListItem key={client.id}>
                <ListItemText
                  primary={client.name}
                  secondary={client.email}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
}
