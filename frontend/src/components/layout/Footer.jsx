import { Box, Typography, Link, Stack, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const currentPath = window.location.pathname;
  const isPublicPage =
    currentPath === "/" ||
    currentPath === "/about" ||
    currentPath === "/faq" ||
    currentPath === "/contact" ||
    currentPath === "/terms" ||
    currentPath === "/privacy" ||
    currentPath === "/login" ||
    currentPath === "/register" ||
    currentPath === "/forgot-password" ||
    currentPath === "/reset-password";

  // Minimal footer for logged-in / protected pages
  if (isLoggedIn || !isPublicPage) {
    return (
      <Box
        sx={{
          py: 2.5,
          textAlign: "center",
          backgroundColor: "#f4f7f6",
          borderTop: "1px solid #e0eded",
          marginTop: "auto",
        }}
      >
        <Typography variant="body2" sx={{ color: "#999", fontSize: "0.8rem" }}>
          © 2026 CommunityConnect. All rights reserved.
        </Typography>
      </Box>
    );
  }

  // Full footer for public pages
  return (
    <Box
      sx={{
        backgroundColor: '#0d2137',
        color: "white",
        pt: 6,
        pb: 3,
        marginTop: "auto",
      }}
    >
      <Box sx={{ maxWidth: "lg", mx: "auto", px: { xs: 3, md: 6 } }}>
        {/* Top row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 8 },
            mb: 5,
          }}
        >
          {/* Brand column */}
          <Box sx={{ flex: "1 1 40%" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 1.5,
                color: '#e65100',
                letterSpacing: "-0.01em",
                fontSize: "1.15rem",
              }}
            >
              CommunityConnect
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.75,
                maxWidth: 300,
                fontSize: "0.875rem",
              }}
            >
              Connecting volunteers with organisations to build stronger,
              more resilient communities across Australia.
            </Typography>
          </Box>

          {/* Links columns */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 4, md: 8 },
              flex: "1 1 60%",
            }}
          >
            {/* Quick Links */}
            <Box>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.7rem",
                  letterSpacing: 1.5,
                  display: "block",
                  mb: 1.5,
                }}
              >
                Quick Links
              </Typography>
              <Stack spacing={1.2}>
                {[
                  { label: "Home", to: "/" },
                  { label: "About", to: "/about" },
                  { label: "FAQ", to: "/faq" },
                  { label: "Contact", to: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.to}
                    component={RouterLink}
                    to={item.to}
                    sx={{
                      color: "rgba(255,255,255,0.65)",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      transition: "color 0.15s ease",
                      "&:hover": { color: "#e65100" },
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </Stack>
            </Box>

            {/* Legal */}
            <Box>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.7rem",
                  letterSpacing: 1.5,
                  display: "block",
                  mb: 1.5,
                }}
              >
                Legal
              </Typography>
              <Stack spacing={1.2}>
                {[
                  { label: "Terms & Conditions", to: "/terms" },
                  { label: "Privacy Policy", to: "/privacy" },
                ].map((item) => (
                  <Link
                    key={item.to}
                    component={RouterLink}
                    to={item.to}
                    sx={{
                      color: "rgba(255,255,255,0.65)",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      transition: "color 0.15s ease",
                      "&:hover": { color: "#e65100" },
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* Bottom bar */}
        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 3 }} />
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255,255,255,0.35)",
            textAlign: "center",
            fontSize: "0.8rem",
          }}
        >
          © 2026 CommunityConnect. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
