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
    <div style={{ padding: "10px" }}> {/* Reduce padding here to reduce gap */}
      <Grid container spacing={2}>
        {/* Product Details Section */}
        <Grid container spacing={2} key={product.id} style={{ marginBottom: "20px" }}> {/* Reduce margin-bottom */}
          {/* Left Section: Main Image and Slider */}
          <Grid item xs={12} md={6}>
            <Box>
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
                  marginBottom: "5px", // Reduce margin to reduce gap
                }}
              />

              {/* Thumbnail Slider */}
              {isImageArray && (
                <Grid container spacing={1}>
                  {product.Image.map((img, index) => (
                    <Grid item xs={3} key={index}>
                      <CardMedia
                        component="img"
                        image={img}
                        alt={`Thumbnail ${index + 1}`}
                        loading="lazy" // Lazy load thumbnails
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
            <Card style={{ height: "100%", padding: "10px" }}> {/* Reduce padding */}
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
            <Typography variant="h5" style={{ marginBottom: "15px" }}> {/* Reduced margin */}
              Similar Products
            </Typography>

            {/* Box for Horizontal Scrolling */}
            <Box style={{ display: "flex", overflowX: "auto", gap: "8px" }}> {/* Reduce gap */}
              {similarProducts
                .filter((p) => p.id !== id) // Exclude the current product
                .map((similarProduct) => (
                  <Card
                    key={similarProduct.id}
                    style={{
                      cursor: "pointer",
                      minWidth: isMobile ? "150px" : "200px", // Fixed width for cards
                      width: isMobile ? "150px" : "200px", // Ensure consistent width
                      height: "300px", // Fixed height for cards
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      flexShrink: 0, // Prevent cards from shrinking
                    }}
                    onClick={() => handleSimilarProductClick(similarProduct.id)}
                  >
                    <CardMedia
                      component="img"
                      image={
                        Array.isArray(similarProduct.Image)
                          ? similarProduct.Image[0]
                          : similarProduct.Image
                      }
                      alt={similarProduct.Name}
                      loading="lazy" // Lazy load similar product images
                      style={{
                        height: "150px", // Fixed height for images
                        objectFit: "contain", // Ensure images fit within the container
                        width: "100%",
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        style={{ fontSize: isMobile ? "1rem" : "inherit" }}
                      >
                        {similarProduct.Name}
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ fontSize: isMobile ? "0.9rem" : "inherit" }}
                      >
                        Price: {similarProduct.Price}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
            </Box>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
