import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress, // Add CircularProgress for loader
} from "@mui/material";
import axios from "axios";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import Slider from "react-slick"; // Import the slider component
import LoadingSpinner from "./LoadingSpinner";
// Add slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductPage = () => {
  const categories = ["Watches", "Clothes", "Shoes", "Flipflops"];
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    images: [],
  });
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);  // Loading state for form submission
  const [openSlider, setOpenSlider] = useState(false);
  const [currentProductImages, setCurrentProductImages] = useState([]);

  useEffect(() => {
    if (selectedCategory !== "") {
      fetchData();
    } else {
      setProducts([]); // Reset products if no category is selected
    }
  }, [selectedCategory]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://freelance-backend-phi.vercel.app/getProducts?category=${selectedCategory}`
      );
      if (response.data.products) {
        setProducts(response.data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    const previewUrls = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews(previewUrls);
  };

  const handleAddProduct = async () => {
    setLoading(true); // Start loading when adding a product
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);

    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await axios.post("https://freelance-backend-phi.vercel.app/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsAddProductDialogOpen(false); // Close the dialog
      setNewProduct({ name: "", price: "", category: "", images: [] });
      setImagePreviews([]);
      fetchData();
      setSnackbarMessage("Product added successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage("Error adding product");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      console.error("Error adding product:", error);
    } finally {
      setLoading(false); // Stop loading after the request is complete
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`https://freelance-backend-phi.vercel.app/deleteProduct/${id}`, {
        params: { category: selectedCategory },
      });
      fetchData();
      setSnackbarMessage("Product deleted successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage("Error deleting product");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      console.error("Error deleting product:", error);
    }
  };

  const openAddProductDialog = () => setIsAddProductDialogOpen(true);
  const closeAddProductDialog = () => setIsAddProductDialogOpen(false);

  // Handle opening the slider dialog
  const handleOpenSlider = (images) => {
    setCurrentProductImages(images);
    setOpenSlider(true);
  };

  const handleCloseSlider = () => {
    setOpenSlider(false);
  };

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      {/* Category Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Add Product Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={openAddProductDialog}
        sx={{ marginBottom: 2 }}
      >
        Add Product
      </Button>

      {/* Dialog for Adding Product */}
      <Dialog open={isAddProductDialogOpen} onClose={closeAddProductDialog}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              label="Category"
            >
              <MenuItem value="">Select Category</MenuItem>
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Image Preview */}
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            multiple
            style={{ marginTop: 16 }}
          />
          <div style={{ marginTop: 16 }}>
            {imagePreviews.length > 0 &&
              imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`preview-${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                    marginRight: "8px",
                    marginBottom: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpenSlider(imagePreviews)} // Open the slider when an image is clicked
                />
              ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddProductDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Add Product"}  {/* Show loader when adding */}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display Product Cards */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Grid container spacing={3}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item xs={6} sm={4} md={3} key={product.id}>  {/* Change xs={12} to xs={6} */}
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.Image[0] || product.Image}
                    alt={product.name}
                    onClick={() => handleOpenSlider(product.Image)} // Open slider on image click
                  />
                  <CardContent>
                    <Typography variant="h6">{product.Name}</Typography>
                    <Typography color="textSecondary">{product.Category}</Typography>
                    <Typography variant="body2">&#8377;: {product.Price}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton color="primary" onClick={() => alert("Edit Product")}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteProduct(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} style={{ textAlign: "center", marginTop: "20px" }}>
              <Typography variant="h5" style={{ fontSize: "24px", fontWeight: "bold" }}>
                No Products Available
              </Typography>
            </Grid>
          )}
        </Grid>
      )}

      {/* Image Slider Dialog */}
      {currentProductImages.length>1 &&(<Dialog open={openSlider} onClose={handleCloseSlider} fullWidth maxWidth="md">
        <DialogTitle>Product Images</DialogTitle>
        <DialogContent>
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            arrows={currentProductImages.length > 1}  // Only show navigation arrows if there are multiple images
          >
            { currentProductImages.length>1 ? (currentProductImages.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Product Image ${index + 1}`} style={{ width: "100%" }} />
              </div>
            ))):
            <div>
            <img src={image} alt={`Product Image ${index + 1}`} style={{ width: "100%" }} />
            </div>
          }
          </Slider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSlider} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>)}

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductPage;
