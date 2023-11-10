import cytoscape, { NodeCollection } from 'cytoscape';
import React from 'react';

import { useCytoscapeContext } from './context/CytoscapeProvider';

export function useOverlayedComponent(): NodeCollection | null {
  const context = useCytoscapeContext();
  const [overlayedComponent, setOverlayedComponent] = React.useState<NodeCollection | null>(null);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const position = getMousePostitionRelativeToCyCanvas(e);
      const component = getOverlayedComponent(context.cytoscape, position);
      setOverlayedComponent((prevComponent) => {
        if (prevComponent === null) {
          return component;
        } else {
          return component === null ? prevComponent : component;
        }
      });
    };

    const cyWrapperDiv = document.getElementById('cyto-wrapper-div');
    if (cyWrapperDiv) {
      cyWrapperDiv.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (cyWrapperDiv) {
        cyWrapperDiv.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [context.cytoscape]);

  return overlayedComponent;
}

type Overlayed = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

type OverlayedPosition = {
  x: number;
  y: number;
};

export function getMousePostitionRelativeToElement(
  e: MouseEvent,
  element: HTMLElement
): OverlayedPosition {
  const elementBoundingClientRect = element.getBoundingClientRect();
  const mouseX = e.clientX - elementBoundingClientRect.left;
  const mouseY = e.clientY - elementBoundingClientRect.top;
  return { x: mouseX, y: mouseY };
}

export function getMousePostitionRelativeToCyCanvas(e: MouseEvent): OverlayedPosition {
  const cyWrapperDiv = document.getElementById('cyto-wrapper-div');

  if (cyWrapperDiv) {
    const elementBoundingClientRect = cyWrapperDiv.getBoundingClientRect();
    const mouseX = e.clientX - elementBoundingClientRect.left;
    const mouseY = e.clientY - elementBoundingClientRect.top - 40; // Adjusted by 40 as per your original code
    return { x: mouseX, y: mouseY };
  }

  return { x: 0, y: 0 };
}

export function getOverlayedComponent(
  cy: cytoscape.Core,
  position: OverlayedPosition
): cytoscape.NodeCollection | null {
  const acceptingNodesCytoSelector = `node[type="NAMESPACE"], node[type="DEPLOYMENT"]`;

  const elements = cy.elements(acceptingNodesCytoSelector);
  const overlayedParents: cytoscape.NodeCollection = cy.collection();

  elements.forEach((ele) => {
    const boundingBox = ele.boundingBox();
    if (isOverlayed(boundingBox, position)) {
      overlayedParents.merge(ele);
    }
  });

  if (overlayedParents.length === 0) {
    return null;
  }

  if (overlayedParents.length >= 1) {
    return overlayedParents;
  }

  return null;
}

export function isOverlayed(bb: Overlayed, position: OverlayedPosition): boolean {
  return position.x >= bb.x1 && position.x <= bb.x2 && position.y >= bb.y1 && position.y <= bb.y2;
}
