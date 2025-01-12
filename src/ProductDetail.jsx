import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";

const products = [
  {
    id: 1,
    name: "Shoes",
    price: "$50",
    image: "https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.31.59_PM_c7xb2e.jpg",
    additionalImages: [
      "https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.32.02_PM_fg54pf.jpg",
      "https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.31.57_PM_dcp35v.jpg",
      "https://res.cloudinary.com/dipq9ynqq/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1736581782/WhatsApp_Image_2025-01-09_at_10.32.01_PM_3_ok1pr4.jpg",
    ],
    whatsappLink: "https://wa.me/7505433516?text=I%20am%20interested%20in%20Shoes",
  },
];

export const ProductDetail = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid
            container
            spacing={3}
            key={product.id}
            style={{ marginBottom: "30px" }}
          >
            {/* Left Section: Main Image and Slider */}
            <Grid item xs={12} md={6}>
              <Box>
                {/* Main Image */}
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                {/* Slider */}
                <Grid container spacing={1}>
                  {product.additionalImages.map((img, index) => (
                    <Grid item xs={3} key={index}>
                      <CardMedia
                        component="img"
                        image={img}
                        alt={`Additional ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
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
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "clamp(1rem, 2vw, 1.2rem)",
                      marginBottom: "20px",
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
                      fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                    }}
                  >
                    Enquire on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
