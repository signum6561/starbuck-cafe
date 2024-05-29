import styles from './CustomerDetail.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
export default function CustomerDetail() {
  return (
    <div className={cx('wrapper')}>
      <h1>Hello</h1>
    </div>
  );
}
