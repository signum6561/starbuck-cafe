import { Avatar, IconButton, Popover } from '@mui/material';
import styles from './BreadcumsHeader.module.scss';
import classNames from 'classnames/bind';
import { Icon } from '@iconify/react';
import { useMenuBar } from '@context/MenuBarContext';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserData } from '@redux/features/authSlice';
import UserMenu from '@components/UserMenu';

const cx = classNames.bind(styles);
export default function BreadcumsHeader() {
  const { toggleMenuBar } = useMenuBar();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <div className={cx('wrapper')}>
      <IconButton onClick={toggleMenuBar}>
        <Icon icon='ic:round-menu' />
      </IconButton>
      <div className={cx('user-profile')}>
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ justifyContent: 'flex-start' }}
          fullWidth
        >
          <Avatar />
        </IconButton>
      </div>
      <Popover
        open={menuOpen}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <UserMenu />
      </Popover>
    </div>
  );
}
