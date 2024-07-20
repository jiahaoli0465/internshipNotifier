import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export const Section1: React.FC = () => {
  const theme = useTheme();
  const Navigate = useNavigate();

  return (
    <Paper
      sx={{
        padding: "60px 20px",
        backgroundColor: theme.palette.background.paper,
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
          Why Early Applications Matter
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <AccessTimeIcon
              sx={{ fontSize: 60, color: theme.palette.primary.main }}
            />
            <Typography
              variant="h6"
              component="p"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: "medium",
                marginTop: "10px",
              }}
            >
              Instant Alerts
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: theme.palette.text.secondary }}
            >
              Get notified the moment new internships are posted.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <NotificationsActiveIcon
              sx={{ fontSize: 60, color: theme.palette.primary.main }}
            />
            <Typography
              variant="h6"
              component="p"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: "medium",
                marginTop: "10px",
              }}
            >
              Be the First
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: theme.palette.text.secondary }}
            >
              Apply early and increase your chances of getting noticed.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <ThumbUpIcon
              sx={{ fontSize: 60, color: theme.palette.primary.main }}
            />
            <Typography
              variant="h6"
              component="p"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: "medium",
                marginTop: "10px",
              }}
            >
              Stand Out
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: theme.palette.text.secondary }}
            >
              Early applications have a higher success rate.
            </Typography>
          </Grid>
        </Grid>

        <Divider
          sx={{ marginY: "40px", backgroundColor: theme.palette.divider }}
        />

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              component="p"
              sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
            >
              98%
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: theme.palette.text.secondary }}
            >
              Faster Application Time
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              component="p"
              sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
            >
              60%
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: theme.palette.text.secondary }}
            >
              Higher Response Rate
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              component="p"
              sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
            >
              500+
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: theme.palette.text.secondary }}
            >
              Top Companies Included & 500+ anticipated.
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", marginTop: "40px" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              padding: "10px 20px",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            onClick={() => {
              Navigate("/pricing");
              window.scrollTo(0, 0);
            }}
          >
            Get Instant Access Now
          </Button>
        </Box>
      </Container>
    </Paper>
  );
};
