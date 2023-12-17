// client/src/PropsAndState.js
import React, { useState } from 'react';

const PropsAndState = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default PropsAndState;
