import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { BackgroundGradient } from "../components/aceternity/BackgroundGradient";

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
    price: "$9.99/month",
    description: "Perfect for students starting their internship search",
    features: [
      "Daily email notifications",
      "Access to 100+ internship listings",
      "Basic company information",
    ],
    buttonText: "Choose Basic",
  },
  {
    title: "Pro",
    price: "$19.99/month",
    description: "Ideal for serious applicants aiming for top-tier internships",
    features: [
      "Instant text & email notifications",
      "Access to 500+ exclusive internship listings",
      "Detailed company profiles and application tips",
      "Resume review and optimization",
    ],
    buttonText: "Coming Soon",
    disabled: true,
  },
];

const Pricing: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h2" gutterBottom>
          Find Your Perfect Plan
        </Typography>
        <Typography variant="h5" color="textSecondary">
          Stay ahead in your internship search with our tailored plans
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {pricingOptions.map((option) => (
          <Grid item key={option.title} xs={12} sm={6}>
            {option.title === "Pro" ? (
              <BackgroundGradient animate={true}>
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: "22px",
                    p: 3,
                    textAlign: "center",
                    height: "536px",
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
                    variant={option.title === "Pro" ? "contained" : "outlined"}
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
                  height: "540px",
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
                  variant={option.title === "Pro" ? "contained" : "outlined"}
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
  );
};

export default Pricing;
