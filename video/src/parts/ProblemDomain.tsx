import React from 'react';

export const ProblemDomain: React.FC = () => {
  return (
<svg width="100%" height="100%" viewBox="0 60 231 150" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="pattern" patternUnits="userSpaceOnUse" width="1" height="1">
      <circle cx=".2" cy=".2" r=".2" fill="#B8B8B8" />
      <circle cx=".8" cy=".8" r=".2" fill="#B8B8B8" />
    </pattern>
  </defs>
  <path
    d="M90,120 Q100,100 120,100 Q130,80 150,80 Q170,100 190,100 Q210,100 210,120 Q230,120 230,140 Q210,160 210,180 Q190,200 170,180 Q150,180 130,180 Q110,200 90,180 Q70,180 50,180 Q30,200 10,180 Q10,160 30,140 Q30,120 50,120 Q70,100 90,120 Z"

    fill="url(#pattern)"
    stroke="black"
  />
    <g fill="red" stroke="red" strokeWidth="0.3">
    <line x1="100" y1="140" x2="102" y2="142" />
    <line x1="100" y1="142" x2="102" y2="140" />
    <line x1="94" y1="148" x2="96" y2="150" />
    <line x1="94" y1="150" x2="96" y2="148" />
    <line x1="103" y1="146" x2="105" y2="148" />
    <line x1="103" y1="148" x2="105" y2="146" />
    <line x1="101" y1="138" x2="103" y2="140" />
    <line x1="101" y1="140" x2="103" y2="138" />
    <line x1="102" y1="137" x2="104" y2="139" />
    <line x1="102" y1="139" x2="104" y2="137" />
  </g>

  <circle cx="201" cy="115" r="2.5" fill="green" />
</svg>
  );
};
