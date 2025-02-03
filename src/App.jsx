import React from 'react';
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
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import AdminIcon from '@mui/icons-material/AccountCircle';  // You can use a material icon for admin, or import your own logo

const AppContent = () => {
  const location = useLocation(); // Get the current route

  // Check if the current route should hide the AppBar
  const shouldHideAppBar = location.pathname === '/admin' || location.pathname === '/adminlogin';

  return (
    <>
      <AppBar position="static" style={{ boxShadow: 'none' }}>
        <Toolbar>
          <Link  to="/">
          {/* OutFitTrend Store Logo - Links to the homepage */}
          <Typography 
            variant="h6" 
            style={{ flexGrow: 1, fontWeight: 'bold',color:'white' }}
          >
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
            <AdminIcon /> {/* You can replace this with your own admin logo */}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Conditionally render AppBar for category navigation */}
      {!shouldHideAppBar && (
        <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Toolbar style={{ justifyContent: 'center' }}>
            <List style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
              <ListItem button component={Link} to="/clothes" style={{ width: 'auto' }}>
                <ListItemText primary="Clothes" />
              </ListItem>
              <ListItem button component={Link} to="/" style={{ width: 'auto' }}>
                <ListItemText primary="Shoes" />
              </ListItem>
              <ListItem button component={Link} to="/watches" style={{ width: 'auto' }}>
                <ListItemText primary="Watches" />
              </ListItem>
              <ListItem button component={Link} to="/Flipflop" style={{ width: 'auto' }}>
                <ListItemText primary="Flip Flops" />
              </ListItem>
            </List>
          </Toolbar>
        </AppBar>
      )}

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
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
