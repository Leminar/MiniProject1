// src/useStepTracker.js
import { useState } from 'react';

export const useStepTracker = (initialSteps = 0) => {
  const [steps, setSteps] = useState(initialSteps);

  const incrementSteps = () => {
    setSteps(steps + 1);
  };

  return { steps, incrementSteps };
};
