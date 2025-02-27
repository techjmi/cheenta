import { createContext, useState, useEffect } from "react";
export const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  // Save user to localStorage whenever it changes
  useEffect(() => { 
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);
  const logout = () => {
    localStorage.removeItem("ch_token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };
  return (
    <DataContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        theme,
        setTheme,
        toggleTheme,
        logout,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
