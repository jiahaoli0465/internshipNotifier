import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  Rating,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Carousel from "react-material-ui-carousel"; // Import a carousel library

const testimonials = [
  {
    name: "Emily S.",
    position: "Software Engineer Intern",
    company: "Google",
    text: "I landed a top internship at Google thanks to the instant alerts. The early notification gave me the edge I needed.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "David K.",
    position: "Data Analyst Intern",
    company: "Microsoft",
    text: "This service is a game-changer. I received notifications for several amazing internships and got multiple offers!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Sarah T.",
    position: "Product Manager Intern",
    company: "Amazon",
    text: "Highly recommend for any CS student. It streamlined my search and led me to an internship that aligns perfectly with my career goals.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const companyLogos = [
  "https://logo.clearbit.com/google.com",
  "https://logo.clearbit.com/microsoft.com",
  "https://logo.clearbit.com/amazon.com",
  // Add more company logos as needed
];

export const Section2: React.FC = () => {
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
          Success Stories from Our Users
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index} sx={{ textAlign: "center" }}>
              <Paper
                sx={{
                  padding: "20px",
                  backgroundColor: theme.palette.background.default,
                }}
              >
                <Avatar
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  sx={{ width: 56, height: 56, margin: "0 auto" }}
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
                  {testimonial.name}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {testimonial.position} at {testimonial.company}
                </Typography>
                <Rating
                  value={testimonial.rating}
                  readOnly
                  sx={{ marginTop: "10px" }}
                />
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    color: theme.palette.text.secondary,
                    marginTop: "10px",
                  }}
                >
                  "{testimonial.text}"
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center", marginTop: "40px" }}>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: "medium",
              marginBottom: "20px",
            }}
          >
            Trusted by Interns at Top Companies
          </Typography>
          <Carousel
            autoPlay={true}
            interval={3000}
            animation="slide"
            indicators={false}
          >
            <Grid container spacing={2} justifyContent="center">
              {companyLogos.map((logo, index) => (
                <Grid item key={index}>
                  <img
                    src={logo}
                    alt={`Company logo ${index}`}
                    style={{ height: 50, margin: "0 10px" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Carousel>
        </Box>
      </Container>
    </Box>
  );
};
