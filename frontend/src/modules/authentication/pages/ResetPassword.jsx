import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import { resetPassword } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/layout/Navbar";
import PasswordField from "../../../components/common/PasswordField";
import SubmitLoader from "../../../components/common/SubmitLoader";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const email = sessionStorage.getItem("reset_email");
  const otp = sessionStorage.getItem("reset_otp");

  useEffect(() => {
    if (!email || !otp) {
      navigate("/login");
    }
  }, [email, otp, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setSnackbar({ open: true, message: "Passwords do not match", severity: "error" });
      return;
    }

    if (formData.newPassword.length < 8) {
      setSnackbar({ open: true, message: "Password must be at least 8 characters", severity: "error" });
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword({
        email,
        otp,
        new_password: formData.newPassword,
      });
      
      setSnackbar({ open: true, message: "Password reset successful! Redirecting to login...", severity: "success" });
      
      // Clear session storage
      sessionStorage.removeItem("reset_email");
      sessionStorage.removeItem("reset_otp");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.error || "Failed to reset password",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!email || !otp) return null;

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
                Set New Password
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }} color="textSecondary" align="center">
                Please enter your new password below.
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <PasswordField
                  label="New Password"
                  fullWidth
                  margin="normal"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  required
                />

                <PasswordField
                  label="Confirm New Password"
                  fullWidth
                  margin="normal"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />

                <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
                  <SubmitLoader loading={isLoading}>
                    Reset Password
                  </SubmitLoader>
                  
                  <Button
                    variant="text"
                    onClick={() => navigate("/login")}
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

export default ResetPassword;
