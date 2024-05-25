import StarbuckLogo from '@components/StarbuckLogo';
import styles from './MenuBar.module.scss';
import classNames from 'classnames/bind';
import Tabs from '@components/Tabs';
import Tab from '@components/Tab';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
export default function MenuBar() {
  const navigate = useNavigate();
  return (
    <div className={cx('wrapper')}>
      <div className={cx('logo-title')}>
        <StarbuckLogo />
      </div>
      <Tabs defaultValue={0} margin='normal' vertical fullWidth>
        <Tab
          handleClick={() => navigate('/dashboard')}
          startIcon='material-symbols:dashboard'
          value={0}
        >
          Dashboard
        </Tab>
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
      </Tabs>
    </div>
  );
}
