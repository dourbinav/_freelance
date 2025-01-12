import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Product } from './Product';
import { ProductDetail } from './ProductDetail';
import { Sidebar } from './Sidebar';
import Home from './Home';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const AppContent = () => {
  const location = useLocation(); // Now within Router context
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Dynamic headings based on the current path
  const headings = {
    '/': 'Trending Products',
    '/product': 'Shoes',
    '/sidebar': 'Watches',
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            {headings[location.pathname] || 'Trending Products'}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar}>
        <List>
          {/* <ListItem button component={Link} to="/" onClick={toggleSidebar}>
            <ListItemText primary="Home" />
          </ListItem> */}
          <ListItem button component={Link} to="/" onClick={toggleSidebar}>
            <ListItemText primary="Shoes" />
          </ListItem>
          <ListItem button component={Link} to="/sidebar" onClick={toggleSidebar}>
            <ListItemText primary="Watches" />
          </ListItem>
        </List>
      </Drawer>

      {/* Routes */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Product />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/sidebar" element={<Sidebar />} />
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
