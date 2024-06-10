import { useLocation } from 'react-router-dom';
import styles from './InDevelop.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
export default function InDevelop() {
  const location = useLocation();

  return (
    <div className={cx('wrapper')}>
      <h1>{location.pathname}</h1>
      <div className={cx('content')}>
        This page has not been implemented yet.
      </div>
    </div>
  );
}
