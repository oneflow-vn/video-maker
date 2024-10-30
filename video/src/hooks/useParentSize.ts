import { useEffect, useState, useRef } from 'react';

const useParentSize = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [metrics, setSize] = useState({ width: 1, height: 1, left: 0, top: 0 });

  useEffect(() => {
    if (ref.current) {
      const container = ref.current.parentElement;

      if(container) {
      const rect = container.getBoundingClientRect();
        setSize({
          width: container.clientWidth,
          height: container.clientHeight,
          left: rect.left,
          top: rect.top,
        });

        const resizeObserver = new ResizeObserver(() => {
          setSize({
            width: container.clientWidth,
            height: container.clientHeight,
            left: rect.left,
            top: rect.top,
          });
        });

        resizeObserver.observe(container);

        return () => {
          resizeObserver.disconnect();
        };
      }
    }
  }, [ref]);

  return { ref, metrics };
};

export default useParentSize;
