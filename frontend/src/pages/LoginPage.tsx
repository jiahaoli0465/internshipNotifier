import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
  Divider,
} from '@mui/material';
// import GoogleIcon from '@mui/icons-material/Google';
import supabase from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      // Redirect or update state on successful login
      navigate('/');
      alert('Login successful!');
    }
  };

  // const handleGoogleSignIn = async () => {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //     options: {
  //       redirectTo: `${window.location.origin}/auth/callback`,
  //     },
  //   });
  //   if (error) {
  //     alert('Error signing in with Google: ' + error.message);
  //   }
  // };

  return (
    <Container maxWidth="xs" sx={{ height: '70vh' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Divider sx={{ my: 2 }}>or</Divider>
          {/* <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            sx={{ mb: 2 }}
          >
            Sign in with Google
          </Button> */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
            {/* <Link href="/forgot-password" variant="body2">
              {'Forgot password?'}
            </Link> */}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
