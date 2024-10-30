import React from 'react';
import { Img, staticFile} from 'remotion';

export const ValueArrow: React.FC = () => {

  return (
    <div style={{position: 'relative', left: '0%', top: '0%', width: '100%', height: '100%'}}>
    <Img src={staticFile("assets/Music.svg")} style={{position: 'absolute', left: '30%', top: '15%', width: '15%'}} />
    <Img src={staticFile("assets/Clawn.svg")} style={{position: 'absolute', left: '50%', top: '15%', width: '15%'}} />
    </div>
  );
};
