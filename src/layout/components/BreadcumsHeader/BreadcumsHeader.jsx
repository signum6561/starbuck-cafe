import { IconButton } from '@mui/material';
import styles from './BreadcumsHeader.module.scss';
import classNames from 'classnames/bind';
import { Icon } from '@iconify/react';
import { useMenuBar } from '@context/MenuBarContext';

const cx = classNames.bind(styles);
export default function BreadcumsHeader() {
  const { toggleMenuBar } = useMenuBar();

  return (
    <div className={cx('wrapper')}>
      <IconButton onClick={toggleMenuBar}>
        <Icon icon='ic:round-menu' />
      </IconButton>
    </div>
  );
}
