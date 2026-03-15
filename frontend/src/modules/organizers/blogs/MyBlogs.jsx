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

const MyBlogs = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/blogs/my_blogs/");
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/blogs/${id}/delete_blog/`);

      // remove instantly from UI
      setData((prev) => prev.filter((item) => item.id !== id));

    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const stripHtml = (text) => {
    return text.replace(/<[^>]+>/g, "");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 4 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          My Blogs
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/org/blogs/create")}
        >
          Create Blog
        </Button>

      </Stack>

      <Stack spacing={3}>

        {data.length === 0 && (
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", mt: 4 }}
          >
            You haven't created any blogs yet.
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
                {stripHtml(item.excerpt)}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {formatDate(item.created_at)} • {item.reading_time} min read
              </Typography>

              <Box>

                <Button
                  size="small"
                  onClick={() =>
                    navigate(`/blogs/${item.slug}`, { state: { from: "org" } })
                  }
                >
                  View
                </Button>

                <Button
                  size="small"
                  onClick={() =>
                    navigate(`/org/blogs/edit/${item.id}`)
                  }
                >
                  Edit
                </Button>

                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>

              </Box>

            </Stack>

          </Card>

        ))}

      </Stack>

    </Container>
  );
};

export default MyBlogs;