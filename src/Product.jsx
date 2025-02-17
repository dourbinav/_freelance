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
      <div style={{ padding: 'px', backgroundColor: "#f8f9fb", height: "100%" }}>
        <Typography variant="h4" style={{ fontWeight: 'semi-bold', height: "120px", textAlign: "center"  }}>
          Trending Products
          <Typography variant="h6" style={{ fontSize: '0.9rem', marginTop: '10px', textAlign: "center" }}>
            Our trends that customers love!
          </Typography>
        </Typography>
        <Grid container spacing={3} >
          {products.length > 0 ? (
            products.map((product) => {
              const productDetailUrl = `${window.location.origin}/productdetail/${product.id}/${effectiveCategory}`; // Generate the product URL
              const message = `I am interested in ${product.Name} Check out the product here: ${productDetailUrl}`;
              const whatsappLink = `https://wa.me/7466061836?text=${encodeURIComponent(message)}`;

              return (
                <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
                  <Card style={{ height: '100%', backgroundColor: '#ffffff' }}>
                    <div style={{ padding: '10px' }}>
                      <CardMedia
                        component="img"
                        image={Array.isArray(product.Image) ? product.Image[0] : product.Image}
                        alt={product.name}
                        loading="lazy"
                        style={{
                          objectFit: 'cover',
                          height: '200px',
                          width: '100%',
                        }}
                        onClick={() => handleImageClick(product.id)}
                      />
                    </div>
                    <CardContent style={{padding:"2px 10px 10px "}}>
                      <Typography 
                        variant="h6" 
                        style={{
                          fontSize: 'clamp(1.4rem, 2.5vw, 1.5rem)', 
                          padding: "0px",
                          whiteSpace: 'nowrap', 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {product.Name}
                      </Typography>
                      <Typography variant="h6" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', color: "gray" }}>
                        {product.Category}
                      </Typography>
                      {/* Display sizes on one line */}
                      <Typography variant="body1" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.5rem)', whiteSpace: 'nowrap',fontWeight:"bold" }}>
                        Sizes: 
                        <Typography style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.5rem)' }}>
                          {parseSizes(product.Sizes).join(" - ")}
                        </Typography>
                      </Typography>
                      <Button
                        variant="contained"
                        color="success"
                        href={whatsappLink}
                        target="_blank"
                        style={{ marginTop: '10px', backgroundColor: '#4fce5e', fontSize: 'clamp(0.7rem, 2vw, 1rem)' }}
                      >
                        Enquire on WhatsApp
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <div>No products available</div>
          )}
        </Grid>
      </div>
    </>
  );
};
