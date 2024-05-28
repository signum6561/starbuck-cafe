import { TabProvider } from '@context/TabContext';
import styles from './Tabs.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
export default function Tabs({
  fullWidth = false,
  margin,
  defaultValue,
  children,
}) {
  return (
    <TabProvider defaultValue={defaultValue}>
      <div className={cx('wrapper', margin ?? '', fullWidth && 'fullWidth')}>
        {children}
      </div>
    </TabProvider>
  );
}

Tabs.propTypes = {
  fullWidth: PropTypes.bool,
  margin: PropTypes.string,
  children: PropTypes.node,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
