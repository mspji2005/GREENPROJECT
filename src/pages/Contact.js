// src/pages/Contact.js
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// You could add more MUI components like Link, Icon, etc. if needed

function Contact() {
  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Contact Us
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Get in Touch
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about Earthchain, feedback, or partnership inquiries, please feel free to reach out to us.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Email
        </Typography>
        <Typography variant="body1" paragraph>
          You can email us directly at: <a href="mailto:contact@earthchain.example.com">contact@earthchain.example.com</a> (Replace with your actual email)
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Social Media
        </Typography>
        <Typography variant="body1">
          Follow us on social media for updates:
        </Typography>
        <ul>
          {/* FIX: Replace href="#" with a placeholder or actual URL */}
          <li><a href="https://twitter.com/earthchain_example" target="_blank" rel="noopener noreferrer">Twitter</a></li> {/* Replaced # */}
          <li><a href="https://linkedin.com/company/earthchain_example" target="_blank" rel="noopener noreferrer">LinkedIn</a></li> {/* Replaced # */}
          {/* Add more social media links with valid placeholder/actual href */}
        </ul>

        {/* You could add a contact form here later */}
      </Box>
    </Container>
  );
}

export default Contact;