import { useState } from "react";
import {
  Container,
  Paper,
  Stack,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axiosInstance from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const CreateOpportunity = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    start_date: "",
    end_date: "",
    total_slots: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showError = (message) => {
    setSnackbar({
      open: true,
      message,
      severity: "error",
    });
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* ---------- VALIDATION ---------- */

    if (!form.title.trim()) return showError("Title is required");
    if (!form.description.trim()) return showError("Description is required");
    if (!form.location.trim()) return showError("Location is required");

    if (!form.start_date) return showError("Start date required");
    if (!form.end_date) return showError("End date required");

    if (!form.total_slots || form.total_slots <= 0)
      return showError("Slots must be greater than 0");

    const start = new Date(form.start_date);
    const end = new Date(form.end_date);

    if (isNaN(start.getTime())) return showError("Invalid start date");
    if (isNaN(end.getTime())) return showError("Invalid end date");

    if (end <= start)
      return showError("End date must be after start date");

    /* ---------- PAYLOAD ---------- */

    const payload = {
      ...form,
      start_date: start.toISOString(),
      end_date: end.toISOString(),
      total_slots: Number(form.total_slots),
    };

    try {
      const res = await axiosInstance.post(
        "organizers/create_opportunity/",
        payload
      );

      setSnackbar({
        open: true,
        message: "Opportunity created successfully",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/org/opportunities");
      }, 1200);

    } catch (err) {
      console.error("CREATE ERROR:", err);

      let message = "Creation failed";

      if (err.response?.data) {
        message = Object.entries(err.response.data)
          .map(([field, msgs]) =>
            `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`
          )
          .join(" | ");
      }

      showError(message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper sx={{ p: 5 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Create Opportunity
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Title"
            fullWidth
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            fullWidth
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <TextField
            label="Location"
            fullWidth
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />

          <TextField
            type="datetime-local"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={form.start_date}
            onChange={(e) => handleChange("start_date", e.target.value)}
          />

          <TextField
            type="datetime-local"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={form.end_date}
            onChange={(e) => handleChange("end_date", e.target.value)}
          />

          <TextField
            type="number"
            label="Total Slots"
            fullWidth
            value={form.total_slots}
            onChange={(e) => handleChange("total_slots", e.target.value)}
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
          >
            Create Opportunity
          </Button>
        </Stack>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateOpportunity;