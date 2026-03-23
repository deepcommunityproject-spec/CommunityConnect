import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { logoutUser } from "../../modules/authentication/services/authService";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmDialog from "../common/ConfirmDialog";
import logo from '../../assets/communityconnect.png';

const UnifiedNavbar = () => {
  const [role, setRole] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesMenuAnchor, setResourcesMenuAnchor] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Public menu items
  const publicMenuItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      try {
        const parsed = JSON.parse(userData);
        const userRole = parsed.role;
        setRole(userRole);

        // Fix: redirect organizer if landed on volunteer page
        if (userRole === "organizer" && window.location.pathname === "/") {
          navigate("/org/opportunities");
        }
      } catch {
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (mobileOpen) setMobileOpen(false);
  };

  const handleLogout = async () => {
    setLogoutDialogOpen(true);
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      // Clear all JWT tokens and user data from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local data even if API call fails
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");
      navigate("/login");
    } finally {
      setIsLoggingOut(false);
      setLogoutDialogOpen(false);
    }
  };

  const cancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  const handleResourcesMenuOpen = (event) => {
    setResourcesMenuAnchor(event.currentTarget);
  };

  const handleResourcesMenuClose = () => {
    setResourcesMenuAnchor(null);
  };

  const handleResourcesMenuItemClick = (path) => {
    handleResourcesMenuClose();
    navigate(path);
  };

  // Mobile drawer content
  const drawerContent = (
    <Box sx={{ width: 280, pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 2 }}>
        <Typography variant="h6" color="white" sx={{ fontWeight: 600 }}>
          {role ? 'Menu' : 'Community Connect'}
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List>
        {/* Public menu items */}
        {!role && publicMenuItems.map((item) => (
          <ListItem
            button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}

        {/* Public auth buttons */}
        {!role && (
          <>
            <ListItem
              button
              onClick={() => handleNavigation('/login')}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem
              button
              onClick={() => handleNavigation('/register')}
              sx={{
                color: '#ffd700',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <ListItemText primary="Register" sx={{ fontWeight: 600 }} />
            </ListItem>
          </>
        )}

        {/* Volunteer menu items */}
        {role === "volunteer" && (
          <>
            <ListItem 
              component={RouterLink} 
              to="/opportunities" 
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }
              }}
            >
              <ListItemText primary="Opportunities" />
            </ListItem>
            <ListItem 
              component={RouterLink} 
              to="/volunteer-blogs" 
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }
              }}
            >
              <ListItemText primary="Blogs" />
            </ListItem>
            <ListItem 
              component={RouterLink} 
              to="/guide" 
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }
              }}
            >
              <ListItemText primary="Volunteer Guide" />
            </ListItem>
            <ListItem 
              component={RouterLink} 
              to="/history" 
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }
              }}
            >
              <ListItemText primary="History" />
            </ListItem>
            <ListItem 
              component={RouterLink} 
              to="/profile" 
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }
              }}
            >
              <ListItemText primary="Profile" />
            </ListItem>
          </>
        )}
        
        {/* Organizer menu items */}
        {role === "organizer" && (
          <>
            <ListItem 
              component={RouterLink} 
              to="/org/opportunities" 
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }
              }}
            >
              <ListItemText primary="My Opportunities" />
            </ListItem>
            <ListItem 
              component={RouterLink} 
              to="/org/pending" 
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }
              }}
            >
              <ListItemText primary="Pending Requests" />
            </ListItem>
            <ListItem 
              component={RouterLink} 
              to="/org/guide" 
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }
              }}
            >
              <ListItemText primary="Organization Guide" />
            </ListItem>
            <ListItem 
              component={RouterLink} 
              to="/org/history" 
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }
              }}
            >
              <ListItemText primary="History" />
            </ListItem>
            <ListItem 
              component={RouterLink} 
              to="/org/profile" 
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }
              }}
            >
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem 
              component={RouterLink} 
              to='/org/blogs' 
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }
              }}
            >
              <ListItemText primary="My Blogs" />
            </ListItem> 
          </>
        )}
        
        {/* Common menu items for authenticated users */}
        {role && (
          <>
            <ListItem 
              component={RouterLink} 
              to="/about" 
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }
              }}
            >
              <ListItemText primary="About" />
            </ListItem>
            <ListItem 
              component={RouterLink} 
              to="/faq" 
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }
              }}
            >
              <ListItemText primary="FAQ" />
            </ListItem>
            <ListItem 
              component={RouterLink} 
              to="/contact" 
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }
              }}
            >
              <ListItemText primary="Contact" />
            </ListItem>
            <ListItem 
              onClick={() => { handleLogout(); handleDrawerToggle(); }}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }
              }}
            >          
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: '#ffffff',
          boxShadow: '0 1px 0 rgba(0,0,0,0.08)',
          color: '#1a1a2e',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
            {/* Logo */}
            <Box
              component={RouterLink}
              to={role === "organizer" ? "/org/opportunities" : "/"}
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'white',
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '4px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                <Box
                  component="img"
                  src={logo}
                  alt="CommunityConnect"
                  sx={{
                    height: 42,
                    width: 'auto',
                    maxWidth: '90px',
                    display: 'block',
                  }}
                />
              </Box>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Public Navigation */}
                {!role && publicMenuItems.map((item) => (
                  <Button
                    key={item.path}
                    color="inherit"
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: '#333',
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.04)',
                        color: '#e65100',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

                {/* Volunteer Navigation */}
                {role === "volunteer" && (
                  <>
                    <Button 
                      color="inherit" 
                      component={RouterLink} 
                      to="/opportunities"
                      sx={{
                        color: '#333',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        textTransform: 'none',
                        borderRadius: '8px',
                        px: 2,
                        py: 1,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.04)',
                          color: '#e65100',
                          transform: 'translateY(-1px)',
                        }
                      }}
                    >
                      Opportunities
                    </Button>
                    <Button 
                      color="inherit" 
                      component={RouterLink} 
                      to="/volunteer-blogs"
                      sx={{
                        color: '#333',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        textTransform: 'none',
                        borderRadius: '8px',
                        px: 2,
                        py: 1,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.04)',
                          color: '#e65100',
                          transform: 'translateY(-1px)',
                        }
                      }}
                    >
                      Blogs
                    </Button>
                    <Button 
                      color="inherit" 
                      component={RouterLink} 
                      to="/history"
                      sx={{
                        color: '#333',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        textTransform: 'none',
                        borderRadius: '8px',
                        px: 2,
                        py: 1,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.04)',
                          color: '#e65100',
                          transform: 'translateY(-1px)',
                        }
                      }}
                    >
                      History
                    </Button>
                    <Button 
                      color="inherit" 
                      component={RouterLink} 
                      to="/profile"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        textTransform: 'none',
                        borderRadius: '8px',
                        px: 2,
                        py: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          color: 'white',
                          transform: 'translateY(-1px)',
                        }
                      }}
                    >
                      Profile
                    </Button>
                  </>
                )}

                {/* Organizer Navigation */}
                {role === "organizer" && (
                  <>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/org/opportunities"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        textTransform: 'none',
                        borderRadius: '8px',
                        px: 2,
                        py: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          color: 'white',
                          transform: 'translateY(-1px)',
                        }
                      }}
                    >
                     Opportunities
                    </Button>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/org/pending"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        textTransform: 'none',
                        borderRadius: '8px',
                        px: 2,
                        py: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          color: 'white',
                          transform: 'translateY(-1px)',
                        }
                      }}
                    >
                      Pending Requests
                    </Button>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/org/history"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        textTransform: 'none',
                        borderRadius: '8px',
                        px: 2,
                        py: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          color: 'white',
                          transform: 'translateY(-1px)',
                        }
                      }}
                    >
                      History
                    </Button>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/org/profile"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        textTransform: 'none',
                        borderRadius: '8px',
                        px: 2,
                        py: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          color: 'white',
                          transform: 'translateY(-1px)',
                        }
                      }}
                    >
                      Profile
                    </Button>
                    <Button
                      color="inherit"
                      component={RouterLink} 
                      to="/org/blogs"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        textTransform: 'none',
                        borderRadius: '8px',
                        px: 2,
                        py: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          color: 'white',
                          transform: 'translateY(-1px)',
                        }
                      }}
                    >
                      My Blogs
                    </Button>
                  </>
                )}

                {/* Common Resources Menu for authenticated users */}
                {role && (
                  <>
                    <Button
                      color="inherit"
                      onMouseEnter={handleResourcesMenuOpen}
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        textTransform: 'none',
                        borderRadius: '8px',
                        px: 2,
                        py: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': { 
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          color: 'white',
                          transform: 'translateY(-1px)',
                        }
                      }}
                    >
                      Resources
                    </Button>

                    <Menu
                      anchorEl={resourcesMenuAnchor}
                      open={Boolean(resourcesMenuAnchor)}
                      onClose={handleResourcesMenuClose}
                      onMouseLeave={handleResourcesMenuClose}
                      MenuListProps={{
                        onMouseLeave: handleResourcesMenuClose,
                      }}
                      PaperProps={{
                        sx: {
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(20px)',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                          mt: 1,
                          minWidth: '200px',
                        }
                      }}
                      sx={{
                        '& .MuiMenuItem-root': {
                          color: '#333',
                          fontWeight: 500,
                          fontSize: '0.9rem',
                          borderRadius: '8px',
                          mx: 1,
                          my: 0.5,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(2, 136, 209, 0.1)',
                            color: '#0288d1',
                          },
                        },
                      }}
                    >
                      {role === "organizer" && (
                        <MenuItem onClick={() => handleResourcesMenuItemClick("/org/guide")}>
                          Organization Guide
                        </MenuItem>
                      )}
                      {role === "volunteer" && (
                        <MenuItem onClick={() => handleResourcesMenuItemClick("/guide")}>
                          Volunteer Guide
                        </MenuItem>
                      )}
                      <MenuItem onClick={() => handleResourcesMenuItemClick("/about")}>
                        About
                      </MenuItem>
                      <MenuItem onClick={() => handleResourcesMenuItemClick("/terms")}>
                        Terms and Conditions
                      </MenuItem>
                      <MenuItem onClick={() => handleResourcesMenuItemClick("/privacy")}>
                        Privacy Policy
                      </MenuItem>
                      <MenuItem onClick={() => handleResourcesMenuItemClick("/faq")}>
                        FAQ
                      </MenuItem>
                      <MenuItem onClick={() => handleResourcesMenuItemClick("/contact")}>
                        Contact
                      </MenuItem>
                    </Menu>

                    {/* Logout Button */}
                    <Button
                      color="inherit"
                      onClick={handleLogout}
                      sx={{
                        color: '#333',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        textTransform: 'none',
                        borderRadius: '8px',
                        px: 2,
                        py: 1,
                        transition: 'all 0.2s ease',
                        backgroundColor: 'rgba(0,0,0,0.04)',
                        border: '1px solid rgba(0,0,0,0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(230,81,0,0.08)',
                          color: '#e65100',
                          border: '1px solid rgba(230,81,0,0.2)',
                        }
                      }}
                    >
                      Logout
                    </Button>
                  </>
                )}

                {/* Public Auth Buttons */}
                {!role && (
                  <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={() => navigate('/login')}
                      sx={{
                        borderColor: '#e65100',
                        color: '#e65100',
                        textTransform: 'none',
                        '&:hover': {
                          borderColor: '#e65100',
                          backgroundColor: 'rgba(230,81,0,0.04)',
                        },
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/register')}
                      sx={{
                        borderColor: '#e65100',
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: '8px',
                        px: 2.5,
                        backgroundColor: '#e65100',
                        '&:hover': {
                          backgroundColor: '#bf360c',
                          borderColor: '#bf360c',
                          color: 'white',
                        },
                      }}
                    >
                      Register
                    </Button>
                  </Box>
                )}
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ color: 'white' }}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
          </Toolbar>
        </Container>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          PaperProps={{
            sx: {
              width: 280,
              background: '#1a1a2e',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </AppBar>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        open={logoutDialogOpen}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
        title="Confirm Logout"
        message="Are you sure you want to logout? You will need to login again to access your account."
        confirmText="Logout"
        cancelText="Cancel"
        type="warning"
        loading={isLoggingOut}
      />
    </>
  );
};

export default UnifiedNavbar;
