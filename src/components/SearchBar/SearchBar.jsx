import { Icon } from '@iconify/react';
import styles from './SearchBar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
export default function SearchBar({ ...props }) {
  return (
    <div className={cx('wrapper')}>
      <input type='search' {...props} />
      <div className={cx('search-icon')}>
        <Icon icon='material-symbols:search' />
      </div>
    </div>
  );
}
