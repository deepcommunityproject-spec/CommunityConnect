import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Typography,
  Stack,
  Divider,
  Box
} from "@mui/material";
import axiosInstance from "../../../api/axios";

const OpportunityDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(
        `organizers/${id}/opportunity_detail/`
      );
      setData(res.data);
    };
    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!data) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>

      <Card sx={{ p: 4, borderRadius: 3 }}>

        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {data.title}
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {data.location}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={2}>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Description
            </Typography>
            <Typography>
              {data.description}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Start Date
            </Typography>
            <Typography>{formatDate(data.start_date)}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              End Date
            </Typography>
            <Typography>{formatDate(data.end_date)}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Total Slots
            </Typography>
            <Typography>{data.total_slots}</Typography>
          </Box>

        </Stack>

      </Card>

    </Container>
  );
};

export default OpportunityDetail;