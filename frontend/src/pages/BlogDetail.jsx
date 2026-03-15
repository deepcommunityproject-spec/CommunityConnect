import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Stack,
  Box,
  Button
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axiosInstance from "../api/axios";
import BASE_URL from "../config/config";

const BlogDetail = () => {

  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await axiosInstance.get(`/blogs/detail/${slug}/`);
      setBlog(res.data);
    } catch (err) {
      console.error("Failed to fetch blog", err);
    }
  };

  // decide where back button should go
  const handleBack = () => {

    if (location.state?.from === "org") {
      navigate("/org/blogs");
    } else {
      navigate("/blogs");
    }

  };

  if (!blog) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>

      <Stack spacing={4}>

        {/* Back button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ width: "fit-content" }}
        >
          Back
        </Button>

        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            lineHeight: 1.3
          }}
        >
          {blog.title}
        </Typography>

        {/* Meta info */}
        <Typography
          color="text.secondary"
          sx={{ fontSize: 14 }}
        >
          {blog.reading_time} min read
        </Typography>

        {/* Cover image */}
        {blog.cover_image && (
          <Box
            component="img"
            src={`${BASE_URL}${blog.cover_image}`}
            sx={{
              width: "100%",
              borderRadius: 3,
              maxHeight: 420,
              objectFit: "cover"
            }}
          />
        )}

        {/* Blog content */}
        <Box
          className="blog-content"
          sx={{
            fontSize: 18,
            lineHeight: 1.8
          }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

      </Stack>

    </Container>
  );
};

export default BlogDetail;