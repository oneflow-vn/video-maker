export type BoundingClientRectOf = { (element: HTMLElement): DOMRect; }

type ElementMatcher = (elm: HTMLElement) => boolean

type SimpleRect = {
  top: number,
  left: number,
  width: number,
  height: number,
}

interface BoundingClientRectStubberMethods {
  stub(rect: SimpleRect, matcher: ElementMatcher): void;
}

export type BoundingClientRectStubber = BoundingClientRectOf & BoundingClientRectStubberMethods;

export const stubBoundingClientRect = (): BoundingClientRectStubber => {
  const stubs: {rect: SimpleRect, matcher: ElementMatcher}[] = [];

  const mainFunction = (element: HTMLElement): DOMRect => { 
    const result = stubs.find(({matcher}) => matcher(element))?.rect;
    if(!result) throw new Error(`No stub found for element ${element.id} ${element.outerHTML}}`);

    return {...result, x: result.left, y: result.top, bottom: result.top + result.height, right: result.left + result.width, toJSON: () => result};
  }

  (mainFunction as BoundingClientRectStubber).stub = (rect: DOMRect, matcher: ElementMatcher) => {
    stubs.push({rect, matcher})
  };

  return mainFunction as BoundingClientRectStubber;
};