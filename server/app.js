// app.js

const express = require('express');
const firebasecred = require("./Api_key")
const firebase = require('firebase-admin');
const cors = require('cors');
const fileupload=require("express-fileupload")
const bodyParser = require('body-parser');
const uploadImages = require('./cloudinary'); 
const serviceAccount=require("./freelance-b8b37-firebase-adminsdk-fbsvc-5258c431d4.json")
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());
app.use(fileupload({ useTempFiles: true}));
app.use(express.json())
app.use(bodyParser.json());


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp({credential: firebase.credential.cert(serviceAccount),});
} else {
  firebase.app(); // if already initialized
}

const db = firebase.firestore();



// Route for user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await db.collection("user");
    res.status(200).json({ message: 'Login successful', user: userCredential.user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Login route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Firebase Authentication does not support email/password verification on the backend directly
//     // You should use Firebase Client SDK to handle email/password authentication on the frontend
//     // Once the user logs in, you send the Firebase ID token to your backend for verification
    
//     // Assuming you have received the Firebase ID token from the frontend:
//     const idToken = req.body.idToken;  // The ID token sent by the client (after login)
    
//     if (!idToken) {
//       return res.status(400).json({ message: 'No ID token provided.' });
//     }

//     // Verify the ID token using Firebase Admin SDK
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
    
//     // Fetch the user from Firebase Authentication
//     const userRecord = await admin.auth().getUser(decodedToken.uid);

//     // Send a response with the user info
//     res.status(200).json({ message: 'Login successful', user: userRecord });
    
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

app.get('/getProducts', async (req, res) => {
  const { category } = req.query; // Get the collection name from the query parameter

  if (!category) {
    return res.status(400).json({ message: 'Collection name is required.' });
  }

  try {
    // Fetch all documents from the specified collection
    const snapshot = await db.collection(category).get();

    if (snapshot.empty) {
      return res.status(200).json({ message: 'No documents found in the collection.' });
    }

    // Map the documents to an array of objects
    const products = [];
    snapshot.forEach(doc => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.status(200).json({ message: 'Products fetched successfully', products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/getProduct/:id', async (req, res) => {
  const {id}=req.params
  const { category } = req.query; // Get the collection name from the query parameter

  if (!category) {
    return res.status(400).json({ message: 'Collection name is required.' });
  }

  try {
    // Fetch all documents from the specified collection
    const snapshot = await db.collection(category).get()

    if (snapshot.empty) {
      return res.status(200).json({ message: 'No documents found in the collection.' });
    }

    // Map the documents to an array of objects
    const products = [];
    snapshot.forEach(doc => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.status(200).json({ message: 'Products fetched successfully', data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add product information (image, name, price) to Firestore
app.post('/addProduct', async (req, res) => {
  const { name, price, category } = req.body;

  // Check if files are uploaded
  if (!req.files || !req.files.images) {
    return res.status(400).json({ message: 'No image files uploaded.' });
  }

  const images = req.files.images; // 'images' is the field name

  try {
    // If only one image is uploaded, convert it to an array
    const imageArray = Array.isArray(images) ? images : [images];
    
    // Upload each image to Cloudinary and get URLs
    const cloudinaryImageUrls = await uploadImages(imageArray); // Call the uploadImages function

    // Save product info along with the image URLs to Firestore
    const docRef = await db.collection(category).add({
      Image: cloudinaryImageUrls,  // Store array of Cloudinary URLs
      Name: name,
      Price: price,
      Category: category,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ message: 'Product added successfully', productId: docRef.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.delete('/deleteProduct/:id', async (req, res) => {
    const { id } = req.params;
    const {category}=req.query
    try {
      // Get the product document reference
      const productRef = db.collection(category).doc(id);
  
      // Delete the product from Firestore
      await productRef.delete();
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
