import React from 'react';
import { RocketPlume } from './RocketPlume';

export const StarshipPlume: React.FC = () => {

  return (
		  <group>

			<RocketPlume actor='plume' position={[-1.5, 0, 0]} scale={2} />
			<RocketPlume actor='plume' position={[-1,   0, 0]} scale={2.4} />
			<RocketPlume actor='plume' position={[-0.5, 0, 0]} scale={2.6} />
			<RocketPlume actor='plume' position={[0,    0, 0]} scale={4} />
			<RocketPlume actor='plume' position={[0.5,  0, 0]} scale={2.6} />
			<RocketPlume actor='plume' position={[1,    0, 0]} scale={2.4} />
			<RocketPlume actor='plume' position={[1.5,  0, 0]} scale={2} />

			<RocketPlume actor='plume' position={[0, 0, -1.5, ]} scale={2} />
			<RocketPlume actor='plume' position={[0, 0, -1,   ]} scale={2.4} />
			<RocketPlume actor='plume' position={[0, 0, -0.5, ]} scale={2.6} />
			<RocketPlume actor='plume' position={[0, 0, 0,    ]} scale={4} />
			<RocketPlume actor='plume' position={[0, 0, 0.5,  ]} scale={2.6} />
			<RocketPlume actor='plume' position={[0, 0, 1,    ]} scale={2.4} />
			<RocketPlume actor='plume' position={[0, 0, 1.5,  ]} scale={2} />

		</group>
  );
};
