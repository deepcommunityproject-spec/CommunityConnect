import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Typography,
  Avatar,
  Stack,
  Divider,
  Box
} from "@mui/material";
import axiosInstance from "../../../api/axios";

const VolunteerDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const res = await axiosInstance.get(
          `organizers/${id}/view-volunteer/`
        );
        setData(res.data);
    };
    fetchData();
  }, [id]);


  if (!data) return null;

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>

      <Card sx={{ p: 4, borderRadius: 3 }}>

        <Stack spacing={3} alignItems="center">

          <Avatar
            src={data.image}
            sx={{ width: 100, height: 100 }}
          />

          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {data.name}
          </Typography>

          <Typography color="text.secondary">
            {data.phone}
          </Typography>

        </Stack>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            About Volunteer
          </Typography>

          <Typography variant="body1">
            {data.bio || "No bio provided"}
          </Typography>
        </Box>

      </Card>

    </Container>
  );
};

export default VolunteerDetail;