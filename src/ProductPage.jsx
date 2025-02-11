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
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import LoadingSpinner from "./LoadingSpinner";

const ProductPage = () => {
  const categories = ["Watches", "Clothes", "Shoes", "Flipflops"];
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    sizes: [],
    images: [],
  });
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

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
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory !== "") {
      fetchData();
    } else {
      setProducts([]); // Reset products when no category is selected
    }
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);

    // Reset the form when the category changes
    setNewProduct({
      name: "",
      category: "",
      sizes: [],
      images: [],
    });
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
    setLoading(true);
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("category", newProduct.category);
    formData.append("sizes", JSON.stringify(newProduct.sizes));

    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await axios.post("https://freelance-backend-phi.vercel.app/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsAddProductDialogOpen(false);
      setNewProduct({ name: "", category: "", sizes: [], images: [] });
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
      setLoading(false);
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
  const parseSizes = (sizesString) => {
    try {
      return JSON.parse(sizesString);
    } catch (error) {
      console.error("Error parsing sizes:", error);
      return [];
    }
  };

  const openAddProductDialog = () => setIsAddProductDialogOpen(true);
  const closeAddProductDialog = () => {
    setIsAddProductDialogOpen(false);

    // Reset the form state when closing the dialog
    setNewProduct({
      name: "",
      category: "",
      sizes: [],
      images: [],
    });
    setImagePreviews([]);
    setFiles([]);
  };

  // Render size input dynamically based on the selected category
  const renderSizeInput = () => {
    let sizeOptions = [];
    if (newProduct.category === "Clothes") {
      sizeOptions = ["S", "M", "L", "XL"];
    } else if (newProduct.category === "Shoes" || newProduct.category === "Flipflops") {
      sizeOptions = ["7", "8", "9", "10", "11", "12"]; // Shoe sizes
    }

    return (
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 16 }}>
        {sizeOptions.map((size) => (
          <div
            key={size}
            onClick={() => handleSizeSelection(size)}
            style={{
              padding: "8px 16px",
              margin: "4px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              backgroundColor: newProduct.sizes.includes(size) ? "blue" : "white",
              color: newProduct.sizes.includes(size) ? "white" : "black",
              fontWeight: newProduct.sizes.includes(size) ? "bold" : "normal",
            }}
          >
            {size}
          </div>
        ))}
      </div>
    );
  };

  const handleSizeSelection = (size) => {
    const updatedSizes = [...newProduct.sizes];
    if (updatedSizes.includes(size)) {
      updatedSizes.splice(updatedSizes.indexOf(size), 1);
    } else {
      updatedSizes.push(size);
    }
    setNewProduct({ ...newProduct, sizes: updatedSizes });
  };

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      {/* Category Dropdown for Filtering Products */}
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

          {/* Render size input dynamically based on selected category */}
          {renderSizeInput()}

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
                />
              ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddProductDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Add Product"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display Product Cards */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "300px" }}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item xs={6} sm={4} md={3} key={product.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.Image[0] || product.Image} // if here image is clicked by user i want it to get a pop and if ther are multiple images are shown in carousel if one then also in carousel
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.Name}</Typography>
                    <Typography color="textSecondary">{product.Category}</Typography>
                    <Typography variant="body2">Sizes: {parseSizes(product.Sizes).join(", ")}</Typography>
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
            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary" align="center">
                No Products Available
              </Typography>
            </Grid>
          )}
        </Grid>
      )}

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductPage;
