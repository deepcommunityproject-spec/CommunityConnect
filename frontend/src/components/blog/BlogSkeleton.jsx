import { Card, Skeleton, Stack } from "@mui/material";

const BlogSkeleton = () => {
  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={1}>
        <Skeleton width="60%" height={30} />
        <Skeleton width="90%" />
        <Skeleton width="40%" />
      </Stack>
    </Card>
  );
};

export default BlogSkeleton;