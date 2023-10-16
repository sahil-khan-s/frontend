"use client"
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export default function AppWrapper({ children }) {
  const [contextQuestions, setContextQuestions] = useState({});

  return (
    <AppContext.Provider value={{ contextQuestions, setContextQuestions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
    return useContext(AppContext);
  }
