import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Snackbar,
  Alert,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import supabase from '../config/supabaseClient';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const SubscriptionPage: React.FC = () => {
  const { session, userId, loading: authLoading } = useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'success' | 'error' | 'info'>(
    'info'
  );
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!session) {
        setMessage('Please log in to access this page.');
        setSeverity('error');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        fetchSubscription();
      }
    }
  }, [session, navigate, authLoading]);

  const fetchSubscription = async () => {
    if (!userId) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    setLoading(false);

    if (error) {
      //   console.error('Error fetching subscription:', error);
      setIsSubscribed(false);
    } else if (data) {
      setEmail(data.email || '');
      setPhoneNumber(data.phone_number || '');
      setIsSubscribed(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);
    let operation;
    if (isSubscribed) {
      operation = supabase
        .from('subscriptions')
        .update({ email, phone_number: phoneNumber })
        .eq('user_id', userId);
    } else {
      operation = supabase
        .from('subscriptions')
        .insert([{ user_id: userId, email, phone_number: phoneNumber }]);
    }

    const { error } = await operation;
    setLoading(false);

    if (error) {
      setMessage('Error updating subscription: ' + error.message);
      setSeverity('error');
    } else {
      setMessage(
        isSubscribed
          ? 'Subscription updated successfully!'
          : 'Subscribed successfully!'
      );
      setSeverity('success');
      setIsSubscribed(true);
    }
  };

  const handleDelete = async () => {
    if (!userId || !isSubscribed) return;

    setLoading(true);
    const { error } = await supabase
      .from('subscriptions')
      .delete()
      .eq('user_id', userId);

    setLoading(false);

    if (error) {
      setMessage('Error deleting subscription: ' + error.message);
      setSeverity('error');
    } else {
      setMessage('Subscription deleted successfully!');
      setSeverity('success');
      setIsSubscribed(false);
      setEmail('');
      setPhoneNumber('');
    }
  };

  if (!session) {
    return null; // The useEffect will handle the redirection
  }

  const subscriptionBenefits = [
    'Early access to new internship listings',
    'Instant notifications on new job postings',
    // 'Personalized job recommendations',
    // 'Monthly newsletter with career tips',
    // 'Exclusive webinars with industry experts',
  ];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              color="primary"
            >
              {isSubscribed
                ? 'Manage Your Subscription'
                : 'Subscribe to Internly'}
            </Typography>
            <Typography variant="body1" paragraph>
              {isSubscribed
                ? 'Thank you for being a subscriber! Manage your subscription details below.'
                : 'Join our community of aspiring interns and stay ahead in your career journey!'}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 3 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                id="phoneNumber"
                autoComplete="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                InputProps={{
                  startAdornment: <PhoneIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading
                  ? 'Processing...'
                  : isSubscribed
                  ? 'Update Subscription'
                  : 'Subscribe Now'}
              </Button>
              {isSubscribed && (
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={handleDelete}
                  disabled={loading}
                  sx={{ mt: 1 }}
                >
                  Cancel Subscription
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              color="secondary"
            >
              Subscription Benefits
            </Typography>
            <List>
              {subscriptionBenefits.map((benefit, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={benefit} />
                </ListItem>
              ))}
            </List>
            <Box flexGrow={1} />
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Subscription Status:
              </Typography>
              <Chip
                label={isSubscribed ? 'Active' : 'Not Subscribed'}
                color={isSubscribed ? 'success' : 'default'}
                sx={{ fontWeight: 'bold' }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={() => setMessage('')}
      >
        <Alert
          onClose={() => setMessage('')}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SubscriptionPage;
