import { Card, Typography, Stack, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/config";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Card
      onClick={() => navigate(`/blogs/${blog.slug}`)}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        cursor: "pointer",
        p: 3,
        transition: "0.25s",
        borderRadius: 3,
        "&:hover": { boxShadow: 6 },
      }}
    >
      <Stack spacing={1} sx={{ flex: 1, pr: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700 }}
        >
          {blog.title}
        </Typography>

        <Typography color="text.secondary">
          {blog.excerpt}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Typography variant="caption">
            {formatDate(blog.created_at)}
          </Typography>

          <Typography variant="caption">
            {blog.reading_time} min read
          </Typography>
        </Stack>
      </Stack>

      {blog.cover_image && (
        <Box
          component="img"
          src={`${BASE_URL}${blog.cover_image}`}
          sx={{
            width: 140,
            height: 100,
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
      )}
    </Card>
  );
};

export default BlogCard;