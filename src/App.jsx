import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Product } from './Product';
import { ProductDetail } from './ProductDetail';
import { Watches } from './Watches';
import { Clothes } from './Clothes';
import { Flipflop } from './Flipflop';
import AdminLogin from './AdminLogin';
import ProductPage from './ProductPage';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import AdminIcon from '@mui/icons-material/AccountCircle';

const AppContent = () => {
  const location = useLocation(); // Get the current route
  const isMobile = useMediaQuery('(max-width:600px)'); // Detect mobile screens
  const [isScrollUp, setIsScrollUp] = useState(true); // State to track scroll direction
  const [prevScrollY, setPrevScrollY] = useState(0); // To track the previous scroll position
  
  // Check if the current route should show the AppBar
  const shouldShowAppBar = location.pathname === '/' || location.pathname === '/clothes' || location.pathname === '/flipflop' || location.pathname === '/watches';

  // Handle scroll event
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // If scrolling down
    if (currentScrollY > prevScrollY) {
      setIsScrollUp(false); // Hide buttons on scroll down
    } else {
      setIsScrollUp(true); // Show buttons on scroll up
    }

    setPrevScrollY(currentScrollY); // Update previous scroll position
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]); // Re-run when prevScrollY changes

  return (
    <>
      <AppBar 
        position="fixed"  // Fixed position to stick at the top
        style={{ boxShadow: 'none', width: '100%', top: 0, left: 0 }}  // Ensure the AppBar stays fixed at the top
      >
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none', flexGrow: 1 }}>
            <Typography variant="h6" style={{ fontWeight: 'bold', color: 'white' }}>
              OutFitTrend Store
            </Typography>
          </Link>
          {/* Admin Icon */}
          <IconButton
            edge="end"
            color="inherit"
            component={Link}
            to="/admin"
            style={{ marginLeft: 'auto' }} // Position the admin icon to the right
          >
            <AdminIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Conditionally render AppBar for category navigation */}
      {shouldShowAppBar && (
        <AppBar 
          position="fixed"  // Fixed position but hide on scroll down
          style={{
            backgroundColor: 'transparent',
            boxShadow: 'none', 
            top: '64px',  // Adjust for the height of the first AppBar
            width: '100%',
            zIndex: 1000, // Ensure it's above the content
            transform: isScrollUp ? 'translateY(0)' : 'translateY(-100%)', // Hide on scroll down
            transition: 'transform 0.3s ease', // Smooth transition
          }}
        >
          <Toolbar style={{ justifyContent: 'center' }}>
            {/* Use Grid to wrap Buttons for better control of layout on small screens */}
            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={6} sm={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/clothes"
                  sx={{ fontSize: isMobile ? '0.9rem' : '1.2rem', backgroundColor: '#2196f3' }} // Custom background color
                >
                  Clothes
                </Button>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/"
                  sx={{ fontSize: isMobile ? '0.9rem' : '1.2rem', backgroundColor: '#2196f3' }} // Custom background color
                >
                  Shoes
                </Button>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/watches"
                  sx={{ fontSize: isMobile ? '0.9rem' : '1.2rem', backgroundColor: '#2196f3' }} // Custom background color
                >
                  Watches
                </Button>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/flipflop"
                  sx={{ fontSize: isMobile ? '0.9rem' : '1.2rem', backgroundColor: '#2196f3' }} // Custom background color
                >
                  Flip Flops
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      )}

      {/* Add a margin-top to the main content to ensure it doesn't get hidden behind the fixed AppBar */}
      <Box style={{ marginTop: '160px' }}> {/* This margin accounts for the AppBar height */}
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/productdetail/:id/:category" element={<ProductDetail />} />
          <Route path="/Clothes" element={<Clothes />} />
          <Route path="/watches" element={<Watches />} />
          <Route path="/flipflop" element={<Flipflop />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={localStorage.getItem('admin-auth') ? <ProductPage /> : <AdminLogin />}
          />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Box>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
