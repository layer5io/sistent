import cytoscape from 'cytoscape';
import { createContext, useContext } from 'react';

export interface CytoscapeContextInterface {
  cytoscape: cytoscape.Core;
  container: HTMLElement;
}

export const CytoscapeContext = createContext<CytoscapeContextInterface | null>(null);

export const CytoscapeProvider = CytoscapeContext.Provider;

export function useCytoscapeContext() {
  const context = useContext(CytoscapeContext);
  if (!context) {
    throw new Error('useCytoscapeContext must be used within a CytoscapeContextProvider');
  }
  return context;
}
