import React from 'react';

// Functional Component using destructuring
const MyComponent = ({ name, ...props }) => {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>You are {props.age} years old.</p>
    </div>
  );
};

// Usage of MyComponent
const PropsApp = () => {
  return <MyComponent name="John" age={26} />;
};

export default PropsApp;
