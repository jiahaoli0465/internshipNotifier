import React from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";

// Import your assets
import phoneImage from "../../assets/Phone.svg";
import notifImage from "../../assets/Notif.svg";
import Diamond from "../../assets/Diamond.svg";
import PhoneLine from "../../assets/PhoneLine.svg";
import Vector from "../../assets/Vector.svg";

// Create a custom type for the styled button
type StyledButtonProps = {
  to: string;
} & React.ComponentProps<typeof Button>;

const StyledButton = styled(Button)<StyledButtonProps>(({ theme }) => ({
  borderRadius: 25,
  padding: theme.spacing(1.5, 3),
  fontSize: 16,
  textTransform: "none",
}));

const Hero: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ backgroundColor: "#fbf5f1", py: { xs: 6, md: 12 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 700,
                // fontFamily: "Poppins",
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              Stay Ahead of the Competition
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.125rem",
                // fontFamily: "Inter",
                color: "#40201E",
                lineHeight: 1.75,
                mb: 4,
              }}
            >
              Get notified with real-time notifications of the latest internship
              opportunities, ensuring you never miss a chance to advance your
              career.
            </Typography>
            <StyledButton
              to="/pricing"
              variant="contained"
              color="error"
              size="large"
              LinkComponent={RouterLink}
            >
              Start 14 Day Trial
            </StyledButton>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                textAlign: window.innerWidth < 900 ? "center" : "right",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                  mt: window.innerWidth < 900 ? 5 : 0,
                }}
              >
                <Box
                  component="img"
                  src={phoneImage}
                  alt="Phone"
                  sx={{
                    width: "100%",
                    maxWidth: 300,
                    height: "auto",
                    mb: { xs: 2, md: 0 },
                  }}
                />
                <Box
                  component="img"
                  src={notifImage}
                  alt="Notification"
                  sx={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "80%",
                    maxWidth: 230,
                    height: "auto",
                  }}
                />
                <Box
                  component="img"
                  src={PhoneLine}
                  alt="Phone Line"
                  sx={{
                    position: "absolute",
                    top: "-40px",
                    left: "-30px",
                    width: "50px",
                    height: "auto",
                  }}
                />

                <Box
                  component="img"
                  src={Vector}
                  alt="Vector"
                  sx={{
                    position: "absolute",
                    top: "30%",
                    left: "-50%",
                    width: "50px",
                    height: "auto",
                  }}
                />
                <Box
                  component="img"
                  src={Diamond}
                  alt="Diamond"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: "-50%",
                    width: "50px",
                    height: "auto",
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
