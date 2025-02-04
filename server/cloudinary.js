const cloudinary = require('cloudinary').v2;
require('dotenv/config');

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Ensure you are using the correct environment variable
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Function to upload images to Cloudinary
async function uploadImages(images) {
  try {
    // If only one image is provided, convert it to an array
    const imageArray = Array.isArray(images) ? images : [images];

    // Upload each image and collect their URLs
    const uploadPromises = imageArray.map(async (image, index) => {
      const uploadResult = await cloudinary.uploader.upload(image.tempFilePath, {
        public_id: `product_${Date.now()}_${index}`, // Unique public ID for each image
      });
      return uploadResult.secure_url; // Returning the URL of the uploaded image
    });

    // Wait for all images to upload and get their URLs
    const imageUrls = await Promise.all(uploadPromises);

    console.log('Uploaded image URLs:', imageUrls);

    // Return an array of image URLs
    return imageUrls;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error(error.message); // You can throw the error or handle it differently
  }
}

module.exports = uploadImages; // Exporting the uploadImages function
