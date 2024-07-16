import React from 'react';
import { Paper, Box, Typography, Button, Link, Grid } from '@mui/material';

interface JobListingProps {
  company: string;
  role: string;
  location: string;
  link: string | null;
  date_posted: string;
}

const JobListing: React.FC<JobListingProps> = ({ company, role, location, link, date_posted }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 200,
        height: 250,
        borderRadius: 4, // Slightly rounder corners
        backgroundColor: '#D9D9D9', 
      }}
    >
      <Box>
        <Typography variant="h6" component="div" gutterBottom>
          {role}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          <strong>Company:</strong> {company || 'Unknown'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          <strong>Location:</strong> {location}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          <strong>Date Posted:</strong> {date_posted}
        </Typography>
      </Box>
      {link && (
        <Box mt={2}>
  <Button
    variant="contained"
    component={Link}
    href={link}
    target="_blank"
    rel="noopener"
    sx={{
      borderRadius: '20px', // Capsule border radius
      backgroundColor: "#bf0a0a",
      textTransform: 'none', // Keep the text case as is

      fontSize: '12px',
      '&:hover': {
        backgroundColor: "#a00a0a"
      }
    }}
  >
    Apply
  </Button>
        </Box>
      )}
    </Paper>
  </Grid>
);

export default JobListing;
