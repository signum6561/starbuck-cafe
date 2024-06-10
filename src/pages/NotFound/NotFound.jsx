import { Button } from '@mui/material';
import styles from './NotFound.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={cx('wrapper')}>
      <div className={cx('msg')}>
        <h1>404</h1>
        <p>Oops! This page is not found or not exist.</p>
        <Button variant='contained' onClick={() => navigate('/')}>
          Return to Home Page
        </Button>
      </div>
    </div>
  );
}
