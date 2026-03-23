import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InsightsIcon from '@mui/icons-material/Insights';
import PublicIcon from '@mui/icons-material/Public';

const ORANGE = '#e65100';
const ORANGE_LIGHT = '#fff3e0';
const DARK = '#1a1a2e';

const About = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const values = [
    { title: 'Impact', icon: <InsightsIcon />, description: 'Creating meaningful change in communities through direct action and support.' },
    { title: 'Transparency', icon: <GroupsIcon />, description: 'Open and honest in all our operations, ensuring trust between volunteers and organisations.' },
    { title: 'Innovation', icon: <EmojiEventsIcon />, description: 'Continuously improving our platform and services to solve modern community challenges.' },
    { title: 'Community', icon: <PublicIcon />, description: 'Building strong connections between passionate individuals and dedicated local causes.' },
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Executive Director',
      description: 'Leading our mission to connect communities through volunteerism.',
    },
    {
      name: 'Michael Chen',
      role: 'Technical Lead',
      description: 'Ensuring our platform provides the best user experience with innovative technology.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Community Manager',
      description: 'Building partnerships with organisations and supporting our volunteer community.',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      
      {/* ── Sub-header / Breadcrumb section ───────────────── */}
      <Box sx={{ pt: '100px', pb: 4, backgroundColor: '#ffffff', borderBottom: '1px solid #eee' }}>
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{
              color: '#666',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
              mb: 3,
              '&:hover': { color: ORANGE, backgroundColor: 'transparent' },
            }}
          >
            Back to Home
          </Button>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{ color: ORANGE, fontWeight: 700, letterSpacing: 2, fontSize: '0.75rem', display: 'block', mb: 1 }}
            >
              Our Story
            </Typography>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                color: DARK,
                fontSize: { xs: '2.2rem', md: '3rem' },
                mb: 2,
              }}
            >
              About CommunityConnect
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#555',
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
                maxWidth: 650,
                mx: 'auto',
              }}
            >
              Empowering communities with meaningful volunteer connections. We Bridge the gap between those who want to help and organisations that need it.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── Mission section ─────────────────────────────── */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#ffffff' }}>
        <Container maxWidth="md">
          <Box
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: '16px',
              border: '1px solid #eee',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#fff',
            }}
          >
            {/* Subtle accent border */}
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', backgroundColor: ORANGE }} />
            
            <Typography variant="h4" sx={{ fontWeight: 800, color: DARK, mb: 3 }}>
              🎯 Our Mission
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', fontSize: '1.1rem', lineHeight: 2 }}>
              To connect passionate volunteers with meaningful opportunities, creating lasting positive impact in communities worldwide. We strive to make volunteering accessible, transparent, and rewarding for everyone involved.
            </Typography>
            
            <Divider sx={{ my: 4 }} />
            
            <Typography variant="body1" sx={{ color: '#555', fontSize: '1.1rem', lineHeight: 2 }}>
              We believe that when people are connected to the causes they care about, everyone succeeds. Our platform is built on the foundation of trust, integrity, and the shared goal of building a better tomorrow.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── Values section ──────────────────────────────── */}
      <Box sx={{ py: { xs: 8, md: 10 }, backgroundColor: '#f9f9f9' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" sx={{ color: ORANGE, fontWeight: 700, letterSpacing: 2, fontSize: '0.75rem', display: 'block', mb: 1 }}>
              Platform Values
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: DARK }}>
              What Drives Us
            </Typography>
          </Box>
          
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 4,
              maxWidth: 900,
              mx: 'auto',
            }}
          >
            {values.map((value, index) => (
              <Card
                key={index}
                sx={{
                  height: '100%',
                  p: 3,
                  borderRadius: '12px',
                  border: '1px solid #e8e8e8',
                  borderTop: `3px solid ${ORANGE}`,
                  backgroundColor: '#fff',
                  transition: 'all 0.2s ease',
                  boxShadow: 'none',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '8px',
                    backgroundColor: ORANGE_LIGHT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: ORANGE,
                    mb: 2,
                  }}
                >
                  {value.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: DARK }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.7 }}>
                  {value.description}
                </Typography>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
