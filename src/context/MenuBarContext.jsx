import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const MenuBarContext = createContext();

const useMenuBar = () => useContext(MenuBarContext);

const MenuBarProvider = ({ children }) => {
  const [menuBar, setMenuBar] = useState(sessionStorage.getItem('menuBar'));
  const toggleMenuBar = () => {
    sessionStorage.setItem('menuBar', !menuBar);
    setMenuBar(!menuBar);
  };
  const values = { menuBar, toggleMenuBar };
  return (
    <MenuBarContext.Provider value={values}>{children}</MenuBarContext.Provider>
  );
};

MenuBarProvider.propTypes = {
  children: PropTypes.node,
};

// eslint-disable-next-line react-refresh/only-export-components
export { MenuBarProvider, useMenuBar };
