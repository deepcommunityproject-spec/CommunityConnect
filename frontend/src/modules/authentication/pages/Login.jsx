import { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Box,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import PasswordField from "../../../components/common/PasswordField";
import SubmitLoader from "../../../components/common/SubmitLoader";
import Navbar from "../../../components/layout/Navbar";
import {
  VALIDATION_RULES,
  VALIDATION_MESSAGES,
} from "../../../constants/validationConstants";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect
    const token = localStorage.getItem("accessToken");
    if (token) {
      window.location.href = "/home";
      return;
    }

    // Load saved credentials if remember me was checked
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const validateField = (name, value) => {
    const errors = [];

    switch (name) {
      case "email":
        if (!value) {
          errors.push(VALIDATION_MESSAGES.EMAIL_REQUIRED);
        } else if (!VALIDATION_RULES.EMAIL.pattern.test(value)) {
          errors.push(VALIDATION_MESSAGES.EMAIL_INVALID);
        } else if (value.length < VALIDATION_RULES.EMAIL.minLength) {
          errors.push(VALIDATION_MESSAGES.EMAIL_TOO_SHORT);
        } else if (value.length > VALIDATION_RULES.EMAIL.maxLength) {
          errors.push(VALIDATION_MESSAGES.EMAIL_TOO_LONG);
        }
        break;

      case "password":
        if (!value) {
          errors.push(VALIDATION_MESSAGES.PASSWORD_REQUIRED);
        }
        break;

      default:
        break;
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate all fields in real-time
    const errors = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: errors,
    }));
    setTouchedFields(prev => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({
      ...prev,
      [name]: true,
    }));
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach(field => {
      const fieldErrors = validateField(field, formData[field]);
      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors;
      }
    });

    setFieldErrors(errors);
    setTouchedFields(Object.keys(formData).reduce((acc, field) => ({ ...acc, [field]: true }), {}));

    return Object.keys(errors).length === 0;
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    // Handle remember me functionality
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", formData.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);

    setIsLoading(true);

    try {
      const res = await loginUser(data);

      const role = res.data.role;

      // Save JWT tokens
      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);
      localStorage.setItem("userData", JSON.stringify({ role: role }));

      if (role === "organizer") {
        navigate("/org/opportunities");
      } else {
        navigate("/home");
      }

    } catch (err) {
      let message = "Login failed";

      if (err.response?.data) {
        const errors = err.response.data;

        message = Object.values(errors)
          .flat()
          .join(" | ");
      }

      setSnackbar({
        open: true,
        message,
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
                Login
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  margin="normal"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touchedFields.email && fieldErrors.email?.length > 0}
                  helperText={touchedFields.email && fieldErrors.email?.[0]}
                />

                <PasswordField
                  label="Password"
                  name="password"
                  fullWidth
                  margin="normal"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touchedFields.password && fieldErrors.password?.length > 0}
                  helperText={touchedFields.password && fieldErrors.password?.[0]}
                />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />
                  <Typography
                    component={RouterLink}
                    to="/forgot-password"
                    sx={{ color: "primary.main", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500 }}
                  >
                    Forgot Password?
                  </Typography>
                </Box>

                <SubmitLoader
                  loading={isLoading}
                  loadingText="Logging in..."
                  sx={{ marginTop: 2 }}
                >
                  Login
                </SubmitLoader>

                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  Don't have an account?{" "}
                  <Typography
                    component={RouterLink}
                    to="/register"
                    sx={{ color: "primary.main", textDecoration: "none", fontWeight: 500 }}
                  >
                    Register here
                  </Typography>
                </Typography>
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

export default Login;