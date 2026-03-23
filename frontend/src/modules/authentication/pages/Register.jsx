import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import { registerUser } from "../services/authService";
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

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "volunteer",
    name: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
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
      window.location.href = "/";
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

      case "name":
        if (!value) {
          errors.push(VALIDATION_MESSAGES.NAME_REQUIRED);
        } else if (value.length < VALIDATION_RULES.NAME.minLength) {
          errors.push(VALIDATION_MESSAGES.NAME_TOO_SHORT);
        } else if (value.length > VALIDATION_RULES.NAME.maxLength) {
          errors.push(VALIDATION_MESSAGES.NAME_TOO_LONG);
        } else if (!VALIDATION_RULES.NAME.pattern.test(value)) {
          errors.push(VALIDATION_MESSAGES.NAME_INVALID);
        }
        break;

      case "password":
        if (!value) {
          errors.push(VALIDATION_MESSAGES.PASSWORD_REQUIRED);
        } else if (value.length < VALIDATION_RULES.PASSWORD.minLength) {
          errors.push(VALIDATION_MESSAGES.PASSWORD_TOO_SHORT);
        } else if (value.length > VALIDATION_RULES.PASSWORD.maxLength) {
          errors.push(VALIDATION_MESSAGES.PASSWORD_TOO_LONG);
        }
        break;

      case "confirmPassword":
        if (!value) {
          errors.push("Please confirm your password");
        } else if (value !== formData.password) {
          errors.push("Passwords do not match");
        }
        break;

      case "role":
        if (!value) {
          errors.push(VALIDATION_MESSAGES.ROLE_REQUIRED);
        } else if (!VALIDATION_RULES.ROLE.allowedValues.includes(value)) {
          errors.push(VALIDATION_MESSAGES.ROLE_INVALID);
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
    // Validation is already real-time, just ensure field is marked as touched
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

    // Validate terms acceptance
    if (!termsAccepted) {
      errors.terms = [VALIDATION_MESSAGES.TERMS_REQUIRED];
    }

    setFieldErrors(errors);
    setTouchedFields(Object.keys(formData).reduce((acc, field) => ({ ...acc, [field]: true }), {}));

    return Object.keys(errors).length === 0;
  };

  const handleTermsChange = (e) => {
    const checked = e.target.checked;
    setTermsAccepted(checked);

    // Clear terms error if checked
    if (checked && fieldErrors.terms) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.terms;
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role);
    data.append("name", formData.name);

    setIsLoading(true);

    try {
      const res = await registerUser(data);

      setSnackbar({
        open: true,
        message: res.data.message || "Registered successfully",
        severity: "success",
      });

      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      let message = "Registration failed";

      if (err.response?.data) {
        const errors = err.response.data;

        message = Object.entries(errors)
          .map(([field, msgs]) =>
            `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`
          )
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
                Register
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  label="Full Name"
                  name="name"
                  fullWidth
                  margin="normal"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touchedFields.name && fieldErrors.name?.length > 0}
                  helperText={touchedFields.name && fieldErrors.name?.[0]}
                />

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
                  showRequirements
                />
                <PasswordField
                  label="Confirm Password"
                  name="confirmPassword"
                  fullWidth
                  margin="normal"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touchedFields.confirmPassword && fieldErrors.confirmPassword?.length > 0}
                  helperText={touchedFields.confirmPassword && fieldErrors.confirmPassword?.[0]}
                  showRequirements
                />

                <TextField
                  select
                  label="Role"
                  name="role"
                  fullWidth
                  margin="normal"
                  value={formData.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touchedFields.role && fieldErrors.role?.length > 0}
                  helperText={touchedFields.role && fieldErrors.role?.[0]}
                >
                  <MenuItem value="volunteer">Volunteer</MenuItem>
                  <MenuItem value="organizer">Organizer</MenuItem>
                </TextField>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={termsAccepted}
                      onChange={handleTermsChange}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to the{" "}
                      <Link
                        component={RouterLink}
                        to="/terms"
                        sx={{ color: "primary.main" }}
                      >
                        Terms and Conditions
                      </Link>
                    </Typography>
                  }
                  sx={{ mt: 2, mb: 1 }}
                />
                {fieldErrors.terms && (
                  <Typography variant="caption" color="error" sx={{ mt: -1, mb: 1, display: 'block' }}>
                    {fieldErrors.terms[0]}
                  </Typography>
                )}

                <SubmitLoader
                  loading={isLoading}
                  loadingText="Registering..."
                  sx={{ marginTop: 2 }}
                  disabled={!termsAccepted}
                >
                  Register
                </SubmitLoader>

                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  Already have an account?{" "}
                  <Typography
                    component={RouterLink}
                    to="/login"
                    sx={{ color: "primary.main", textDecoration: "none", fontWeight: 500 }}
                  >
                    Login here
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

export default Register;