import React, { ComponentType } from 'react';
import { BoundingClientRectOf } from './BoundingClientRectOf';

export type WithBoundingClientRectInner = {
  boundingClientRectOf: BoundingClientRectOf
};

type WithBoundingClientRect<P> = Omit<P, keyof WithBoundingClientRectInner> & { boundingClientRectOf?: BoundingClientRectOf };

export default function withBoundingClientRect<P extends WithBoundingClientRectInner>(
  WrappedComponent: ComponentType<P>
): React.FC<WithBoundingClientRect<P>> {
  return (props: WithBoundingClientRect<P>) => {

    return (
      <WrappedComponent
        {...props as P}
        boundingClientRectOf={props.boundingClientRectOf || ((element: HTMLElement) => element.getBoundingClientRect())}
      />
    );
  };
}