import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";

// Icons
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ORANGE = '#e65100';
const ORANGE_LIGHT = '#fff3e0';
const DARK = '#1a1a2e';

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 28 }} />,
      title: "Email Us",
      content: "support@CommunityConnect.com",
      link: "mailto:support@CommunityConnect.com",
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 28 }} />,
      title: "Office Hours",
      content: "Mon - Fri, 9:00 AM - 6:00 PM",
      link: null,
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 28 }} />,
      title: "Our Address",
      content: "123 Community Street, Mumbai, India",
      link: null,
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: '#f9f9f9' }}>
      
      {/* ── Header Section ──────────────────────────────── */}
      <Box sx={{ pt: '100px', pb: 6, backgroundColor: '#ffffff', borderBottom: '1px solid #eee' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{ color: ORANGE, fontWeight: 700, letterSpacing: 2, fontSize: '0.75rem', display: 'block', mb: 1 }}
            >
              Get In Touch
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
              Contact Us
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#555',
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Have questions or need assistance? We are here to help volunteers
              and organisers with any inquiries.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── Contact Info Cards ────────────────────────────── */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {contactInfo.map((info, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  component={info.link ? "a" : "div"}
                  href={info.link || undefined}
                  sx={{
                    height: "100%",
                    p: 2,
                    borderRadius: '12px',
                    border: '1px solid #e8e8e8',
                    borderTop: `3px solid ${ORANGE}`,
                    backgroundColor: '#fff',
                    textDecoration: "none",
                    display: "block",
                    transition: 'all 0.2s ease',
                    boxShadow: 'none',
                    '&:hover': info.link ? {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                    } : {},
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "10px",
                        backgroundColor: ORANGE_LIGHT,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2.5,
                        color: ORANGE,
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 1, color: DARK, fontSize: '1.1rem' }}
                    >
                      {info.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                      {info.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Footer Message ─────────────────────────────── */}
      <Container maxWidth="md" sx={{ textAlign: 'center', pb: 10 }}>
        <Divider sx={{ mb: 6 }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: DARK, mb: 2 }}>
          We generally respond within 24 hours
        </Typography>
        <Typography variant="body1" sx={{ color: '#777' }}>
          For urgent matters, please mark your email subject as "URGENT".
        </Typography>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;