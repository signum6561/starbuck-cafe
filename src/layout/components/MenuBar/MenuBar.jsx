import StarbuckLogo from '@components/StarbuckLogo';
import styles from './MenuBar.module.scss';
import classNames from 'classnames/bind';
import Tabs from '@components/Tabs';
import Tab from '@components/Tab';
import { useNavigate } from 'react-router-dom';
import TabsList from '@components/TabsList';

const cx = classNames.bind(styles);
export default function MenuBar() {
  const navigate = useNavigate();

  return (
    <div className={cx('wrapper')}>
      <StarbuckLogo title width='192' height='96' />
      <div className={cx('menu-tabs')}>
        <Tabs defaultValue={0} margin='normal' vertical fullWidth>
          <TabsList
            value={0}
            label=' Home'
            startIcon='ic:sharp-home'
            onClick={() => navigate('/')}
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
            <Tab
              handleClick={() => navigate('/products')}
              startIcon='mdi:food'
              value={3}
            >
              Products
            </Tab>
            <Tab
              handleClick={() => navigate('/catagories')}
              startIcon='material-symbols:category'
              value={4}
            >
              Categories
            </Tab>
            <Tab
              handleClick={() => navigate('/coupons')}
              startIcon='mdi:coupon'
              value={5}
            >
              Coupons
            </Tab>
          </TabsList>
          <TabsList startIcon='fluent:building-24-filled' label='Company'>
            <Tab
              handleClick={() => navigate('/staff')}
              startIcon='mdi:people-group'
              value={8}
            >
              Staff
            </Tab>
            <Tab
              handleClick={() => navigate('/department')}
              startIcon='mingcute:department-fill'
              value={9}
            >
              Department
            </Tab>
          </TabsList>
          <TabsList startIcon='ic:baseline-miscellaneous-services' label='Misc'>
            <Tab
              handleClick={() => navigate('/settings')}
              startIcon='lets-icons:setting-fill'
              value={6}
            >
              Setting
            </Tab>
            <Tab
              handleClick={() => navigate('/about')}
              startIcon='mdi:about'
              value={7}
            >
              About
            </Tab>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
