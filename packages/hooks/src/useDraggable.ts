import { RefObject, useEffect, useState } from 'react';

import { useCytoscapeContext } from './context/CytoscapeProvider';

export function useDraggable(
  dragReference: RefObject<HTMLElement | null>,
  componentReference: RefObject<HTMLElement | null>
) {
  const context = useCytoscapeContext();
  const [{ dx, dy }, setOffset] = useState({ dx: 0, dy: 0 });

  useEffect(() => {
    if (!dragReference.current || !componentReference.current || !context) {
      throw new Error(`An error occurred while trying to drag.`);
    }
    const el = dragReference.current;

    const handleMouseDown: EventListener = (event) => {
      const startX = (event as MouseEvent).pageX - dx;
      const startY = (event as MouseEvent).pageY - dy;

      const handleMouseMove = (event: Event) => {
        const newDx = (event as MouseEvent).pageX - startX;
        const newDy = (event as MouseEvent).pageY - startY;
        setOffset({ dx: newDx, dy: newDy });
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener(
        'mouseup',
        () => {
          document.removeEventListener('mousemove', handleMouseMove);
        },
        { once: true }
      );
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseup', handleMouseDown);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseup', handleMouseDown);
    };
  }, [dx, dy, dragReference, componentReference, context]);

  useEffect(() => {
    if (componentReference.current) {
      componentReference.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    }
  }, [componentReference, dx, dy]);
}
