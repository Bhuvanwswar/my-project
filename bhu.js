const express = require('express');
const admin = require('firebase-admin');
const app = express();

// Initialize Firebase Admin SDK
const serviceAccount = require('Nag.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sandy-dent-earthworm.glitch.me',
});

// Initialize Firestore
const db = admin.firestore();

// Define a route to read data from Firestore
app.get('/read-data', async (req, res) => {
  try {
    const docRef = db.collection('your-collection-name').doc('your-document-id');
    const doc = await docRef.get();

    if (!doc.exists) {
      console.log('No such document!');
      res.status(404).json({ error: 'Document not found' });
    } else {
      console.log('Document data:', doc.data());
      res.json(doc.data());
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
