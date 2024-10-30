import React from 'react';
import { Img, staticFile} from 'remotion';

export const MoneyArrow: React.FC = () => {

  return (
    <div style={{position: 'relative', left: '0%', top: '0%', width: '100%', height: '100%'}}>
    <Img src={staticFile("assets/Money.svg")} style={{position: 'absolute', left: '45%', top: '43%', width: '10%'}} />
    <Img src={staticFile("assets/Money.svg")} style={{position: 'absolute', left: '60%', top: '40%', width: '10%'}} />
    <Img src={staticFile("assets/Money.svg")} style={{position: 'absolute', left: '70%', top: '36%', width: '10%'}} />
    </div>
  );
};