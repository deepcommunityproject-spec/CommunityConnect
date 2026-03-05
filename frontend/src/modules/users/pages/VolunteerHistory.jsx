import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Typography, Stack } from "@mui/material";
import axiosInstance from "../../../api/axios";

const VolunteerHistory = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axiosInstance.get("users/history/");
    setData(res.data);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      {data.length === 0 ? (
        <Typography align="center" color="text.secondary">
          You haven’t applied to any opportunities yet.
        </Typography>
      ) : (
        <Stack spacing={3}>
          {data.map((item) => (
            <Card key={item.id} sx={{ p: 3 }}>
              <Typography variant="h6">
                {item.opportunity}
              </Typography>

              <Typography variant="h6"
                sx={{
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" }
                }}
                onClick={() =>
                  navigate(`/organization/${item.organization_id}`)
                }
              >
                 Organization: {item.organization}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                Status: <strong>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</strong>
              </Typography>

              <Typography sx={{ mt: 1 }}>
                <strong>Applied at:</strong>{" "}
                {formatDate(item.applied_at)}
              </Typography>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default VolunteerHistory;