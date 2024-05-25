import { Outlet } from 'react-router-dom';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import MenuBar from '@components/MenuBar';

const cx = classNames.bind(styles);
export default function DefaultLayout() {
  return (
    <div className={cx('wrapper')}>
      <MenuBar />
      <Outlet />
    </div>
  );
}
