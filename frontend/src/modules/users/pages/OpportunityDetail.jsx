import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Avatar,
  Divider,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import axiosInstance from "../../../api/axios";
import BASE_URL from "../../../config/config";

const OpportunityDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [opportunity, setOpportunity] = useState(null);
  const [comment, setComment] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchDetail = async () => {
    try {

      const res = await axiosInstance.get(
        `users/${id}/opportunity_detail/`
      );

      setOpportunity(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const handleApply = async () => {
    try {
      const res = await axiosInstance.post(
        `users/${id}/apply/`
      );

      setSnackbar({
        open: true,
        message:
          res.data.message ||
          "Application submitted successfully",
        severity: "success",
      });
    } catch (err) {

      setSnackbar({
        open: true,
        message:
          err.response?.data?.error ||
          "Application failed",
        severity: "error",
      });
    }
  };

  const handleAddFeedback = async () => {
    if (!comment.trim()) return;

    try {
      await axiosInstance.post(
        `users/${id}/add_feedback/`,
        { comment }
      );
      // fetch updated opportunity so we get correct feedback id
      await fetchDetail();
      setComment("");

      setSnackbar({
        open: true,
        message: "Feedback added",
        severity: "success",
      });

    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {

    try {
      await axiosInstance.delete(
        `users/delete_feedback/${feedbackId}/`
      );

      setOpportunity(prev => ({
        ...prev,
        feedbacks: prev.feedbacks.filter(
          f => f.id !== feedbackId
        )
      }));

      setSnackbar({
        open: true,
        message: "Feedback deleted",
        severity: "success",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!opportunity) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper sx={{ p: 5 }}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={`${BASE_URL}${opportunity.organization_image}`}
              sx={{ width: 70, height: 70 }}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" }
              }}
              onClick={() =>
                navigate(`/organization/${opportunity.organization_id}`)
              }
            >
              {opportunity.organization}
            </Typography>
          </Stack>

          <Divider />

          <Typography variant="h5">
            {opportunity.title}
          </Typography>

          <Typography color="text.secondary">
            {opportunity.description}
          </Typography>

          <Typography>
            <strong>Location:</strong> {opportunity.location}
          </Typography>

          <Typography>
            <strong>Start Date:</strong>{" "}
            {formatDate(opportunity.start_date)}
          </Typography>

          <Typography>
            <strong>End Date:</strong>{" "}
            {formatDate(opportunity.end_date)}
          </Typography>

          <Typography>
            <strong>Created On:</strong>{" "}
            {formatDate(opportunity.created_at)}
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleApply}
          >
            Apply Now
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 4, mt: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h6">
            Feedback
          </Typography>

          {(!opportunity.feedbacks || opportunity.feedbacks.length === 0) && (
            <Typography color="text.secondary">
              No feedback yet.
            </Typography>
          )}

          {(opportunity.feedbacks || []).map((fb) => (

            <Paper
              key={`feedback-${fb.id}`}
              variant="outlined"
              sx={{ p: 2 }}
            >
              <Stack spacing={1}>
                <Typography sx={{ fontWeight: 600 }}>
                  {fb.volunteer_name}
                </Typography>

                <Typography color="text.secondary">
                  {fb.comment}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {formatDate(fb.created_at)}
                </Typography>

                {fb.is_my_comment && (

                  <Button
                    size="small"
                    color="error"
                    sx={{ width: "fit-content" }}
                    onClick={() => handleDeleteFeedback(fb.id)}
                  >
                    Delete
                  </Button>
                )}
              </Stack>
            </Paper>
          ))}

          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              size="small"
              label="Write feedback"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <Button
              variant="contained"
              onClick={handleAddFeedback}
            >
              Post
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={() =>
          setSnackbar({ ...snackbar, open: false })
        }
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OpportunityDetail;