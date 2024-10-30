import React from 'react';
import {Img, staticFile} from 'remotion';

export const OddeLogo: React.FC = () => {
  return (
		<Img src={staticFile("assets/Odd-e_logo.svg")} style={{position: 'absolute', left: '0%', top: '0%', width: '100%'}} />
  );
};