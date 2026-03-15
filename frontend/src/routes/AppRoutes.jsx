import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import Landing from "../pages/Landing";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Login from "../modules/authentication/pages/Login";
import Register from "../modules/authentication/pages/Register";
import Home from "../modules/users/pages/Home";
import Profile from "../modules/users/pages/Profile";
import VolunteerHistory from "../modules/users/pages/VolunteerHistory";
import OrganizationDetail from "../modules/users/pages/OrganizationDetail";
import ProtectedRoute from "./ProtectedRoute";
import OpportunityDetail from "../modules/users/pages/OpportunityDetail";
import OrganizerProfile from "../modules/organizers/pages/OrganizerProfile";
import MyOpportunities from "../modules/organizers/pages/MyOpportunities";
import PendingApplications from "../modules/organizers/pages/PendingApplications";
import CreateOpportunity from "../modules/organizers/pages/CreateOpportunity";
import OrganizerHistory from "../modules/organizers/pages/OrganizerHistory";
import OrgOpportunityDetail from "../modules/organizers/pages/OrgOpportunityDetail";
import UpdateOpportunity from "../modules/organizers/pages/UpdateOpportunity";
import VolunteerDetail from "../modules/organizers/pages/VolunteerDetail";
import PreviousOpportunity from "../modules/organizers/pages/PreviousOpportunity";
import BlogList from "../pages/BlogList";
import BlogDetail from "../pages/BlogDetail";
import MyBlogs from "../modules/organizers/blogs/MyBlogs";
import CreateBlog from "../modules/organizers/blogs/CreateBlog";
import EditBlog from "../modules/organizers/blogs/EditBlog";

const LayoutWrapper = ({ children }) => {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {!hideLayout && <Navbar />}

      <Box sx={{ flex: 1 }}>{children}</Box>

      {!hideLayout && <Footer />}
    </Box>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          {/* Authentication */} 
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          
          {/* Public landing page */}
          <Route path="/" element={<Landing />} />

          {/* Volunteer */} 
          <Route path="/home" element={ <ProtectedRoute> <Home /> </ProtectedRoute> } /> 
          <Route path="/profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute> } /> 
          <Route path="/history" element={ <ProtectedRoute> <VolunteerHistory /> </ProtectedRoute> } /> 
          <Route path="/opportunity/:id" element={ <ProtectedRoute> <OpportunityDetail /> </ProtectedRoute> } /> 
          <Route path="/organization/:id" element={ <ProtectedRoute> <OrganizationDetail /> </ProtectedRoute> } />
          
          {/* Organizer */} 
          <Route path="/org/profile" element={ <ProtectedRoute> <OrganizerProfile /> </ProtectedRoute> } /> 
          <Route path="/org/opportunities" element={ <ProtectedRoute> <MyOpportunities /> </ProtectedRoute> } /> 
          <Route path="/org/pending" element={ <ProtectedRoute> <PendingApplications /> </ProtectedRoute> } /> 
          <Route path="/org/history" element={ <ProtectedRoute> <OrganizerHistory /> </ProtectedRoute> } /> 
          <Route path="/org/create" element={ <ProtectedRoute> <CreateOpportunity /> </ProtectedRoute> } /> 
          <Route path="/org/opportunity/:id" element={ <ProtectedRoute> <OrgOpportunityDetail /> </ProtectedRoute> } /> 
          <Route path="/org/opportunity/update/:id" element={ <ProtectedRoute> <UpdateOpportunity /> </ProtectedRoute> } /> 
          <Route path="/org/volunteer/:id" element={ <ProtectedRoute> <VolunteerDetail /> </ProtectedRoute> } />
          <Route path="/org/previous-opportunities" element={ <ProtectedRoute> <PreviousOpportunity /> </ProtectedRoute> } />

          {/* Blogs */}
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />

          <Route path="/org/blogs" element={<ProtectedRoute> <MyBlogs /> </ProtectedRoute> } />
          <Route path="/org/blogs/create" element={<ProtectedRoute> <CreateBlog /> </ProtectedRoute> } />
          <Route path="/org/blogs/edit/:id" element={ <ProtectedRoute> <EditBlog /> </ProtectedRoute> } />

          {/* Static Pages */} 
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
};

export default AppRoutes;