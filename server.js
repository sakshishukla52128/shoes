// Corrected Server Code
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 4200;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect('mongodb://localhost:27017/myshoes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log("MongoDB connection successful");
});

// Schema and Model
const userSchema = new mongoose.Schema({
  firstName: String,
  
  email: String,
  password: String,
  confirmpassword: String
});
const Users = mongoose.model("User", userSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/post', async (req, res) => {
  try {
    const { firstName,  email, password,confirmpassword } = req.body;
    const user = new Users({
      firstName,
     email,
     password,
      confirmpassword
    });
    await user.save();
    console.log(user);
    res.send("Form submission successful");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("An error occurred while submitting the form.");
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});