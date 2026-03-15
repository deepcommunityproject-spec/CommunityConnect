import { useEffect, useState } from "react";
import { Container, Stack, Typography, Pagination } from "@mui/material";
import axiosInstance from "../api/axios";
import BlogCard from "../components/blog/BlogCard";
import BlogSkeleton from "../components/blog/BlogSkeleton";

const BlogList = () => {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(null);

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  const stripHtml = (text) => {
    if (!text) return "";
    return text.replace(/<[^>]*>/g, "");
  };

  const fetchBlogs = async (page) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/blogs/list_blogs/?page=${page}`);

      const { count, next, previous, results } = res.data;

      const cleanedBlogs = results.map((blog) => ({
        ...blog,
        excerpt: stripHtml(blog.excerpt)
      }));

      setBlogs(cleanedBlogs);

      // Dynamically calculate page size from first response
      // results.length on page 1 = page size (unless it's the last page)
      // So we use next/previous to figure out page size accurately
      let calculatedPageSize = pageSize;
      if (!calculatedPageSize) {
        // On first load, if there's a next page, results.length is exactly page size
        // If no next page, all results fit in one page
        calculatedPageSize = next ? results.length : count;
        setPageSize(calculatedPageSize);
      }

      setPageCount(Math.ceil(count / calculatedPageSize));

    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, page) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    fetchBlogs(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>

      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Blogs
      </Typography>

      <Stack spacing={3}>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <BlogSkeleton key={i} />
            ))
          : blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))
        }
      </Stack>

      <Pagination
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
        count={pageCount}
        page={currentPage}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
      />

    </Container>
  );
};

export default BlogList;