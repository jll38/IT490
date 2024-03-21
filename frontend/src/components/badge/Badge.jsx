import React from 'react';

export default function Badge({ text, color }) {
    // Dynamically apply the background color based on the `color` prop
    const bgColorClass = `${color} text-white`;
  
    return (
      <span className={`text-sm py-1 px-3 rounded-full ${bgColorClass}`}>
        {text}
      </span>
    );
  };
