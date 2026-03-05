import { Container, Typography, Paper } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper sx={{ p: 5 }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>

        <Typography component="p" sx={{ mb: 2 }}>
          The CommunityConnect is designed to connect passionate volunteers
          with impactful organizations. Our goal is to streamline the process
          of discovering opportunities, applying, and managing volunteer work
          in a secure and structured environment.
        </Typography>

        <Typography component="p" sx={{ mb: 2 }}>
          We believe that volunteering should be simple, transparent, and
          accessible. Our system ensures role-based access control, secure
          authentication, and efficient management of applications.
        </Typography>

        <Typography component="p" sx={{ mb: 2 }}>
          Organizers can create opportunities, review applications, and manage
          volunteer engagement effectively. Volunteers can browse opportunities,
          apply instantly, and track their application history.
        </Typography>

        <Typography component="p" sx={{ mb: 2 }}>
          This platform focuses on professionalism, clarity, and user
          experience. With a smooth interface and structured workflow, we aim
          to create a reliable ecosystem for social impact initiatives.
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;