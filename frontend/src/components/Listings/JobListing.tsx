import React from 'react';
import { Paper, Box, Typography, Button, Link, Grid } from '@mui/material';
import { styled } from '@mui/system';

interface JobListingProps {
  company: string;
  role: string;
  location: string;
  link: string | null;
  date_posted: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  borderRadius: theme.spacing(2),
  backgroundColor: '#ffffff',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1)',
  },
}));

const JobListing: React.FC<JobListingProps> = ({ company, role, location, link, date_posted }) => (
  <Grid item xs={12} sm={6} md={4}>
    <StyledPaper elevation={1}>
      <Box>
        <Typography variant="h6" component="div" gutterBottom fontWeight="bold">
          {role}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
          {company || 'Unknown'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {location}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Posted: {date_posted}
        </Typography>
      </Box>
      {link && (
        <Box mt={2}>
          <Button
            variant="outlined"
            component={Link}
            href={link}
            target="_blank"
            rel="noopener"
            fullWidth
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 'medium',
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
            }}
          >
            Apply Now
          </Button>
        </Box>
      )}
    </StyledPaper>
  </Grid>
);

export default JobListing;