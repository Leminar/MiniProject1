import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import Home from './Home'; 
import GoalForm from './GoalForm';
import NutritionForm from './NutritionForm';
import WorkoutForm from './WorkoutForm';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Health Tracker</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/goal">Set Goal</Link>
              </li>
              <li>
                <Link to="/nutrition">Set Nutrition</Link>
              </li>
              <li>
                <Link to="/workout">Set Workout</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/goal" element={<GoalForm />} />
            <Route path="/nutrition" element={<NutritionForm />} />
            <Route path="/workout" element={<WorkoutForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
