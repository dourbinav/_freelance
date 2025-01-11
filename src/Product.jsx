import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';

// Temporary data
const products = [
  {
    id: 1,
    name: 'Shoes',
    price: '$50',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.31.59_PM_c7xb2e.jpg', // Replace with actual image URLs
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Shoes',
  },
  {
    id: 2,
    name: 'Watches',
    price: '$100',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.32.01_PM_3_ok1pr4.jpg',
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Watches',
  },
  {
    id: 3,
    name: 'Shoes',
    price: '$30',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.32.02_PM_fg54pf.jpg',
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Hoodies',
  },
  {
    id: 4,
    name: 'Shoes',
    price: '$30',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.32.01_PM_usmzcg.jpg',
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Hoodies',
  },
  {
    id: 5,
    name: 'Shoes',
    price: '$50',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.32.01_PM_2_cjj1zt.jpg', // Replace with actual image URLs
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Shoes',
  },
  {
    id: 6,
    name: 'Watches',
    price: '$100',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.32.01_PM_2_cjj1zt.jpg',
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Watches',
  },
  {
    id: 7,
    name: 'Shoes',
    price: '$30',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.32.01_PM_1_crldrx.jpg',
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Hoodies',
  },
  {
    id: 8,
    name: 'Shoes',
    price: '$30',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.32.02_PM_fg54pf.jpg',
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Hoodies',
  },
  {
    id: 9,
    name: 'Shoes',
    price: '$50',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.31.59_PM_2_fhyscb.jpg', // Replace with actual image URLs
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Shoes',
  },
  {
    id: 10,
    name: 'Watches',
    price: '$100',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581781/WhatsApp_Image_2025-01-09_at_10.31.56_PM_gdqo20.jpg',
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Watches',
  },
  {
    id: 11,
    name: 'Shoes',
    price: '$30',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.31.59_PM_1_plehu5.jpg',
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Hoodies',
  },
  {
    id: 12,
    name: 'Shoes',
    price: '$30',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.31.59_PM_1_plehu5.jpg',
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Hoodies',
  },
  {
    id: 13,
    name: 'Shoes',
    price: '$50',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.31.59_PM_1_plehu5.jpg', // Replace with actual image URLs
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Shoes',
  },
  {
    id: 14,
    name: 'Shoes',
    price: '$100',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.31.58_PM_tfbrrz.jpg',
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Watches',
  },
  {
    id: 15,
    name: 'Shoes',
    price: '$30',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581781/WhatsApp_Image_2025-01-09_at_10.32.00_PM_1_qypivr.jpg',
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Hoodies',
  },
  {
    id: 15,
    name: 'Shoes',
    price: '$30',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581781/WhatsApp_Image_2025-01-09_at_10.31.57_PM_dcp35v.jpg',
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Hoodies',
  },
  {
    id: 16,
    name: 'Shoes',
    price: '$50',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581781/WhatsApp_Image_2025-01-09_at_10.32.00_PM_gdjmel.jpg', // Replace with actual image URLs
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Shoes',
  },
  {
    id: 2,
    name: 'Watches',
    price: '$100',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.32.01_PM_3_ok1pr4.jpg',
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Watches',
  },
  {
    id: 3,
    name: 'Shoes',
    price: '$30',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.32.02_PM_fg54pf.jpg',
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Hoodies',
  },
  {
    id: 3,
    name: 'Shoes',
    price: '$30',
    image: 'https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.32.02_PM_fg54pf.jpg',
    whatsappLink: 'https://wa.me/1234567890?text=I%20am%20interested%20in%20Hoodies',
  },
];

export const Product = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid
            item
            xs={6} // 2 products per row on small screens
            sm={6} // 2 products per row on medium screens
            md={4} // 3 products per row on large screens
            lg={3} // 4 products per row on extra-large screens
            key={product.id}
          >
            <Card style={{ height: '100%' }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                style={{
                  objectFit: 'cover',
                  height: '200px',
                  width: '100%',
                }} // Ensure image is fully visible
              />
              <CardContent>
                <Typography
                  variant="h6"
                  style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', // Dynamically adjusts font size
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    fontSize: 'clamp(0.8rem, 2vw, 1.2rem)', // Dynamically adjusts font size
                  }}
                >
                  Price: {product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  href={product.whatsappLink}
                  target="_blank"
                  style={{
                    marginTop: '10px',
                    fontSize: 'clamp(0.8rem, 2vw, 1rem)', // Dynamically adjusts font size
                  }}
                >
                  Enquire on WhatsApp
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
