import { createContext, useState } from 'react';

export const FiltrosContext = createContext();

export function ContextoFiltros({ children }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(25000);
  const [category, setCategory] = useState("Todos");    

  return (
    <FiltrosContext.Provider value={{ minPrice, maxPrice, category, setMinPrice, setMaxPrice, setCategory }}>
      {children}
    </FiltrosContext.Provider>
  );
}

