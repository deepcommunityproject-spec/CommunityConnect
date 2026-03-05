import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Typography,
  Stack,
  Button,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axios";

const MyOpportunities = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axiosInstance.get(
      "organizers/my_opportunities/"
    );
    setData(res.data);
  };

  const handleDeactivate = async (id) => {
    try {
      await axiosInstance.patch(
        `organizers/${id}/deactivate_opportunity/`
      );

      // remove immediately from UI
      setData((prev) => prev.filter((item) => item.id !== id));

    } catch (err) {
      console.error("Deactivate failed", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 4 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          My Opportunities
        </Typography>

        <Stack direction="row" spacing={2}>

          <Button
            variant="contained"
            onClick={() => navigate("/org/create")}
          >
            Create Opportunity
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate("/org/previous-opportunities")}
          >
            Previous Opportunities
          </Button>

        </Stack>
      </Stack>

      <Stack spacing={3}>
        {data.length === 0 && (
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", mt: 4 }}
          >
            You haven't created any opportunities yet.
          </Typography>
        )}

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

              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {item.title}
              </Typography>

              <Typography color="text.secondary">
                {item.location}
              </Typography>

              <Box>
                <Button
                  size="small"
                  onClick={() =>
                    navigate(`/org/opportunity/${item.id}`)
                  }
                >
                  View
                </Button>

                <Button
                  size="small"
                  onClick={() =>
                    navigate(`/org/opportunity/update/${item.id}`)
                  }
                >
                  Edit
                </Button>

                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDeactivate(item.id)}
                >
                  Deactivate
                </Button>
              </Box>

            </Stack>
          </Card>
        ))}
      </Stack>

    </Container>
  );
};

export default MyOpportunities;