import styles from './Tab.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useTab } from '@context/TabContext';
import { Icon } from '@iconify/react';

const cx = classNames.bind(styles);
export default function Tab({
  startIcon,
  endIcon,
  value,
  children,
  handleClick,
}) {
  const { tab, setTab } = useTab();
  const selected = tab === value;
  return (
    <button
      className={cx('wrapper', selected ? 'selected' : 'regular')}
      onClick={(e) => {
        setTab(value);
        handleClick(e);
      }}
    >
      {startIcon && <Icon className={cx('icon')} icon={startIcon} />}
      {children}
      {endIcon && <Icon className={cx('icon')} icon={endIcon} />}
    </button>
  );
}

Tab.propTypes = {
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  handleClick: PropTypes.func,
  children: PropTypes.node,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
};
