import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "How do I sign up?",
    answer:
      "Signing up is easy! Just click on the 'Get Started' button and fill out the registration form. You'll start receiving notifications immediately.",
  },
  {
    question: "What types of internships do you list?",
    answer:
      "We list a variety of software engineering internships from top companies across different industries.",
  },
  {
    question: "Can I customize the notifications?",
    answer:
      "Yes, you can customize your notifications to include specific roles, locations, and companies that you're interested in.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Currently, we do not offer a free trial. However, you can choose a plan that fits your needs and budget.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription at any time. Just send us an email at internly-support@gmail.com",
  },
];

export const Section4: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Divider variant="middle" sx={{ mb: 2 }} />
      </Box>
      {faqs.map((faq, index) => (
        <Paper
          key={index}
          elevation={1}
          sx={{
            mb: 2,
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: theme.palette.grey[100],
          }}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                paddingBlock: 0.5,
                paddingInline: 2,
              }}
            >
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: isMobile ? "1rem" : "1.1rem",
                }}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Paper>
      ))}
    </Container>
  );
};
