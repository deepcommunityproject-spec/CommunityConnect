import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { requestOTP, verifyOTP } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/layout/Navbar";
import SubmitLoader from "../../../components/common/SubmitLoader";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();
    if (!email) {
      setSnackbar({ open: true, message: "Please enter your email", severity: "error" });
      return;
    }

    setIsLoading(true);
    try {
      await requestOTP({ email });
      setIsOtpSent(true);
      setResendCooldown(60); // 1 minute cooldown
      setSnackbar({ open: true, message: "OTP sent to your email", severity: "success" });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || "Failed to send OTP",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) {
      setSnackbar({ open: true, message: "Please enter the OTP", severity: "error" });
      return;
    }

    setIsLoading(true);
    try {
      await verifyOTP({ email, otp });
      setSnackbar({ open: true, message: "OTP verified correctly", severity: "success" });
      // Store email and otp temporarily for the reset password page
      sessionStorage.setItem("reset_email", email);
      sessionStorage.setItem("reset_otp", otp);
      
      setTimeout(() => {
        navigate("/reset-password");
      }, 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || "Invalid OTP",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          py: { xs: 2, md: 4 }
        }}
      >
        <Container maxWidth="sm" sx={{ pt: 10 }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="calc(100vh - 120px)"
          >
            <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
              <Typography variant="h5" gutterBottom align="center">
                Forgot Password
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }} color="textSecondary" align="center">
                {!isOtpSent 
                  ? "Enter your email address to receive a 6-digit verification code." 
                  : "Enter the OTP sent to your email to verify your identity."}
              </Typography>

              <Box component="form">
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isOtpSent}
                  required
                />

                {isOtpSent && (
                  <TextField
                    label="Enter OTP"
                    fullWidth
                    margin="normal"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    autoFocus
                  />
                )}

                <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
                  {!isOtpSent ? (
                    <SubmitLoader
                      loading={isLoading}
                      onClick={handleSendOTP}
                    >
                      Send OTP
                    </SubmitLoader>
                  ) : (
                    <>
                      <SubmitLoader
                        loading={isLoading}
                        onClick={handleVerifyOTP}
                      >
                        Verify OTP
                      </SubmitLoader>
                      
                      <Button
                        variant="outlined"
                        onClick={handleSendOTP}
                        disabled={resendCooldown > 0 || isLoading}
                        fullWidth
                      >
                        {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : "Resend OTP"}
                      </Button>
                    </>
                  )}
                  
                  <Button
                    variant="text"
                    onClick={() => navigate("/login")}
                    fullWidth
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
     
    </>
  );
};

export default ForgotPassword;
