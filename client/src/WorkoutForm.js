import React, { useState } from 'react';

function WorkoutForm() {
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleCaloriesBurnedChange = (e) => {
    setCaloriesBurned(e.target.value);
  };

  const handleWorkoutSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, duration, caloriesBurned }), 
      });
  
      if (response.ok) {
        console.log('Workout set successfully');
      } else {
        console.error('Failed to set workout');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Set Your Workout</h2>
      <form onSubmit={handleWorkoutSubmit}>
        <input
          type="text"
          placeholder="Enter workout type"
          value={type}
          onChange={handleTypeChange}
        />
        <input
          type="number"
          placeholder="Enter duration (minutes)"
          value={duration}
          onChange={handleDurationChange}
        />
        <input
          type="number"
          placeholder="Enter calories burned"
          value={caloriesBurned}
          onChange={handleCaloriesBurnedChange}
        />
        <button type="submit">Set Workout</button>
      </form>
    </div>
  );
}

export default WorkoutForm;
