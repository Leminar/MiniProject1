import React, { useState } from 'react';

function NutritionForm() {
  const [meal, setMeal] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');

  const handleMealChange = (e) => {
    setMeal(e.target.value);
  };

  const handleCaloriesChange = (e) => {
    setCalories(e.target.value);
  };

  const handleProteinChange = (e) => {
    setProtein(e.target.value);
  };

  const handleNutritionSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/api/nutrition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meal, calories, protein }),
      });
  
      if (response.ok) {
        console.log('Nutrition set successfully');
      } else {
        console.error('Failed to set nutrition');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div>
      <h2>Set Your Nutrition</h2>
      <form onSubmit={handleNutritionSubmit}>
        <input
          type="text"
          placeholder="Enter meal name"
          value={meal}
          onChange={handleMealChange}
        />
        <input
          type="number"
          placeholder="Enter calories"
          value={calories}
          onChange={handleCaloriesChange}
        />
        <input
          type="number"
          placeholder="Enter protein"
          value={protein}
          onChange={handleProteinChange}
        />
        <button type="submit">Set Nutrition</button>
      </form>
    </div>
  );
}

export default NutritionForm;
