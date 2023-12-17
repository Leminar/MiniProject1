import React, { useState, useEffect } from 'react';
import { useStepTracker } from './useStepTracker';

function App() {
  const [showGoalMessage, setShowGoalMessage] = useState(false);
  const [goal, setGoal] = useState('');

  // Use of the custom hook for step tracking
  const { steps, incrementSteps } = useStepTracker(0);

  useEffect(() => {
    // Update the document title when steps change
    document.title = `Steps: ${steps}`;

    // Show the goal message when steps reach the set goal
    if (steps >= goal) {
      setShowGoalMessage(true);
    } else {
      setShowGoalMessage(false);
    }
  }, [steps, goal]);

  const handleGoalChange = (e) => {
    // Update the goal when the input field changes
    setGoal(Number(e.target.value));
  };

  const handleSetGoal = () => {
    // Update the goal message when the user sets a new goal
    if (steps >= goal) {
      setShowGoalMessage(true);
    } else {
      setShowGoalMessage(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Fitness Tracker</h1>
      <p style={styles.stepCount}>Steps Today: {steps}</p>

      <div style={styles.goalContainer}>
        <label htmlFor="goal" style={styles.label}>
          Set Goal:
        </label>
        <input
          type="number"
          id="goal"
          name="goal"
          value={goal}
          onChange={handleGoalChange}
          style={styles.input}
        />
        <button onClick={handleSetGoal} style={styles.setButton}>
          Set
        </button>
      </div>

      <button onClick={incrementSteps} style={styles.addStepButton}>
        Add Step
      </button>

      {showGoalMessage && (
        <p style={styles.goalMessage}>
          You've reached your step goal of {goal} steps!
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
  },
  stepCount: {
    fontSize: '18px',
    margin: '10px 0',
  },
  goalContainer: {
    margin: '20px 0',
  },
  label: {
    fontSize: '16px',
    marginRight: '10px',
  },
  input: {
    width: '60px',
    padding: '5px',
    fontSize: '16px',
  },
  setButton: {
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  addStepButton: {
    backgroundColor: '#28A745',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  goalMessage: {
    color: '#17A2B8',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
};

export default App;
