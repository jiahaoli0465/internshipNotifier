import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

interface PricingOption {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
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
    buttonText: "Choose Pro",
  },
];

const Pricing: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Choose Your Plan
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Get notified about the best SWE internship opportunities
      </Typography>
      <Grid container spacing={4} alignItems="flex-end">
        {pricingOptions.map((option) => (
          <Grid item key={option.title} xs={12} sm={6}>
            <Card>
              <CardHeader
                title={option.title}
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                sx={{
                  backgroundColor: theme.palette.grey[200],
                }}
              />
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "baseline", mb: 2 }}>
                  <Typography component="h2" variant="h3" color="textPrimary">
                    {option.price}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" align="center">
                  {option.description}
                </Typography>
                <ul>
                  {option.features.map((feature) => (
                    <Typography component="li" variant="subtitle1" align="left" key={feature}>
                      {feature}
                    </Typography>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <Button fullWidth variant={option.title === "Pro" ? "contained" : "outlined"} color="primary">
                  {option.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Pricing;