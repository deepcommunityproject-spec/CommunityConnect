import React from 'react';
import {
  Container,
  Box,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GavelIcon from '@mui/icons-material/Gavel';
import SecurityIcon from '@mui/icons-material/Security';
import PeopleIcon from '@mui/icons-material/People';
import BlockIcon from '@mui/icons-material/Block';
import CopyrightIcon from '@mui/icons-material/Copyright';
import UpdateIcon from '@mui/icons-material/Update';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const ORANGE = '#e65100';
const ORANGE_LIGHT = '#fff3e0';
const DARK = '#1a1a2e';

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      icon: <GavelIcon sx={{ fontSize: 22 }} />,
      content: 'Welcome to Community Connect. By accessing or using our platform, you agree to be bound by these Terms and Conditions. Please read them carefully before using our services.',
    },
    {
      id: 'acceptance',
      title: '2. Acceptance of Terms',
      icon: <SecurityIcon sx={{ fontSize: 22 }} />,
      content: 'By registering, accessing, or using Community Connect, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you must not use our platform.',
    },
    {
      id: 'accounts',
      title: '3. User Accounts',
      icon: <PeopleIcon sx={{ fontSize: 22 }} />,
      items: [
        'You must provide accurate and complete information when creating an account',
        'You are responsible for maintaining the confidentiality of your account credentials',
        'You agree to notify us immediately of any unauthorised use of your account',
        'You must be at least 18 years old to use this platform',
        'One user may only maintain one active account'
      ],
    },
    {
      id: 'roles',
      title: '4. User Roles',
      icon: <PeopleIcon sx={{ fontSize: 22 }} />,
      content: 'Our platform supports two types of users:',
      roles: [
        { title: 'Volunteers', description: 'Individuals who browse, apply for, and participate in volunteer opportunities' },
        { title: 'Organisers', description: 'Organisations or individuals who create and manage volunteer opportunities' }
      ],
    },
    {
      id: 'responsibilities',
      title: '5. User Responsibilities',
      icon: <SecurityIcon sx={{ fontSize: 22 }} />,
      items: [
        'Provide truthful information in your profile and applications',
        'Honor commitments made to organisers',
        'Conduct yourself professionally during volunteer activities',
        'Report any safety concerns immediately',
        'Respect organiser policies and guidelines'
      ],
    },
    {
      id: 'prohibited',
      title: '6. Prohibited Activities',
      icon: <BlockIcon sx={{ fontSize: 22 }} />,
      items: [
        'Providing false or misleading information',
        'Harassing, abusing, or discriminating against other users',
        'Using the platform for illegal purposes',
        'Attempting to breach security measures',
        'Spamming or sending unsolicited communications',
        'Impersonating others'
      ],
    },
    {
      id: 'intellectual',
      title: '7. Content and Intellectual Property',
      icon: <CopyrightIcon sx={{ fontSize: 22 }} />,
      items: [
        'Users retain ownership of content they create',
        'By posting content, you grant us a license to display it on our platform',
        'You must not post copyrighted material without permission',
        'We reserve the right to remove inappropriate content'
      ],
    },
    {
      id: 'liability',
      title: '8. Limitation of Liability',
      icon: <GavelIcon sx={{ fontSize: 22 }} />,
      content: 'Community Connect is not liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising from your use of the platform. This includes but is not limited to damages for loss of profits, goodwill, use, data, or other intangible losses.',
    },
    {
      id: 'termination',
      title: '9. Termination',
      icon: <UpdateIcon sx={{ fontSize: 22 }} />,
      content: 'We reserve the right to suspend or terminate your account at any time for violations of these terms or for any other reason at our sole discretion. You may also delete your account at any time.',
    },
    {
      id: 'changes',
      title: '10. Changes to Terms',
      icon: <UpdateIcon sx={{ fontSize: 22 }} />,
      content: 'We may modify these Terms and Conditions at any time. We will notify users of significant changes via email or through our platform. Continued use of the platform after changes constitutes acceptance of new terms.',
    },
    {
      id: 'contact',
      title: '11. Contact Information',
      icon: <ContactSupportIcon sx={{ fontSize: 22 }} />,
      content: 'If you have any questions about these Terms and Conditions, please contact us at: support@communityconnect.com',
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      
      {/* ── Header Section ──────────────────────────────── */}
      <Box sx={{ pt: '100px', pb: 6, backgroundColor: '#ffffff', borderBottom: '1px solid #eee' }}>
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
              Legal Agreements
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
              Terms and Conditions
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
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── Content Sections ────────────────────────────── */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {sections.map((section, index) => (
              <Card
                key={section.id}
                sx={{
                  p: 1,
                  borderRadius: '12px',
                  border: '1px solid #eee',
                  borderTop: `3px solid ${ORANGE}`,
                  backgroundColor: '#ffffff',
                  boxShadow: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Section Title */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '8px',
                        backgroundColor: ORANGE_LIGHT,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: ORANGE,
                      }}
                    >
                      {section.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: 800,
                        color: DARK,
                        fontSize: '1.15rem',
                      }}
                    >
                      {section.title}
                    </Typography>
                  </Box>

                  {/* Body Content */}
                  {section.content && (
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#555',
                        lineHeight: 1.8,
                        fontSize: '1rem',
                        mb: section.items || section.roles ? 2 : 0,
                      }}
                    >
                      {section.content}
                    </Typography>
                  )}

                  {/* Detailed Items */}
                  {section.items && (
                    <List sx={{ p: 0 }}>
                      {section.items.map((item, itemIndex) => (
                        <ListItem key={itemIndex} sx={{ px: 0, py: 0.5, alignItems: 'flex-start' }}>
                          <ListItemIcon sx={{ minWidth: 28, mt: 0.8 }}>
                            <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ORANGE }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{ sx: { color: '#666', fontSize: '0.95rem', lineHeight: 1.6 } }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}

                  {/* Role Descriptions */}
                  {section.roles && (
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {section.roles.map((role, roleIndex) => (
                        <Box
                          key={roleIndex}
                          sx={{
                            p: 2,
                            borderRadius: '8px',
                            backgroundColor: '#fdfdfd',
                            border: '1px solid #f1f1f1',
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: ORANGE, mb: 0.5 }}>
                            {role.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            {role.description}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Acknowledgement Footer */}
          <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid #eee', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#888', maxWidth: 500, mx: 'auto' }}>
              By using Community Connect, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
            </Typography>
          </Box>
        </Container>
      </Box>

    </Box>
  );
};

export default TermsAndConditions;
