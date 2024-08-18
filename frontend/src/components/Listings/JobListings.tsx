import React from 'react';
import { Container, Grid, Typography, Box, Chip } from '@mui/material';

import WorkIcon from '@mui/icons-material/Work';
import JobListing from './JobListing';
import useListings from '../../hooks/useListings';

const JobListings: React.FC = () => {
  const listings = useListings();
  const totalListings = listings.length;
  const companies = [...new Set(listings.map((listing) => listing.company))]
    .length;

  return (
    <Container maxWidth="lg" sx={{ paddingY: 6 }}>
      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          color="primary"
          fontWeight="bold"
        >
          Intern Positions
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          color="text.secondary"
        >
          Don't miss out on these recently openned positions
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 4,
        }}
      >
        <Box>
          <Chip
            icon={<WorkIcon />}
            label={`${totalListings} Openings`}
            color="primary"
            sx={{ marginRight: 1 }}
          />
          <Chip label={`${companies} Companies`} variant="outlined" />
        </Box>
        {/* <TextField
          variant="outlined"
          size="small"
          placeholder="Search positions..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        /> */}
      </Box>

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

      <Box sx={{ marginTop: 6, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Can't find what you're looking for? Check back soon for more
          opportunities!
        </Typography>
      </Box>
    </Container>
  );
};

export default JobListings;
