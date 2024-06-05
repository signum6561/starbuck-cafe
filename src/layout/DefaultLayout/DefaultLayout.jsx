import { Navigate, Outlet } from 'react-router-dom';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import MenuBar from '@layout/components/MenuBar';
import BreadcumsHeader from '@layout/components/BreadcumsHeader';
import { useMenuBar } from '@context/MenuBarContext';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@mui/material';

const cx = classNames.bind(styles);
export default function DefaultLayout() {
  const { menuBar, toggleMenuBar } = useMenuBar();
  const { token, status } = useSelector((store) => store.auth);
  const isLoading = status === 'loading';

  if (!token) {
    return <Navigate to='/login' />;
  }

  return (
    <div className={cx('wrapper', menuBar && 'menuBar-active')}>
      <div className={cx('menuBar')}>
        <MenuBar />
      </div>
      <div className={cx('header')}>
        <BreadcumsHeader />
        {isLoading && <LinearProgress />}
      </div>
      <div className={cx('content')}>{!isLoading && <Outlet />}</div>
      <div className={cx('modal')} onClick={toggleMenuBar}></div>
    </div>
  );
}
