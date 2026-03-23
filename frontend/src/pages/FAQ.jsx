import { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  Avatar,
  Fade,
  alpha,
  Divider,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HistoryIcon from "@mui/icons-material/History";
import LockIcon from "@mui/icons-material/Lock";
import FeedbackIcon from "@mui/icons-material/Feedback";
import GroupsIcon from '@mui/icons-material/Groups';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatIcon from '@mui/icons-material/Chat';
import LayersIcon from '@mui/icons-material/Layers';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';

const ORANGE = '#e65100';
const ORANGE_LIGHT = '#fff3e0';
const DARK = '#1a1a2e';

const FAQ = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqData = [
    {
      id: "panel1",
      icon: <PersonAddIcon sx={{ fontSize: 18 }} />,
      question: "How do I register as a volunteer?",
      answer: "To register as a volunteer, click on the 'Register' button on the login page. Fill in your personal details, create a password, and submit the form. Once registered, you can log in and start browsing volunteer opportunities."
    },
    {
      id: "panel2",
      icon: <GroupsIcon sx={{ fontSize: 18 }} />,
      question: "How can I become an organiser?",
      answer: "To become an organiser, register on the platform and then contact our support team to request organiser privileges. Alternatively, you can register directly as an organiser if you have an invitation code from an existing organisation."
    },
    {
      id: "panel3",
      icon: <SearchIcon sx={{ fontSize: 18 }} />,
      question: "How do I apply for a volunteer opportunity?",
      answer: "Browse available opportunities on the home page, click on any opportunity that interests you to view details, and then click the 'Apply' button. Your application will be sent to the organiser for review."
    },
    {
      id: "panel4",
      icon: <EditIcon sx={{ fontSize: 18 }} />,
      question: "Can I edit my application after submitting?",
      answer: "Once an application is submitted, you cannot edit it directly. However, you can contact the organiser through the platform to request changes or withdraw your application and submit a new one."
    },
    {
      id: "panel5",
      icon: <AddCircleOutlineIcon sx={{ fontSize: 18 }} />,
      question: "How do I create a volunteer opportunity as an organiser?",
      answer: "As an organiser, navigate to your dashboard and click on 'Create Opportunity'. Fill in all the required details including title, description, location, dates, and requirements. Your opportunity will be visible to volunteers once published."
    },
    {
      id: "panel6",
      icon: <HistoryIcon sx={{ fontSize: 18 }} />,
      question: "How can I track my volunteer history?",
      answer: "Go to your profile and click on 'History' or navigate to the 'History' section from the main menu. You'll see all your past and current volunteer activities, including application status and completion records."
    },
    {
      id: "panel7",
      icon: <LockIcon sx={{ fontSize: 18 }} />,
      question: "What should I do if I forget my password?",
      answer: "Click on the 'Forgot Password' link on the login page. Enter your registered email address, and we'll send you instructions to reset your password. Follow the link in the email to create a new password."
    },
    {
      id: "panel8",
      icon: <ChatIcon sx={{ fontSize: 18 }} />,
      question: "How do I contact an organiser about an opportunity?",
      answer: "When viewing an opportunity detail page, you'll find a 'Contact Organiser' button. Click it to send a message directly to the organiser through our messaging system."
    },
    {
      id: "panel9",
      icon: <LayersIcon sx={{ fontSize: 18 }} />,
      question: "Can I volunteer for multiple opportunities simultaneously?",
      answer: "Yes, you can apply for multiple opportunities as long as the schedules don't conflict. However, we recommend focusing on one or two opportunities at a time to ensure quality commitment."
    },
    {
      id: "panel10",
      icon: <AccessTimeIcon sx={{ fontSize: 18 }} />,
      question: "How are volunteer hours tracked and verified?",
      answer: "Organisers track and verify volunteer hours through the platform. Once you complete an opportunity, the organiser will confirm your hours, which will then appear in your volunteer history and profile."
    },
    {
      id: "panel11",
      icon: <VerifiedUserIcon sx={{ fontSize: 18 }} />,
      question: "Is my personal information secure?",
      answer: "Yes, we take data security seriously. All personal information is encrypted and stored securely. We only share necessary information with organisers for the purpose of volunteer matching and communication."
    },
    {
      id: "panel12",
      icon: <FeedbackIcon sx={{ fontSize: 18 }} />,
      question: "How do I report an issue or provide feedback?",
      answer: "You can report issues or provide feedback through the 'Contact' page or by using the feedback form in your profile. Our support team will respond within 24-48 hours."
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      
      {/* ── Header Section ──────────────────────────────── */}
      <Box sx={{ pt: '100px', pb: 6, backgroundColor: '#ffffff', borderBottom: '1px solid #eee' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{ color: ORANGE, fontWeight: 700, letterSpacing: 2, fontSize: '0.75rem', display: 'block', mb: 1 }}
            >
              Support Center
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
              Frequently Asked Questions
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
              Find answers to common questions about volunteering, organising opportunities, and using our platform.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── FAQ Section ─────────────────────────────── */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Fade in timeout={800}>
          <Container maxWidth="md">
            <Box sx={{ mb: 4 }}>
              {faqData.map((faq, index) => (
                <Accordion
                  key={faq.id}
                  expanded={expanded === faq.id}
                  onChange={handleAccordionChange(faq.id)}
                  sx={{
                    mb: 2,
                    p: 1,
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
                          color: ORANGE,
                          flexShrink: 0,
                        }}
                      >
                        {faq.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: DARK,
                          fontSize: '1.05rem',
                        }}
                      >
                        {faq.question}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0, pb: 3, pl: 8 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#555',
                        lineHeight: 1.8,
                        fontSize: '0.95rem',
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>

            {/* Support Message */}
            <Box
              sx={{
                p: { xs: 4, md: 6 },
                textAlign: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #eee',
                borderRadius: '16px',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800, color: DARK, mb: 1.5 }}>
                Still have questions?
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
                We're here to help you get the most out of CommunityConnect.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => window.location.href = '/contact'}
                sx={{
                  borderColor: ORANGE,
                  color: ORANGE,
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: '8px',
                  px: 4,
                  py: 1.2,
                  '&:hover': {
                    backgroundColor: ORANGE,
                    color: 'white',
                    borderColor: ORANGE,
                  },
                }}
              >
                Contact Support Team
              </Button>
            </Box>
          </Container>
        </Fade>
      </Box>

    </Box>
  );
};

export default FAQ;
