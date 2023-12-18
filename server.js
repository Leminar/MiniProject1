import express from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import https from 'https';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-here',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const mongoURI = 'mongodb://127.0.0.1:27017/fitnessTracker';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const fitnessSchema = new mongoose.Schema({
  name: String,
  type: String,
  posted_by: mongoose.Schema.Types.ObjectId,
});
const Fitness = mongoose.model('Fitness', fitnessSchema);

const userSchema = new mongoose.Schema({
  username: String,
  role: String,
});
const User = mongoose.model('User', userSchema);

app.use((req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET || 'your-jwt-secret', (err, decoded) => {
      if (err) return res.status(401).send({ message: 'Unauthorized' });
      User.findById(decoded.userId, (err, user) => {
        if (err || !user) return res.status(401).send({ message: 'User not found' });
        req.user = user;
        next();
      });
    });
  } else {
    next();
  }
});

const accessControl = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).send({ message: 'Access denied' });
    }
    next();
  };
};

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error creating user' });
  }
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'your-jwt-secret');
    res.json({ token });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

app.get('/workouts', async (req, res) => {
  try {
    const workouts = await Fitness.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching workouts' });
  }
});

app.get('/workout/:id', async (req, res) => {
  try {
    const workout = await Fitness.findById(req.params.id);
    if (!workout) return res.status(404).send({ message: 'Workout not found' });
    res.json(workout);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching workout' });
  }
});

app.put('/workouts/:id', accessControl(['user', 'admin']), async (req, res) => {
  const workoutId = req.params.id;
  try {
    const workout = await Fitness.findById(workoutId);
    if (!workout) return res.status(404).send({ message: 'Workout not found' });
    if (workout.posted_by.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).send({ message: 'Access denied' });
    }
    const updatedWorkout = await Fitness.findByIdAndUpdate(workoutId, req.body, { new: true });
    res.json(updatedWorkout);
  } catch (error) {
    res.status(500).send({ message: 'Error updating workout' });
  }
});

app.delete('/workouts/:id', accessControl(['user', 'admin']), async (req, res) => {
  const workoutId = req.params.id;
  try {
    const workout = await Fitness.findById(workoutId);
    if (!workout) return res.status(404).send({ message: 'Workout not found' });
    if (workout.posted_by.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).send({ message: 'Access denied' });
    }
    await Fitness.findByIdAndDelete(workoutId);
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting workout' });
  }
});

app.post('/admin/workout', accessControl(['admin']), (req, res) => {
  const newWorkout = new Fitness(req.body);
  newWorkout.posted_by = req.user._id;
  newWorkout.save();
  res.json({ message: 'Admin workout added successfully' });
});

app.post('/workouts', accessControl(['user', 'admin']), async (req, res) => {
  const newWorkout = new Fitness(req.body);
  newWorkout.posted_by = req.user._id;
  try {
    const savedWorkout = await newWorkout.save();
    res.json(savedWorkout);
  } catch (error) {
    res.status(500).send({ message: 'Error creating workout' });
  }
});

const httpsOptions = null; // Disable HTTPS


https.createServer(httpsOptions, app).listen(3000, () => {
  console.log('HTTPS server running on https://localhost:3000/');
});
