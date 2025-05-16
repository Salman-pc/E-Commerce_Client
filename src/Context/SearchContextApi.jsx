import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchContextApi = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  
  return (
    <SearchContext.Provider value={{ searchKeyword, setSearchKeyword }}>
      {children}
    </SearchContext.Provider>
  );
};
