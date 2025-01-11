import React from 'react';

export const LevelContext = React.createContext<number>(0);

interface LevelProps {
  children: React.ReactNode;
}

export const Level: React.FC<LevelProps> = ({ children }) => {
  const level = React.useContext(LevelContext);
  return <LevelContext.Provider value={level + 1}>{children}</LevelContext.Provider>;
};
