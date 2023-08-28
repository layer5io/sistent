import cytoscape from 'cytoscape';

import { useCytoscapeContext } from './context/CytoscapeProvider';

export function useCytoscape(): cytoscape.Core {
  return useCytoscapeContext().cytoscape;
}
