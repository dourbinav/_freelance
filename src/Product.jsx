import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import axios from "axios";
import LoadingSpinner from './LoadingSpinner';

export const Product = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);

  // If category is not passed, default to "Shoes"
  const effectiveCategory = category || "Shoes";

  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true);
        const response = await axios.get(`https://freelance-backend-phi.vercel.app/getProducts?category=${effectiveCategory}`);
        
        if (response.data.products) {
          setProducts(response.data.products);
        } else {
          setProducts([]);  // Correctly reset products if no data is found
        }
        setloading(false);
      } catch (error) {
        console.error('Error fetching the data: ', error);
        setloading(false);
      }
    }

    fetchData();
  }, [effectiveCategory]);

  const navigate = useNavigate();

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleImageClick = (productId) => {
    navigate(`/productdetail/${productId}/${effectiveCategory}`); // Use effectiveCategory in URL
  };

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {products.length > 0 ? products.map((product) => {
          const message = `I am interested in ${product.name}. Price: ${product.Price}. Here is the image: ${product.Image}.html`;
          const whatsappLink = `https://wa.me/7505433516?text=${encodeURIComponent(message)}`;
          return (
            <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
              <Card style={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  image={Array.isArray(product.Image) ? product.Image[0] : product.Image}  // Handle image if it's an array
                  alt={product.name}
                  style={{
                    objectFit: 'contain',
                    height: '200px',
                    width: '100%',
                    cursor: 'pointer',  // Makes it visually clear that the image is clickable
                  }}
                  onClick={() => handleImageClick(product.id)}  // Navigate on image click
                />
                <CardContent>
                  <Typography variant="h6" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
                    {product.Name}
                  </Typography>
                  <Typography variant="body1" style={{ fontSize: 'clamp(0.8rem, 2vw, 1.2rem)' }}>
                    &#8377;: {product.Price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    href={whatsappLink}
                    target="_blank"
                    style={{ marginTop: '10px', fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}
                  >
                    Enquire on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        }) : <div>No product Available</div>}
      </Grid>
    </div>
  );
};
