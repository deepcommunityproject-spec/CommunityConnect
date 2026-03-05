import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Typography,
  Stack,
  Chip,
  Divider,
  Box
} from "@mui/material";
import axiosInstance from "../../../api/axios";

const OrganizerHistory = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axiosInstance.get("organizers/history/");
    setData(res.data);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    if (status === "accepted") return "success";
    if (status === "rejected") return "error";
    return "default";
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Application History
      </Typography>

      {data.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No completed application history yet.
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
                "&:hover": { boxShadow: 6 }
              }}
            >
              <Stack spacing={2}>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6"
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
                    label={item.status.toUpperCase()}
                    color={getStatusColor(item.status)}
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Stack>

                <Divider />

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Opportunity
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {item.opportunity}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Applied At
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(item.applied_at)}
                  </Typography>
                </Box>

              </Stack>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default OrganizerHistory;