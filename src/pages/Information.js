// src/pages/Information.js
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Information() {
  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
      <Typography variant="h4" gutterBottom align="center">
        About Earthchain
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          What is Earthchain?
        </Typography>
        <Typography variant="body1" paragraph>
          Earthchain is a platform where every transaction represents a verified eco-action, such as planting a tree or reducing carbon emissions. We aim to reward tangible environmental impact with digital tokens.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Why It’s Unique
        </Typography>
        <Typography variant="body1" paragraph>
          Unlike traditional systems, Earthchain focuses on "Proof-of-Impact" rather than energy-intensive "Proof-of-Work". This approach brings transparency and a layer of gamification to climate actions, encouraging more people to participate in making a positive environmental difference.
        </Typography>
        <ul>
          <li>**Transparency:** All verified actions are recorded.</li>
          <li>**Gamification:** Earn tokens for your contributions.</li>
          <li>**Energy Efficiency:** Rewards impact directly, not computational power.</li>
        </ul>

         <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          How It Works (Simplified)
        </Typography>
        <Typography variant="body1" paragraph>
         Users perform eco-actions (like planting a tree) and submit proof through the platform. An administrator reviews and verifies the proof. Once verified, the user is awarded Earthchain tokens. These tokens represent your contribution to a greener planet.
        </Typography>
         {/* Expand on verification process, token usage, etc. */}


        {/* Add more sections as needed, e.g., Mission, Team, Technology */}
      </Box>
    </Container>
  );
}

export default Information;