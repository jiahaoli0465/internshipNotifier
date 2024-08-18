import React, { useState } from 'react';
import {
  Outlet,
  Link as RouterLink,
  useNavigate,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Link as MuiLink,
  Stack,
  ButtonProps,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../hooks/useAuth';
import supabase from '../config/supabaseClient';

// Custom component to combine MUI Link and React Router Link
const NavLink = React.forwardRef<
  HTMLAnchorElement,
  RouterLinkProps & { children: React.ReactNode }
>((props, ref) => <MuiLink component={RouterLink} ref={ref} {...props} />);

// Custom component to combine MUI Button and React Router Link
const LinkButton = React.forwardRef<
  HTMLAnchorElement,
  ButtonProps & RouterLinkProps & { to: string; children: React.ReactNode }
>((props, ref) => <Button component={RouterLink} ref={ref} {...props} />);

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#fbf5f1',
  boxShadow: 'none',
  padding: theme.spacing(2, 0),
}));

const Logo = styled(Typography)<{ component?: React.ElementType }>(
  ({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '2rem',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.text.primary,
    cursor: 'pointer',
  })
);

const LogoSpan = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  margin: theme.spacing(0, 2),
  fontSize: '1rem',
  fontFamily: 'Poppins, sans-serif',
  '&:hover': {
    color: theme.palette.error.main,
    textDecoration: 'underline',
  },
}));

const AuthLink = styled(LinkButton)(({ theme }) => ({
  color: theme.palette.error.main,
  padding: theme.spacing(1, 3),
  borderRadius: 25,
  textDecoration: 'none',
  fontSize: '1rem',
  fontFamily: 'Poppins, sans-serif',
  textTransform: 'none',
}));

const SignUpButton = styled(LinkButton)<{ to: string }>(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1, 3),
  borderRadius: 25,
  fontSize: '1rem',
  textTransform: 'none',
  fontFamily: 'Poppins, sans-serif',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { session } = useAuth(); // Use the useAuth hook to get the session

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    alert('Logging out');
    await supabase.auth.signOut();
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Job Listings', path: '/listings' },
  ];

  const AuthButtons = () => (
    <>
      {session ? (
        <SignUpButton onClick={handleLogout} variant="contained" to={'#'}>
          Logout
        </SignUpButton>
      ) : (
        <>
          <AuthLink to="/login">Login</AuthLink>
          <SignUpButton to="/signup" variant="contained">
            Sign Up
          </SignUpButton>
        </>
      )}
    </>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', p: 2 }}>
      <Typography
        variant="h6"
        sx={{
          my: 2,
          '&:hover': {
            cursor: 'pointer',
          },
        }}
        onClick={() => navigate('/')}
      >
        Intern<span style={{ color: theme.palette.error.main }}>ly</span>
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <StyledNavLink
              to={item.path}
              style={{ width: '100%', textAlign: 'center', padding: '8px 0' }}
            >
              <ListItemText primary={item.name} />
            </StyledNavLink>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ justifyContent: 'center', mt: 2 }}>
          {session ? (
            <SignUpButton
              onClick={handleLogout}
              variant="contained"
              sx={{ width: '80%', justifyContent: 'center' }}
              to={'#'}
            >
              Logout
            </SignUpButton>
          ) : (
            <>
              <AuthLink
                to="/login"
                sx={{ width: '80%', justifyContent: 'center' }}
              >
                Login
              </AuthLink>
            </>
          )}
        </ListItem>
        {!session && (
          <ListItem disablePadding sx={{ justifyContent: 'center', mt: 2 }}>
            <SignUpButton
              to="/signup"
              variant="contained"
              sx={{ width: '80%', justifyContent: 'center' }}
            >
              Sign Up
            </SignUpButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: '#FBF5F1', minHeight: '100vh' }}>
      <StyledAppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Logo onClick={() => navigate('/')} component="h1">
              Intern<LogoSpan>ly</LogoSpan>
            </Logo>
            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                sx={{ color: theme.palette.text.primary }}
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Stack direction="row" spacing={2} alignItems="center">
                {navItems.map((item) => (
                  <StyledNavLink key={item.name} to={item.path}>
                    {item.name}
                  </StyledNavLink>
                ))}
                <Box sx={{ flexGrow: 1, width: '50px' }} />
                <AuthButtons />
              </Stack>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
      <footer
        style={{
          backgroundColor: '#FBF5F1',
          padding: '16px',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} Internly. All rights reserved.
        </Typography>
      </footer>
    </Box>
  );
};

export default MainLayout;
