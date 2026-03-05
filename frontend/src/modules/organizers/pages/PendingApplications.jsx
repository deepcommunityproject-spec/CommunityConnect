import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Typography,
  Button,
  Stack,
  Box,
  Chip,
  Divider
} from "@mui/material";
import axiosInstance from "../../../api/axios";

const PendingApplications = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axiosInstance.get("organizers/pending_applications/");
    setData(res.data);
  };

  const updateStatus = async (id, status) => {
    await axiosInstance.put(`organizers/${id}/update_application/`, { status });
    fetchData();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Pending Applications
      </Typography>

      {data.length === 0 ? (
        <Typography align="center" color="text.secondary">
          Nothing to display here yet.
        </Typography>
      ) : (
        <Stack spacing={3}>
          {data.map((item) => (
            <Card
              key={item.id}
              sx={{
                p: 3,
                borderRadius: 3,
                transition: "0.25s",
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-2px)"
                }
              }}
            >
              <Stack spacing={2}>

                {/* Top Row */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" }
                    }}
                    onClick={() =>
                      navigate(`/org/volunteer/${item.volunteer_id}`)
                    }
                  >
                    {item.volunteer}
                  </Typography>

                  <Chip
                    label="Pending"
                    color="warning"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Stack>

                <Divider />

                {/* Opportunity */}
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Opportunity
                  </Typography>

                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {item.opportunity}
                  </Typography>
                </Box>

                {/* Location */}
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Location
                  </Typography>

                  <Typography variant="body1">
                    {item.location}
                  </Typography>
                </Box>

                {/* Buttons */}
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="flex-end"
                  sx={{ mt: 2 }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => updateStatus(item.id, "accepted")}
                  >
                    Accept
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => updateStatus(item.id, "rejected")}
                  >
                    Reject
                  </Button>
                </Stack>

              </Stack>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default PendingApplications;