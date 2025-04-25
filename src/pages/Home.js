// Example: src/pages/Home.js
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Home() {
  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Earthchain!
      </Typography>
      <Typography variant="body1">
        Making a green impact, one verified action at a time.
      </Typography>
      {/* Add more content later */}
    </Container>
  );
}

export default Home; // Make sure the default export is present