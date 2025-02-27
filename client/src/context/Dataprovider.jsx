import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState("light");
  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []); 
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  // Function to update user state
  const updateUser = (user) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };
  const logout = () => {
    localStorage.removeItem("ch_token");
    updateUser(null); 
  };

  return (
    <DataContext.Provider
      value={{
        currentUser,
        updateUser,
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
