import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import HelpIcon from "@mui/icons-material/Help";
import BookIcon from "@mui/icons-material/Book";
import ArticleIcon from "@mui/icons-material/Article";

export const Section5: React.FC = () => {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        padding: "60px 20px",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            color: theme.palette.text.primary,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Get in Touch
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: "30px", boxShadow: 3, borderRadius: "15px" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: theme.palette.text.primary }}
              >
                Contact Form
              </Typography>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Subject"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: "20px",
                    borderRadius: "20px",
                    textTransform: "none",
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: "30px",
                boxShadow: 3,
                borderRadius: "15px",
                marginBottom: "20px",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: theme.palette.text.primary }}
              >
                Contact Information
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <EmailIcon
                  sx={{
                    marginRight: "10px",
                    color: theme.palette.primary.main,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  internly-support@gmail.com
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              ></Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: theme.palette.text.primary, marginTop: "20px" }}
              >
                Follow Us
              </Typography>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <IconButton
                  color="primary"
                  href="https://www.linkedin.com"
                  target="_blank"
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  href="https://www.twitter.com"
                  target="_blank"
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  href="https://www.facebook.com"
                  target="_blank"
                >
                  <FacebookIcon />
                </IconButton>
              </Box>
            </Paper>
            <Paper sx={{ padding: "30px", boxShadow: 3, borderRadius: "15px" }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: theme.palette.text.primary }}
              >
                Additional Resources
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Link
                  component="button"
                  onClick={handleSnackbarOpen}
                  underline="none"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: theme.palette.text.secondary,
                  }}
                >
                  <ArticleIcon
                    sx={{
                      marginRight: "10px",
                      color: theme.palette.primary.main,
                    }}
                  />
                  Blog
                </Link>
                <Link
                  component="button"
                  onClick={handleSnackbarOpen}
                  underline="none"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: theme.palette.text.secondary,
                  }}
                >
                  <HelpIcon
                    sx={{
                      marginRight: "10px",
                      color: theme.palette.primary.main,
                    }}
                  />
                  Help Center
                </Link>
                <Link
                  component="button"
                  onClick={handleSnackbarOpen}
                  underline="none"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: theme.palette.text.secondary,
                  }}
                >
                  <BookIcon
                    sx={{
                      marginRight: "10px",
                      color: theme.palette.primary.main,
                    }}
                  />
                  Documentation
                </Link>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }} // Set position to top right
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="info"
            sx={{
              width: "100%",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "& .MuiAlert-icon": {
                color: theme.palette.primary.contrastText, // Set icon color to white
              },
            }}
          >
            Coming Soon
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};
