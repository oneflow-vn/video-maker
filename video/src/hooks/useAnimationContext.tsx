import { ReactNode, createContext, useContext } from 'react';
import AnimationContextWrapper from '../models/AnimationContextWrapper';

const AnimationContextContext = createContext<AnimationContextWrapper | undefined>(undefined);

interface AnimationContextProviderProps {
  children: ReactNode;
  value: AnimationContextWrapper;
}

export function AnimationContextProvider({ children, value }: AnimationContextProviderProps) {
  return <AnimationContextContext.Provider value={value}>{children}</AnimationContextContext.Provider>;
}

export function useAnimationContext(): AnimationContextWrapper {
  const context = useContext(AnimationContextContext);
  if (!context) {
    throw new Error('useAnimationContext must be used within an AnimationProvider');
  }
  return context;
}
