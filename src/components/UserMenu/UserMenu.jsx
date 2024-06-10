import { Avatar, Divider, MenuItem, MenuList } from '@mui/material';
import styles from './UserMenu.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@redux/features/authSlice';

const cx = classNames.bind(styles);
export default function UserMenu() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  return (
    <div className={cx('wrapper')}>
      <div className={cx('user-profile')}>
        <Avatar />
        <p className={cx('username')}>{user?.username}</p>
        <p className={cx('email')}>{user?.email}</p>
      </div>
      <Divider variant='middle' />
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
      </MenuList>
    </div>
  );
}
