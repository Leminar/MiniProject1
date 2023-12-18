import React, { useState, useEffect } from 'react';

function Home() {
  const [goals, setGoals] = useState([]);
  const [nutrition, setNutrition] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    //1. Fetch goals data
    fetch('http://localhost:3000/api/goals')
      .then((response) => response.json())
      .then((data) => setGoals(data))
      .catch((error) => console.error('Error fetching goals:', error));

    //2. Fetch nutrition data
    fetch('http://localhost:3000/api/nutrition')
      .then((response) => response.json())
      .then((data) => setNutrition(data))
      .catch((error) => console.error('Error fetching nutrition:', error));

    //3. Fetch workouts data
    fetch('http://localhost:3000/api/workouts')
      .then((response) => response.json())
      .then((data) => setWorkouts(data))
      .catch((error) => console.error('Error fetching workouts:', error));
  }, []);

  return (
    <div>
      <h2>Goals</h2>
      <ul>
        {goals.map((goal) => (
          <li key={goal._id}>{goal.goal_type} - Target: {goal.target}</li>
        ))}
      </ul>

      <h2>Nutrition</h2>
      <ul>
        {nutrition.map((item) => (
          <li key={item._id}>{item.meal} - Calories: {item.calories}, Protein: {item.protein}</li>
        ))}
      </ul>

      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>{workout.type} - Duration: {workout.duration}, Calories Burned: {workout.calories_burned}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
