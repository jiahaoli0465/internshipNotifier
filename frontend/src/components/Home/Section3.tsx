import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BackgroundGradient } from "../../components/aceternity/BackgroundGradient";

interface PricingOption {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  disabled?: boolean;
}

const pricingOptions: PricingOption[] = [
  {
    title: "Basic",
    price: "$4.99/week",
    description: "Perfect for students starting their internship search",
    features: [
      "Daily email notifications",
      "Full Access to all internship listings",
    ],
    buttonText: "Choose Basic",
  },
  {
    title: "Pro",
    price: "$19.99/month",
    description: "Ideal for serious applicants aiming for top-tier internships",
    features: [
      "Instant text & email notifications",
      "Full Access to all internship listings",
      "Resume review and optimization (10/month)",
    ],
    buttonText: "Coming Soon",
    disabled: true,
  },
  {
    title: "Premium Lite",
    price: "$49.99",
    description: "One-time payment for a lifetime of internship opportunities",
    features: [
      "Instant text & email notifications",
      "Full Access to all internship listings",
    ],
    buttonText: "Choose Premium Lite",
  },
  {
    title: "Premium Pro",
    price: "$69.99",
    description:
      "One-time payment for serious applicants aiming for top-tier internships",
    features: [
      "Instant text & email notifications",
      "Full Access to all internship listings",
      "Resume review and optimization (10/month)",
    ],
    buttonText: "Coming Soon",
    disabled: true,
  },
];

export const Section3: React.FC = () => {
  const theme = useTheme();

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
          Choose Your Plan
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {pricingOptions.map((option) => (
            <Grid item key={option.title} xs={12} md={6}>
              {option.title.includes("Pro") ? (
                <BackgroundGradient animate={true}>
                  <Paper
                    elevation={3}
                    sx={{
                      borderRadius: "22px",
                      p: 3,
                      textAlign: "center",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      "&:hover": {
                        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Box>
                      <Typography variant="h4" color="primary" gutterBottom>
                        {option.title}
                      </Typography>
                      <Typography variant="h3" color="textPrimary" gutterBottom>
                        {option.price}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        paragraph
                      >
                        {option.description}
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <List>
                        {option.features.map((feature) => (
                          <ListItem key={feature} disableGutters>
                            <ListItemText primary={feature} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ mt: 3 }}
                      disabled={option.disabled}
                    >
                      {option.buttonText}
                    </Button>
                  </Paper>
                </BackgroundGradient>
              ) : (
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: "22px",
                    p: 3,
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    "&:hover": {
                      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box>
                    <Typography variant="h4" color="primary" gutterBottom>
                      {option.title}
                    </Typography>
                    <Typography variant="h3" color="textPrimary" gutterBottom>
                      {option.price}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      paragraph
                    >
                      {option.description}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <List>
                      {option.features.map((feature) => (
                        <ListItem key={feature} disableGutters>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    sx={{ mt: 3 }}
                    disabled={option.disabled}
                  >
                    {option.buttonText}
                  </Button>
                </Paper>
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
