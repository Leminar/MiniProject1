const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//1. MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/Users', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});
app.use(cors());
app.use(express.json());

//2. MongoDB Schema and Model
const userSchema = new mongoose.Schema({
  username: String, 
});

const User = mongoose.model('User', userSchema);

//3. API Endpoints
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/users', async (req, res) => {
    const { username } = req.body;
    const newUser = new User({ username });
  try {
      const result = await newUser.save();
      console.log("Saved to the database", result);
      res.status(201).json(result);
  } catch (err) {
      console.log(err);
      res.status(500).send('Error saving to database');
}});

//4. Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
