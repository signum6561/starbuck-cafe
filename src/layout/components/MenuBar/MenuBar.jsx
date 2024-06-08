import StarbuckLogo from '@components/StarbuckLogo';
import styles from './MenuBar.module.scss';
import classNames from 'classnames/bind';
import Tabs from '@components/Tabs';
import Tab from '@components/Tab';
import { useLocation, useNavigate } from 'react-router-dom';
import TabsList from '@components/TabsList';
import { Avatar, Button, Menu, MenuItem, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, logout } from '@redux/features/authSlice';

const cx = classNames.bind(styles);
export default function MenuBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((store) => store.auth);
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <div className={cx('wrapper')}>
      <StarbuckLogo title width='192' height='96' />
      <div className={cx('menu-tabs')}>
        <Tabs defaultValue={0} margin='normal' vertical fullWidth>
          <TabsList
            value={0}
            label=' Home'
            startIcon='ic:sharp-home'
            onClick={() => navigate('/dashboard')}
            singleTab
          />
          <TabsList startIcon='bxs:data' label='Customer Data'>
            <Tab
              handleClick={() => navigate('/customers')}
              startIcon='heroicons:users-solid'
              value={1}
            >
              Customers
            </Tab>
            <Tab
              handleClick={() => navigate('/invoices')}
              startIcon='mingcute:paper-fill'
              value={2}
            >
              Invoices
            </Tab>
          </TabsList>
          <TabsList startIcon='ic:baseline-inventory' label='Inventory'>
            <Tab startIcon='mdi:food' value={3}>
              Products
            </Tab>
            <Tab startIcon='material-symbols:category' value={4}>
              Categories
            </Tab>
            <Tab startIcon='mdi:coupon' value={5}>
              Coupons
            </Tab>
          </TabsList>
          <TabsList startIcon='fluent:building-24-filled' label='Company'>
            <Tab startIcon='mdi:people-group' value={8}>
              Staff
            </Tab>
            <Tab startIcon='mingcute:department-fill' value={9}>
              Department
            </Tab>
          </TabsList>
          <TabsList startIcon='ic:baseline-miscellaneous-services' label='Misc'>
            <Tab startIcon='lets-icons:setting-fill' value={6}>
              Setting
            </Tab>
            <Tab startIcon='mdi:about' value={7}>
              About
            </Tab>
          </TabsList>
        </Tabs>
      </div>
      <div
        className={cx('user-profile')}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Button
          sx={{ justifyContent: 'flex-start' }}
          fullWidth
          onClick={() => {
            setMenuOpen(true);
          }}
        >
          <Avatar />
          <div className={cx('user-info')}>
            <p className={cx('username')}>{user?.username}</p>
            <p className={cx('email')}>{user?.email}</p>
          </div>
        </Button>
      </div>
      <Paper>
        <Menu
          open={menuOpen}
          anchorEl={anchorEl}
          onClose={() => setMenuOpen(false)}
          onClick={() => setMenuOpen(false)}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
        </Menu>
      </Paper>
    </div>
  );
}
