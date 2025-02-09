import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

export const Product = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const effectiveCategory = category || 'Shoes';
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://freelance-backend-phi.vercel.app/getProducts?category=${effectiveCategory}&fields=id,name,price,image`
        );
        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Error fetching the data: ', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [effectiveCategory]);

  const handleImageClick = (productId) => {
    navigate(`/productdetail/${productId}/${effectiveCategory}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const parseSizes = (sizesString) => {
    try {
      return JSON.parse(sizesString);
    } catch (error) {
      console.error("Error parsing sizes:", error);
      return [];
    }
  };

  return (
    <>
    <div style={{ padding: '20px',backgroundColor:"#f2f2f2", height:"100%" }}>
                  <Typography variant="h4" style={{ fontWeight: 'bold' , height:"120px",textAlign:"center"}}>
                    Trending Products
                    <Typography  variant="h6" style={{  textAlign:"center"}}>
                      Our trends that customer love!
                    </Typography>
                  </Typography>
      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((product) => {
            const message = `I am interested in ${product.name}. Price: ${product.Price}. Here is the image: ${product.Image}.html`;
            const whatsappLink = `https://wa.me/7505433516?text=${encodeURIComponent(message)}`;
            return (
              <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
                <Card style={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    image={Array.isArray(product.Image) ? product.Image[0] : product.Image}
                    alt={product.name}
                    loading="lazy"
                    style={{
                      objectFit: 'contain',
                      height: '200px',
                      width: '100%',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleImageClick(product.id)}
                  />
                  <CardContent>
                    <Typography variant="h6" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
                      {product.Name}
                    </Typography>
                    <Typography variant="h6" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
                      {product.Category}
                    </Typography>
                    <Typography variant="body1" style={{ fontSize: 'clamp(0.8rem, 2vw, 1.2rem)' }}>
                    Sizes: {parseSizes(product.Sizes).join(", ")}
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
          })
        ) : (
          <div>No product Available</div>
        )}
      </Grid>
    </div>
    </>
  );
};