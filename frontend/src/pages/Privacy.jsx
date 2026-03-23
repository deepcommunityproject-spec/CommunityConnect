import React from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';

const ORANGE = '#e65100';
const ORANGE_LIGHT = '#fff3e0';
const DARK = '#1a1a2e';

const Privacy = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const privacySections = [
    {
      id: 'panel1',
      title: 'Information We Collect',
      icon: '📋',
      content: [
        'Personal Information: Name, email address, phone number, date of birth, and profile details when you register',
        'Account Information: Username, password, and authentication credentials',
        'Contact Details: Address, city, country, and contact preferences',
        'Professional Information: Skills, experience, education, and work history',
        'Usage Data: Pages visited, features used, time spent on platform, and interaction patterns',
        'Device Information: IP address, browser type, operating system, and device identifiers',
        'Communication Data: Messages sent, applications submitted, and feedback provided'
      ]
    },
    {
      id: 'panel2',
      title: 'How We Use Your Information',
      icon: '🔒',
      content: [
        'Service Provision: To provide and maintain our volunteer matching platform',
        'Account Management: To create and manage your user account and profile',
        'Opportunity Matching: To connect volunteers with relevant volunteer opportunities',
        'Communication: To facilitate communication between volunteers and organisations',
        'Platform Improvement: To analyze usage patterns and improve our services',
        'Safety and Security: To monitor for fraudulent activity and protect user accounts',
        'Customer Support: To respond to inquiries and provide technical assistance',
        'Legal Compliance: To comply with applicable laws and regulations'
      ]
    },
    {
      id: 'panel3',
      title: 'Data Sharing and Disclosure',
      icon: '🔄',
      content: [
        'With Organisations: Your profile and application information is shared with organisations you apply to',
        'Public Profile: Basic profile information may be visible to other registered users',
        'Service Providers: Third-party services for payment processing, email delivery, and analytics',
        'Legal Requirements: When required by law, court order, or government request',
        'Business Transfers: In case of merger, acquisition, or sale of our business',
        'Safety Purposes: To protect the rights, property, or safety of our users or others',
        'With Your Consent: When you explicitly authorise us to share specific information'
      ]
    },
    {
      id: 'panel4',
      title: 'Data Security Measures',
      icon: '🛡️',
      content: [
        'Encryption: All data transmissions use SSL/TLS encryption protocols',
        'Access Controls: Strict authentication and authorisation systems',
        'Regular Audits: Periodic security assessments and vulnerability testing',
        'Data Minimisation: We collect only information necessary for our services',
        'Employee Training: Regular privacy and security training for all staff members',
        'Secure Storage: Encrypted databases with access logging and monitoring',
        'Incident Response: Procedures for handling and reporting security breaches'
      ]
    },
    {
      id: 'panel5',
      title: 'Your Privacy Rights',
      icon: '👤',
      content: [
        'Access Rights: Request copies of your personal information we hold',
        'Correction Rights: Request corrections to inaccurate or incomplete information',
        'Deletion Rights: Request deletion of your personal information (with exceptions)',
        'Portability Rights: Request transfer of your data to another service provider',
        'Restriction Rights: Object to or limit processing of your personal information',
        'Opt-Out Rights: Decline marketing communications and certain data uses',
        'Complaint Rights: File complaints with privacy authorities about our practices'
      ]
    },
    {
      id: 'panel6',
      title: 'Cookies and Tracking Technologies',
      icon: '🍪',
      content: [
        'Essential Cookies: Required for basic site functionality and security',
        'Performance Cookies: Collect information on how visitors use our website',
        'Functional Cookies: Remember your preferences and personalisation choices',
        'Targeting Cookies: Used to deliver relevant content and advertisements',
        'Analytics Tools: Google Analytics and similar services for traffic analysis',
        'Local Storage: Browser storage for user preferences and session data',
        'Device Fingerprinting: Unique device identification for security purposes'
      ]
    },
    {
      id: 'panel7',
      title: 'Third-Party Services',
      icon: '🌐',
      content: [
        'Payment Processors: Stripe, PayPal, and other payment gateway services',
        'Email Services: SendGrid, Mailgun, or similar email delivery platforms',
        'Cloud Hosting: AWS, Google Cloud, or other infrastructure providers',
        'Analytics Services: Google Analytics, Mixpanel, or similar tracking tools',
        'Social Media: Facebook, Twitter, LinkedIn integration features',
        'Mapping Services: Google Maps for location-based opportunities'
      ]
    },
    {
      id: 'panel8',
      title: 'Data Retention',
      icon: '⏰',
      content: [
        'Active Accounts: Information retained while your account remains active',
        'Inactive Accounts: Data retained for 2 years after last login, then deleted',
        'Application Records: Kept for 7 years for legal and reference purposes',
        'Communication Logs: Retained for 1 year unless required for legal reasons',
        'Analytics Data: Aggregated and anonymised after 26 months',
        'Deleted Content: Removed from active databases but may exist in backups for 30 days'
      ]
    },
    {
      id: 'panel9',
      title: 'International Data Transfers',
      icon: '🌍',
      content: [
        'Global Service: Our platform operates internationally and processes data globally',
        'Adequate Protection: We ensure equivalent protection standards for international transfers',
        'Standard Contractual Clauses: Use of EU Standard Contractual Clauses for EU data',
        'Privacy Shield: Participation in applicable privacy frameworks (e.g., Privacy Shield)',
        'Local Compliance: Adherence to regional privacy laws (GDPR, CCPA, etc.)',
        'User Consent: Explicit consent for international data transfers where required'
      ]
    },
    {
      id: 'panel10',
      title: 'Policy Updates',
      icon: '📝',
      content: [
        'Regular Reviews: This privacy policy is reviewed annually',
        'Material Changes: Significant updates will be communicated via email and platform notices',
        'Effective Date: Changes take effect 30 days after notification',
        'Continued Use: Continued platform use constitutes acceptance of updated policy',
        'Archive Access: Previous versions available upon request',
        'Feedback Process: Users can provide input on proposed privacy changes'
      ]
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
              Privacy & Trust
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
              Privacy Policy
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
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── Privacy Content Section ────────────────────────── */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <Box>
            {privacySections.map((section) => (
              <Accordion
                key={section.id}
                expanded={expanded === section.id}
                onChange={handleChange(section.id)}
                sx={{
                  mb: 2,
                  backgroundColor: '#ffffff',
                  border: '1px solid #eee',
                  borderRadius: '12px !important',
                  boxShadow: 'none',
                  transition: 'all 0.2s ease',
                  '&:before': { display: 'none' },
                  '&:hover': {
                    borderColor: ORANGE,
                    backgroundColor: '#fff',
                  },
                  '&.Mui-expanded': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    borderColor: ORANGE,
                    borderTop: `3px solid ${ORANGE}`,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: ORANGE }} />}
                  sx={{
                    '& .MuiAccordionSummary-content': {
                      margin: '12px 0',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '6px',
                        backgroundColor: ORANGE_LIGHT,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        flexShrink: 0,
                      }}
                    >
                      {section.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: DARK,
                        fontSize: '1.05rem',
                      }}
                    >
                      {section.title}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0, pb: 3, px: { xs: 2, md: 4 } }}>
                  <Box sx={{ ml: { sm: 4 } }}>
                    {Array.isArray(section.content) ? (
                      <List sx={{ p: 0 }}>
                        {section.content.map((item, index) => (
                          <ListItem key={index} sx={{ px: 0, py: 0.8, alignItems: 'flex-start' }}>
                            <ListItemIcon sx={{ minWidth: 28, mt: 0.8 }}>
                              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ORANGE }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{
                                sx: { color: '#666', fontSize: '0.95rem', lineHeight: 1.6 }
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#555',
                          lineHeight: 1.8,
                          fontSize: '0.95rem',
                        }}
                      >
                        {section.content}
                      </Typography>
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          {/* Policy Footer */}
          <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid #eee', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#888' }}>
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
          </Box>
        </Container>
      </Box>

    </Box>
  );
};

export default Privacy;
