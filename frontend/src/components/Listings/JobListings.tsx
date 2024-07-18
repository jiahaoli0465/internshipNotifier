import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import JobListing from './JobListing';
import listings from '../../data/listings';

const JobListings: React.FC = () => (
  <Container sx={{ paddingTop: 4 }}>
    <Typography variant="h4" component="h1" gutterBottom color="text.primary">
      Intern Positions
    </Typography>
    <Grid container spacing={4}>
      {listings.map((listing, index) => (
        <JobListing
          key={index}
          company={listing.company}
          role={listing.role}
          location={listing.location}
          link={listing.link}
          date_posted={listing.date_posted}
        />
      ))}
    </Grid>
  </Container>
);

export default JobListings;
