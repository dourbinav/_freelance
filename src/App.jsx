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
      {/* First AppBar (Navbar) */}
      <AppBar 
        position="fixed"  // Fixed position to stick at the top
        style={{
          boxShadow: 'none', 
          width: '100%', 
          top: 0, 
          left: 0,
          height: '80px', // Increase navbar height here
        }}
      >
        <Toolbar style={{ height: '100%' ,backgroundColor:'#ffffff' }}> {/* Ensure toolbar height matches AppBar */}
          <Link to="/" style={{ textDecoration: 'none', flexGrow: 1 }}>
            <Typography variant="h5" style={{  color: 'black' }}>
              OutFitTrend Store
            </Typography>
          </Link>
          {/* Admin Icon */}
          <IconButton
            edge="end"
            // color="inherit"
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
        <Toolbar 
          // position="fixed" 
          style={{
            boxShadow: 'none', 
             backgroundColor:"#f8f8f8",
            top: '80px',  // Adjust for the height of the first AppBar
            width: '100%',
            marginTop: '50px',
            padding: '0',
            // transform: isScrollUp ? 'translateY(0)' : 'translateY(-100%)',
          }}
        >
          <Toolbar 
            style={{
              justifyContent: 'space-between',
              width: '100%',
              padding: '0',
              height: '60px',  // Increase height for this toolbar
            }}
          >
            {/* Use Grid to wrap Buttons for better control of layout on small screens */}
            <Grid container spacing={1} rowGap={1} justifyContent="space-between">
              <Grid item xs={6} sm={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/clothes"
                  sx={{
                    fontSize: isMobile ? '0.7rem' : '0.9rem', // Smaller font size here
                    backgroundColor: '#1976d2', // Darker blue color
                    borderRadius: 0, 
                    height: '48px', // Keep button height the same
                  }}
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
                  sx={{
                    fontSize: isMobile ? '0.7rem' : '0.9rem', // Smaller font size here
                    backgroundColor: '#1976d2', // Darker blue color
                    borderRadius: 0,
                    height: '48px', // Keep button height the same
                  }}
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
                  sx={{
                    fontSize: isMobile ? '0.7rem' : '0.9rem', // Smaller font size here
                    backgroundColor: '#1976d2', // Darker blue color
                    borderRadius: 0,
                    height: '48px', // Keep button height the same
                  }}
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
                  sx={{
                    fontSize: isMobile ? '0.7rem' : '0.9rem', // Smaller font size here
                    backgroundColor: '#1976d2', // Darker blue color
                    borderRadius: 0,
                    height: '48px', // Keep button height the same
                  }}
                >
                  Flip Flops
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Toolbar>
      )}

      {/* Add a margin-top to the main content to ensure it doesn't get hidden behind the fixed AppBar */}
      <Box style={{ marginTop: '150px' }}> {/* This margin accounts for the AppBar height and new height adjustments */}
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
