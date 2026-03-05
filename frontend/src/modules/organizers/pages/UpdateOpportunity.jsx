import { useEffect, useState } from "react";
import { Container, TextField, Button, Stack, Typography, Snackbar, Alert } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axios";

const UpdateOpportunity = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    start_date: "",
    end_date: "",
    total_slots: ""
  });
  
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await axiosInstance.get(
              `organizers/${id}/opportunity_detail/`
          );
          setForm({
              title: res.data.title || "",    
              description: res.data.description || "",
              location: res.data.location || "",
              start_date: formatDateForInput(res.data.start_date) || "",
              end_date: formatDateForInput(res.data.end_date) || "",
              total_slots: res.data.total_slots || ""
          });
      } catch (err) {
          console.error("Failed to load opportunity", err);
      }
    };

    fetchData();
  }, [id]);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {

    // Slot validation
    if (Number(form.total_slots) <= 0) {
      setSnackbar({
        open: true,
        message: "Total slots must be greater than 0",
        severity: "error"
      });
      return;
    }

    // Date validation
    const start = new Date(form.start_date);
    const end = new Date(form.end_date);

    if (end <= start) {
      setSnackbar({
        open: true,
        message: "End date must be after start date",
        severity: "error"
      });
      return;
    }

    try {
      await axiosInstance.put(
        `organizers/${id}/update_opportunity/`,
        form
      );

      setSnackbar({
        open: true,
        message: "Opportunity updated successfully",
        severity: "success"
      });

      setTimeout(() => {
        navigate("/org/opportunities");
      }, 1000);

    } catch (err) {
      console.error("Update failed", err);

      setSnackbar({
        open: true,
        message: "Update failed",
        severity: "error"
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 3 }}> 
            Update Opportunity 
        </Typography> 
        <Stack spacing={3}> 
            <TextField name="title" label="Title" value={form.title} onChange={handleChange} fullWidth /> 
            <TextField name="description" label="Description" value={form.description} onChange={handleChange} multiline rows={4} fullWidth /> 
            <TextField name="location" label="Location" value={form.location} onChange={handleChange} fullWidth /> 
            <TextField type="date" name="start_date" label="Start Date" value={form.start_date} onChange={handleChange} slotProps={{inputLabel: { shrink: true }}} fullWidth />
            <TextField type="date" name="end_date" label="End Date" value={form.end_date} onChange={handleChange} slotProps={{inputLabel: { shrink: true }}} fullWidth />
            <TextField type="number" name="total_slots" label="Total Slots" value={form.total_slots} onChange={handleChange} fullWidth /> 
            <Button variant="contained" onClick={handleSubmit} > 
                Update Opportunity 
            </Button> 
        </Stack>
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

export default UpdateOpportunity;