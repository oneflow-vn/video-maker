import React from 'react';
import AnimationEffect from './AnimationEffect';
import { useAnimationContext } from '../hooks/useAnimationContext';

interface EdgeWaverProps {
	actor: string;
	style?: React.CSSProperties;
	amplitudePercentageOfHeight: number;
	frequency: number;
	children?: React.ReactNode;
}

const EdgeWaver: React.FC<EdgeWaverProps> = ({
	actor,
	style,
	amplitudePercentageOfHeight: amplitude,
	frequency,
	children,
}) => {
  const progress = useAnimationContext().getGeneralValue(actor) ?? 0;

  const data = Array.from({ length: 101 }, (_, i) => ({
    x: i,
    y: amplitude + amplitude * Math.sin((i * frequency * Math.PI + progress) / 50),
  }));

	const pathD = `${data.map((d) => `${d.x}% ${d.y}%`).join(',')}, 100% 100%, 0% 100%`;

  return (
    <AnimationEffect actor={actor} style={{...style, overflow: "visible", clipPath: `polygon(${pathD})`}}>
      {children}
    </AnimationEffect>
  );
};

export default EdgeWaver;