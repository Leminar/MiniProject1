import React, { useState } from 'react';

function GoalForm() {
  const [goal, setGoal] = useState('');

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal }), 
      });
  
      if (response.ok) {
        console.log('Goal set successfully');
      } else {
        console.error('Failed to set goal');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Set Your Goal</h2>
      <form onSubmit={handleGoalSubmit}>
        <input
          type="text"
          placeholder="Enter your goal"
          value={goal}
          onChange={handleGoalChange}
        />
        <button type="submit">Set Goal</button>
      </form>
    </div>
  );
}

export default GoalForm;
