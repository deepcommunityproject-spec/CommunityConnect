import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import EventIcon from '@mui/icons-material/Event';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import communityLogo from '../assets/communityconnect.png';
import community from '../assets/community.png';

const features = [
  { icon: <VolunteerActivismIcon />, title: 'Meaningful Impact', description: 'Connect with causes that matter and make a real difference in your community.' },
  { icon: <GroupsIcon />, title: 'Community Building', description: 'Join a network of passionate volunteers and dedicated organizers.' },
  { icon: <TrendingUpIcon />, title: 'Track Progress', description: 'Monitor your volunteer hours, achievements, and personal growth.' },
  { icon: <SecurityIcon />, title: 'Safe & Secure', description: 'Verified organizations and a secure application process for peace of mind.' },
  { icon: <EventIcon />, title: 'Diverse Opportunities', description: 'From events to ongoing programs, find opportunities that fit your schedule.' },
  { icon: <EmojiEventsIcon />, title: 'Recognition', description: 'Earn badges and recognition for your contributions to the community.' },
];

const ORANGE = '#e65100';
const ORANGE_LIGHT = '#fff3e0';
const DARK = '#1a1a2e';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: '#f9f9f9' }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <Box
        sx={{
          backgroundColor: '#ffffff',
          pt: '64px',
          pb: 0,
          borderBottom: '1px solid #eee',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            minHeight: { xs: 'auto', md: '85vh' },
          }}
        >
          {/* Left — copy */}
          <Container sx={{ py: 10}}>
            <Box
              sx={{
                // flex: { xs: '1 1 auto', md: '0 0 100%' },
                display: 'flex',
                alignItems: 'center',
                px: { xs: 3, sm: 5, md: 8 },
                py: { xs: 6, md: 0 },
              }}
            >
              <Box>
                <Typography
                  variant="overline"
                  sx={{ color: ORANGE, fontWeight: 700, letterSpacing: 2, fontSize: '0.75rem', display: 'block', mb: 1 }}
                >
                  CommunityConnect
                </Typography>

                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 900,
                    color: DARK,
                    fontSize: { xs: '2rem', sm: '2.6rem', md: '3.2rem' },
                    lineHeight: 1.15,
                    mb: 2,
                  }}
                >
                  Make a Difference{' '}
                  <Box component="span" sx={{ color: ORANGE }}>
                    in Your Community
                  </Box>
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ color: '#555', fontSize: { xs: '0.95rem', md: '1.05rem' }, lineHeight: 1.8, mb: 4, maxWidth: 460 }}
                >
                  Discover and join impactful local missions. Find meaningful volunteer opportunities that match your passion and skills.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate('/register')}
                    sx={{
                      backgroundColor: ORANGE,
                      color: 'white',
                      fontWeight: 700,
                      borderRadius: '8px',
                      textTransform: 'none',
                      px: 3,
                      py: 1.4,
                      fontSize: '0.95rem',
                      boxShadow: 'none',
                      '&:hover': { backgroundColor: '#bf360c', boxShadow: '0 4px 12px rgba(230,81,0,0.3)' },
                    }}
                  >
                    Find Opportunities
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/about')}
                    sx={{
                      borderColor: '#ccc',
                      color: DARK,
                      fontWeight: 600,
                      borderRadius: '8px',
                      textTransform: 'none',
                      px: 3,
                      py: 1.4,
                      fontSize: '0.95rem',
                      '&:hover': { borderColor: ORANGE, color: ORANGE, backgroundColor: 'transparent' },
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* ── Who We Are — full-bleed split ───────────────── */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: { xs: 'auto', md: 420 },
          backgroundColor: '#fff',
          borderBottom: '1px solid #eee',
        }}
      >
        {/* Text — left */}
        <Box
          sx={{
            flex: { xs: '1 1 auto', md: '0 0 42%' },
            display: 'flex',
            alignItems: 'center',
            px: { xs: 3, sm: 5, md: 8 },
            py: { xs: 5, md: 0 },
          }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: ORANGE, fontWeight: 700, letterSpacing: 2, fontSize: '0.75rem' }}>
              Who We Are
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, mb: 2, fontSize: { xs: '1.6rem', md: '2rem' }, color: DARK }}>
              Connecting people who care
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.85, maxWidth: 420, mb: 3 }}>
              CommunityConnect brings together volunteers and organisations to
              build stronger, more resilient communities. Whether you are looking
              to help out locally or find dedicated volunteers for your cause,
              we make it simple.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/about')}
              sx={{
                borderColor: ORANGE,
                color: ORANGE,
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                '&:hover': { backgroundColor: ORANGE_LIGHT },
              }}
            >
              About Us →
            </Button>
          </Box>
        </Box>

        {/* Image — right, edge-to-edge */}
        <Box
          sx={{
            flex: { xs: '1 1 auto', md: '0 0 58%' },
            minHeight: { xs: 260, md: 420 },
            overflow: 'hidden',
          }}
        >
          <img
            src={community}
            alt="Community"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>
      </Box>

      {/* ── Features section ────────────────────────────── */}
      <Box id="features" sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#f9f9f9' }}>
        <Container maxWidth="lg">
          {/* Heading */}
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="overline" sx={{ color: ORANGE, fontWeight: 700, letterSpacing: 2, fontSize: '0.75rem', display: 'block', mb: 1 }}>
              Our Platform
            </Typography>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 800, fontSize: { xs: '1.7rem', md: '2.1rem' }, color: DARK, mb: 1 }}>
              Why Choose CommunityConnect?
            </Typography>
            <Typography variant="body1" sx={{ color: '#777', fontSize: '1rem' }}>
              Everything you need to start your volunteering journey
            </Typography>
          </Box>

          {/* 3-column grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
              gap: 3,
            }}
          >
            {features.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  p: 3,
                  borderRadius: '10px',
                  border: '1px solid #e8e8e8',
                  borderTop: `3px solid ${ORANGE}`,
                  backgroundColor: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(230,81,0,0.1)',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '9px',
                    backgroundColor: ORANGE_LIGHT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: ORANGE,
                    flexShrink: 0,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: DARK, lineHeight: 1.3 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.65 }}>
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Bottom CTA — clean white split panels ────────────── */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          backgroundColor: '#fff',
          borderTop: '1px solid #eee',
        }}
      >
        {/* Volunteers */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#ffffff',
            p: { xs: 5, md: 7 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRight: { md: '1px solid #eee' },
            borderBottom: { xs: '1px solid #eee', md: 'none' },
          }}
        >
          <Typography variant="overline" sx={{ color: ORANGE, fontWeight: 700, letterSpacing: 2, fontSize: '0.7rem', mb: 1 }}>
            For Volunteers
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: DARK, mb: 1.5, fontSize: { xs: '1.4rem', md: '1.6rem' } }}>
            Become a Volunteer
          </Typography>
          <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.75, mb: 3, maxWidth: 340 }}>
            Find opportunities that match your interests, availability, and skills. Start making a difference today.
          </Typography>
          <Box>
            <Button
              variant="contained"
              onClick={() => navigate('/register')}
              sx={{
                backgroundColor: ORANGE,
                color: 'white',
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: '8px',
                px: 4,
                py: 1.2,
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#bf360c', boxShadow: '0 4px 12px rgba(230,81,0,0.2)' },
              }}
            >
              Sign Up as Volunteer
            </Button>
          </Box>
        </Box>

        {/* Organisations */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#fafafa', // subtle grey for distinction
            p: { xs: 5, md: 7 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="overline" sx={{ color: ORANGE, fontWeight: 700, letterSpacing: 2, fontSize: '0.7rem', mb: 1 }}>
            For Organisations
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: DARK, mb: 1.5, fontSize: { xs: '1.4rem', md: '1.6rem' } }}>
            Post Opportunities
          </Typography>
          <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.75, mb: 3, maxWidth: 340 }}>
            Connect with motivated volunteers in your area and grow your team with the right people.
          </Typography>
          <Box>
            <Button
              variant="contained"
              onClick={() => navigate('/register')}
              sx={{
                backgroundColor: DARK,
                color: 'white',
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: '8px',
                px: 4,
                py: 1.2,
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#333', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
              }}
            >
              Register Organisation
            </Button>
          </Box>
        </Box>
      </Box>

    </Box>
  );
};

export default Landing;
