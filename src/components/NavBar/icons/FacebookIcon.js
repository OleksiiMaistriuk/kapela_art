import React from 'react';

const FacebookIcon = () => (
  <svg className="w-9 h-9" viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="fbGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#d5a94f" />
        <stop offset="50%" stopColor="#d5a54f" />
        <stop offset="100%" stopColor="#d5a24f" />
      </linearGradient>
    </defs>
    <path
      fill="url(#fbGradient)"
      d="M16.5,3H7.5C6.119,3,5,4.119,5,5.5v11C5,17.881,6.119,19,7.5,19h4.5v-6h-2v-2h2v-1.5c0-2.481,1.519-3.5,3.738-3.5   1.066,0,1.982,0.079,2.25,0.115v2.609l-1.545,0.001c-1.212,0-1.455,0.576-1.455,1.422V11h2.9l-0.379,2h-2.521v6h3.621   c1.381,0,2.5-1.119,2.5-2.5v-11C19,4.119,17.881,3,16.5,3z"
    />
  </svg>
);

export default FacebookIcon;
