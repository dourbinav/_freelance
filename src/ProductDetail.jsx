import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { useParams } from "react-router";

export const ProductDetail = () => {
  const { id, category } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://freelance-backend-phi.vercel.app/getProduct/${id}?category=${category}`
      );
      console.log("=>>", response.data.data);
      setProduct(response.data.data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }

  const handleNext = () => {
    if (
      currentImageIndex < (Array.isArray(product.Image) ? product.Image.length : 1) - 1
    ) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const isImageArray = Array.isArray(product.Image);

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={3}>
        <Grid container spacing={3} key={product.id} style={{ marginBottom: "30px" }}>
          {/* Left Section: Main Image and Slider */}
          <Grid item xs={12} md={6}>
            <Box>
              {/* Main Image */}
              <CardMedia
                component="img"
                image={isImageArray ? product.Image[currentImageIndex] : product.Image} // Check if it's an array or single image
                alt={product.Name}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
              {/* Navigation Buttons */}
              {isImageArray && (
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Button variant="outlined" onClick={handleBack} disabled={currentImageIndex <= 0}>
                    Back
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    disabled={currentImageIndex >= product.Image.length - 1}
                  >
                    Next
                  </Button>
                </Box>
              )}

              {/* Thumbnail Slider */}
              {isImageArray && (
                <Grid container spacing={1}>
                  {product.Image.map((img, index) => (
                    <Grid item xs={3} key={index}>
                      <CardMedia
                        component="img"
                        image={img}
                        alt={`Thumbnail ${index + 1}`}
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

          {/* Right Section: Details */}
          <Grid item xs={12} md={6}>
            <Card style={{ height: "100%", padding: "20px" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  {product.Name}
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.2rem)",
                    marginBottom: "20px",
                  }}
                >
                  Price: {product.Price}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  href={product.whatsappLink}
                  target="_blank"
                  style={{
                    fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                  }}
                >
                  Enquire on WhatsApp
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
