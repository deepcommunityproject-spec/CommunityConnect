import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

// Layout & Common components (kept synchronous for immediate rendering)
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProtectedRoute from "./ProtectedRoute";

// Pages: Lazy loaded to decrease main bundle size
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Login = lazy(() => import("../modules/authentication/pages/Login"));
const Register = lazy(() => import("../modules/authentication/pages/Register"));
const Home = lazy(() => import("../modules/users/pages/Home"));
const Profile = lazy(() => import("../modules/users/pages/Profile"));
const VolunteerHistory = lazy(() => import("../modules/users/pages/VolunteerHistory"));
const OrganizationDetail = lazy(() => import("../modules/users/pages/OrganizationDetail"));
const OpportunityDetail = lazy(() => import("../modules/users/pages/OpportunityDetail"));

// Organizer Pages: Lazy loaded
const OrganizerProfile = lazy(() => import("../modules/organizers/pages/OrganizerProfile"));
const MyOpportunities = lazy(() => import("../modules/organizers/pages/MyOpportunities"));
const PendingApplications = lazy(() => import("../modules/organizers/pages/PendingApplications"));
const CreateOpportunity = lazy(() => import("../modules/organizers/pages/CreateOpportunity"));
const OrganizerHistory = lazy(() => import("../modules/organizers/pages/OrganizerHistory"));
const OrgOpportunityDetail = lazy(() => import("../modules/organizers/pages/OrgOpportunityDetail"));
const UpdateOpportunity = lazy(() => import("../modules/organizers/pages/UpdateOpportunity"));
const VolunteerDetail = lazy(() => import("../modules/organizers/pages/VolunteerDetail"));
const PreviousOpportunity = lazy(() => import("../modules/organizers/pages/PreviousOpportunity"));

// Fallback loader component while routes are downloading
const SuspenseLoader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

/**
 * LayoutWrapper handles the rendering of the Navbar and Footer.
 * It dynamically hides them on authentication-related routes like Login/Register.
 */
const LayoutWrapper = ({ children }) => {
  const location = useLocation();

  // Check if current route should omit the main layout
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
      {/* Conditionally render header/navbar */}
      {!hideLayout && <Navbar />}

      {/* Main content area */}
      <Box sx={{ flex: 1 }}>{children}</Box>

      {/* Conditionally render footer */}
      {!hideLayout && <Footer />}
    </Box>
  );
};

/**
 * AppRoutes defines the core routing for the application.
 * All route components are lazy-loaded within a Suspense block.
 */
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Suspense fallback={<SuspenseLoader />}>
          <Routes>
            {/* Authentication Routes */} 
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} /> 
            
            {/* Volunteer / General User Routes */} 
            <Route path="/" element={ <ProtectedRoute> <Home /> </ProtectedRoute> } /> 
            <Route path="/profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute> } /> 
            <Route path="/history" element={ <ProtectedRoute> <VolunteerHistory /> </ProtectedRoute> } /> 
            <Route path="/opportunity/:id" element={ <ProtectedRoute> <OpportunityDetail /> </ProtectedRoute> } /> 
            <Route path="/organization/:id" element={ <ProtectedRoute> <OrganizationDetail /> </ProtectedRoute> } />
            
            {/* Organizer Role Routes */} 
            <Route path="/org/profile" element={ <ProtectedRoute> <OrganizerProfile /> </ProtectedRoute> } /> 
            <Route path="/org/opportunities" element={ <ProtectedRoute> <MyOpportunities /> </ProtectedRoute> } /> 
            <Route path="/org/pending" element={ <ProtectedRoute> <PendingApplications /> </ProtectedRoute> } /> 
            <Route path="/org/history" element={ <ProtectedRoute> <OrganizerHistory /> </ProtectedRoute> } /> 
            <Route path="/org/create" element={ <ProtectedRoute> <CreateOpportunity /> </ProtectedRoute> } /> 
            <Route path="/org/opportunity/:id" element={ <ProtectedRoute> <OrgOpportunityDetail /> </ProtectedRoute> } /> 
            <Route path="/org/opportunity/update/:id" element={ <ProtectedRoute> <UpdateOpportunity /> </ProtectedRoute> } /> 
            <Route path="/org/volunteer/:id" element={ <ProtectedRoute> <VolunteerDetail /> </ProtectedRoute> } />
            <Route path="/org/previous-opportunities" element={ <ProtectedRoute> <PreviousOpportunity /> </ProtectedRoute>} />

            {/* Static / Public Routes */} 
            <Route path="/about" element={<About />} /> 
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </LayoutWrapper>
    </BrowserRouter>
  );
};

export default AppRoutes;