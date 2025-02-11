import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { useParams, useNavigate } from "react-router-dom";

export const ProductDetail = () => {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  // Fetch product and similar products
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch product details and similar products in parallel
      const [productResponse, similarResponse] = await Promise.all([
        axios.get(`https://freelance-backend-phi.vercel.app/getProduct/${id}?category=${category}`),
        axios.get(`https://freelance-backend-phi.vercel.app/getProducts?category=${category}`),
      ]);

      const data = productResponse.data.products.filter((p) => p.id === id);
      setProduct(data[0] || {});
      setSimilarProducts(similarResponse.data.products || []);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  }, [id, category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle similar product click
  const handleSimilarProductClick = useCallback(
    (id) => {
      navigate(`/productdetail/${id}/${category}`);
    },
    [navigate, category]
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  const isImageArray = Array.isArray(product.Image);
  const parseSizes = (sizesString) => {
    try {
      return JSON.parse(sizesString);
    } catch (error) {
      console.error("Error parsing sizes:", error);
      return [];
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <Grid container spacing={2}>
        {/* Product Details Section */}
        <Grid container spacing={2} key={product.id} style={{ marginBottom: "20px" }}>
          {/* Left Section: Main Image and Slider */}
          <Grid item xs={12} md={6} >
            <Box >
              {/* Main Image */}
              <CardMedia
                component="img"
                image={isImageArray ? product.Image[currentImageIndex] : product.Image}
                alt={product.Name}
                loading="lazy" // Lazy load the main image
                style={{
                  width: "100%",
                  height: isMobile ? "200px" : "300px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginBottom: "5px", // Reduce margin
                }}
              />

              {/* Thumbnail Slider */}
              {isImageArray && (
                <Grid container spacing={1} style={{padding:'10px'}}>
                  {product.Image.map((img, index) => (
                    <Grid item xs={3} key={index}>
                      <CardMedia
                        component="img"
                        image={img}
                        alt={`Thumbnail ${index + 1}`}
                        loading="lazy"
                        onClick={() => setCurrentImageIndex(index)}
                        style={{
                          width: "100%",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          border:
                            currentImageIndex === index
                              ? "2px solid #4caf50"
                              : "2px solid transparent",
                          cursor: "pointer",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Grid>

          {/* Right Section: Product Details */}
          <Grid item xs={12} md={6}>
            <Card style={{ height: "100%", padding: "10px" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  style={{
                    fontSize: isMobile ? "1.2rem" : "clamp(1.5rem, 2.5vw, 2rem)",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  {product.Name}
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    fontSize: isMobile ? "1rem" : "clamp(1rem, 2vw, 1.2rem)",
                    marginBottom: "15px", // Reduce margin-bottom
                  }}
                >
                  Sizes: {parseSizes(product.Sizes).join(", ")}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  href={product.whatsappLink}
                  target="_blank"
                  style={{
                    fontSize: isMobile ? "0.9rem" : "clamp(0.9rem, 2vw, 1.1rem)",
                  }}
                >
                  Enquire on WhatsApp
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Similar Products Section */}
        {similarProducts.length > 1 && (
          <Grid item xs={12}>
            <Typography variant="h5" style={{ marginBottom: "15px" }}>
              Similar Products
            </Typography>

            {/* Box for Vertical Scrolling and Hiding Scrollbar */}
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                overflowY: "auto", // Make it scroll vertically
                maxHeight: "500px", // Limit height for the scrollable area
                gap: "8px",
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // Internet Explorer and Edge
              }}
            >
              {similarProducts
                .filter((p) => p.id !== id) // Exclude the current product
                .map((similarProduct) => (
                  <Box
                    key={similarProduct.id}
                    style={{
                      display: "flex",
                      alignItems: "center", // Align items in a row
                      borderBottom: "1px solid #ccc", // Add bottom border to each row
                      padding: "10px",
                    }}
                    onClick={() => handleSimilarProductClick(similarProduct.id)}
                  >
                    {/* Image Section */}
                    <CardMedia
                      component="img"
                      image={
                        Array.isArray(similarProduct.Image)
                          ? similarProduct.Image[0]
                          : similarProduct.Image
                      }
                      alt={similarProduct.Name}
                      loading="lazy"
                      style={{
                        width: "80px", // Smaller image size
                        height: "80px", // Fixed height
                        objectFit: "cover", // Ensure image fits the container
                        marginRight: "15px", // Add space between image and text
                      }}
                    />

                    {/* Text Section */}
                    <div style={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: isMobile ? "1rem" : "inherit",
                          fontWeight: "bold",
                        }}
                      >
                        {similarProduct.Name}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          fontSize: isMobile ? "0.9rem" : "inherit",
                          color: "#888",
                        }}
                      >
                        Sizes: {parseSizes(similarProduct.Sizes).join(", ")}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          fontSize: isMobile ? "0.9rem" : "inherit",
                          color: "#888",
                        }}
                      >
                        Category: {similarProduct.Category}
                      </Typography>
                    </div>
                  </Box>
                ))}
            </Box>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
