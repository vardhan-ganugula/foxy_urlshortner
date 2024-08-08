import { useContext, useState, createContext } from "react";

export const SidebarContext = createContext({
  sidebarStatus: false,
  setSidebarStatus: () => {},
});

export const SidebarContextProvider = ({ children }) => {
  let [sidebarStatus, setSidebarStatus] = useState( window.innerWidth > 500);
  return (
    <SidebarContext.Provider
      value={{
        sidebarStatus,
        setSidebarStatus,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};
