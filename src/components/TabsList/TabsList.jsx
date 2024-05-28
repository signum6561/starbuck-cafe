import { Icon } from '@iconify/react';
import styles from './TabsList.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTab } from '@context/TabContext';

const cx = classNames.bind(styles);
export default function TabsList({
  startIcon,
  endIcon,
  singleTab = false,
  value,
  label,
  children,
  onClick,
}) {
  const { setTab } = useTab();
  const [active, setActive] = useState(false);
  return (
    <div className={cx('wrapper')}>
      <button
        className={cx('dropdown-btn')}
        onClick={
          singleTab
            ? (e) => {
                setTab(value);
                onClick(e);
              }
            : () => setActive(!active)
        }
      >
        <div className={cx('dropdown-label')}>
          {startIcon && <Icon className={cx('icon')} icon={startIcon} />}
          {label}
          {endIcon && <Icon className={cx('icon')} icon={endIcon} />}
        </div>
        {!singleTab && (
          <Icon
            className={cx('dropdown-icon', active && 'dropdown-icon-active')}
            icon='solar:alt-arrow-up-outline'
          />
        )}
      </button>
      {active && <div className={cx('tabs-list')}>{children}</div>}
    </div>
  );
}

TabsList.propTypes = {
  singleTab: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  children: PropTypes.node,
  label: PropTypes.node,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
};
