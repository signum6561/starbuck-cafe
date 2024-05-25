import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const TabContext = createContext();

const useTab = () => useContext(TabContext);

const TabProvider = ({ children, defaultValue }) => {
  const [tab, setTab] = useState(defaultValue ?? -1);
  const values = { tab, setTab };
  return <TabContext.Provider value={values}>{children}</TabContext.Provider>;
};

TabProvider.propTypes = {
  children: PropTypes.node,
  defaultValue: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
};

// eslint-disable-next-line react-refresh/only-export-components
export { TabProvider, useTab };
