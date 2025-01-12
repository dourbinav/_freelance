import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Product } from './Product';
import { ProductDetail } from './ProductDetail';
import { Watches } from './Watches';
import {Clothes} from "./Clothes";

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
      <AppBar position="static" style={{  boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
            OutFitTrend Store
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Transparent AppBar for Shoes and Watches in a row */}
      <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar style={{ justifyContent: 'center' }}>
          <List style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
            <ListItem button component={Link} to="/clothes"  style={{ width: 'auto' }}>
              <ListItemText primary="Clothes" />
            </ListItem>
            <ListItem button component={Link} to="/" style={{ width: 'auto' }}>
              <ListItemText primary="Shoes" />
            </ListItem>
            <ListItem button component={Link} to="/watches" style={{ width: 'auto' }}>
              <ListItemText primary="Watches" />
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>


      {/* Routes */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Product />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/Clothes" element={<Clothes />} />
        <Route path="/watches" element={<Watches />} />
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
