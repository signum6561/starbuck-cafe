import { Outlet } from 'react-router-dom';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import MenuBar from '@layout/components/MenuBar';
import BreadcumsHeader from '@layout/components/BreadcumsHeader';
import { useMenuBar } from '@context/MenuBarContext';

const cx = classNames.bind(styles);
export default function DefaultLayout() {
  const { menuBar, toggleMenuBar } = useMenuBar();
  console.log(menuBar);
  return (
    <div className={cx('wrapper', menuBar && 'menuBar-active')}>
      <div className={cx('menuBar')}>
        <MenuBar />
      </div>
      <div className={cx('header')}>
        <BreadcumsHeader />
      </div>
      <div className={cx('content')}>
        <Outlet />
      </div>
      <div className={cx('modal')} onClick={toggleMenuBar}></div>
    </div>
  );
}
