import {useEffect} from 'react'
import {useRef} from 'react'
import React from 'react';
import {AbsoluteFill } from 'remotion';
import { Connector } from './Connector';
import { useAnimationContext } from '../../hooks/useAnimationContext';
import { BoundingClientRectOf } from '../hoc/BoundingClientRectOf';
import withBoundingClientRect from '../hoc/withBoundingClientRect';


const ConnectorsInner: React.FC<{boundingClientRectOf: BoundingClientRectOf}> = ({boundingClientRectOf}) => {

  const { connectors } = useAnimationContext().getConnectors();
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const updateLine = () => {
      const parent = ref.current;
      const svgElm = svgRef.current;
      if (!parent || !svgElm) return;

      const boundingClientRectOfInUse: BoundingClientRectOf = boundingClientRectOf ||
        ((element: HTMLElement) => element.getBoundingClientRect());

      const parentRect = boundingClientRectOfInUse(parent);

      svgElm.setAttribute("viewBox", `${parentRect.left} ${parentRect.top} ${parentRect.width} ${parentRect.height}`)

    };

    updateLine();

    window.addEventListener("resize", updateLine);
    return () => {
      window.removeEventListener("resize", updateLine);
    };
  }, [boundingClientRectOf, ref, svgRef]);


	return (
		<AbsoluteFill ref={ref}>
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        >
          <defs>
          <marker
            id="arrowhead"
            markerWidth="5"
            markerHeight="7"
            refX="4"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 5 3.5, 0 7" fill="#88a"/>
          </marker>
        </defs>
        {
          connectors.map((connector, index) => {
            return <Connector key={index} connector={connector} boundingClientRectOf={ boundingClientRectOf } />
          })
        }
      </svg>
    </AbsoluteFill>
	);
};

export const Connectors: React.FC<{boundingClientRectOf?: BoundingClientRectOf}> = withBoundingClientRect(ConnectorsInner);