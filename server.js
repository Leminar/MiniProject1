const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose'); 
const cors = require('cors');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/register', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy()); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(cors());

app.use(session({
  secret: "2323",
  resave: false,
  saveUninitialized: false
}));

app.get('/api/register', async (req, res) => {
  try {
    const registers = await register.find();
    res.json(registers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
app.post('/api/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email
    });

    await newUser.setPassword(req.body.password);

    await newUser.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in successfully' });
});

app.get('/api/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully' });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000/');
});