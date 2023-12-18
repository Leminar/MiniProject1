const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const cors = require('cors'); 

const app = express();

//1. MongoDB and Mongoose setup
mongoose.connect('mongodb://127.0.0.1:27017/fitnessTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(cors());

//2. Mongoose Schemas
const workoutSchema = new mongoose.Schema({
  type: String,
  duration: Number,
  calories_burned: Number
});
const nutritionSchema = new mongoose.Schema({
  meal: String,
  calories: Number,
  protein: Number
});

const goalSchema = new mongoose.Schema({
  goal_type: String,
  target: Number
});

//3. Mongoose Models
const Workout = mongoose.model('Workout', workoutSchema);
const Nutrition = mongoose.model('Nutrition', nutritionSchema);
const Goal = mongoose.model('Goal', goalSchema);

//4. Routes for Workouts
app.get('/api/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/api/workouts', [
  body('type').isLength({ min: 1 }),
  body('duration').isNumeric(),
  body('calories_burned').isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newWorkout = new Workout(req.body);
    await newWorkout.save();
    res.json(newWorkout);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//5. Routes for Nutrition
app.get('/api/nutrition', async (req, res) => {
  try {
    const nutrition = await Nutrition.find();
    res.json(nutrition);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/api/nutrition', [
  body('meal').isLength({ min: 1 }),
  body('calories').isNumeric(),
  body('protein').isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newNutrition = new Nutrition(req.body);
    await newNutrition.save();
    res.json(newNutrition);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//6. Routes for Goals
app.get('/api/goals', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/api/goals', [
  body('goal_type').isLength({ min: 1 }),
  body('target').isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newGoal = new Goal(req.body);
    await newGoal.save();
    res.json(newGoal);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//7. Update a workout by ID
app.put('/api/workouts/:id', [
  body('type').isLength({ min: 1 }),
  body('duration').isNumeric(),
  body('calories_burned').isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(updatedWorkout);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


app.delete('/api/workouts/:id', async (req, res) => {
  try {
    const deletedWorkout = await Workout.findByIdAndRemove(req.params.id);
    if (!deletedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//8. Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});