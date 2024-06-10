import { Avatar } from '@mui/material';
import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';
import { Icon } from '@iconify/react';
import { BarChart } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const cx = classNames.bind(styles);

const dataset = [
  {
    revenue: 577,
    month: 'January',
  },
  {
    revenue: 443,
    month: 'February',
  },
  {
    revenue: 572,
    month: 'March',
  },
  {
    revenue: 443,
    month: 'April',
  },
  {
    revenue: 425,
    month: 'May',
  },
  {
    revenue: 299,
    month: 'June',
  },
  {
    revenue: 506,
    month: 'July',
  },
  {
    revenue: 417,
    month: 'August',
  },
  {
    revenue: 493,
    month: 'September',
  },
  {
    revenue: 427,
    month: 'October',
  },
  {
    revenue: 483,
    month: 'November',
  },
  {
    revenue: 495,
    month: 'December',
  },
];

const topProducts = [
  {
    rank: 1,
    label: 'Hot Coffees',
  },
  {
    rank: 2,
    label: 'Cold Coffees',
  },
  {
    rank: 3,
    label: 'Bakery',
  },
  {
    rank: 4,
    label: 'Milks',
  },
  {
    rank: 5,
    label: 'Frappuccino',
  },
  {
    rank: 6,
    label: 'Lemonade',
  },
  {
    rank: 7,
    label: 'Bottle Reverages',
  },
  {
    rank: 8,
    label: 'Chai Tea Latte',
  },
];

const otherSetting = {
  height: 350,
  grid: { horizontal: true },
  sx: {
    [`& .${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

const valueFormatter = (value) => `$${value}K`;

export default function Dashboard() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <div className={cx('card')}>
          <Avatar sx={{ bgcolor: '#53967e' }}>
            <Icon icon='fluent:people-24-filled' />
          </Avatar>
          <h2 className={cx('title')}>New Customers</h2>
          <p className={cx('value')}>971</p>
          <p className={cx('percent')}>
            <b>12%</b> Increase this year
          </p>
        </div>
        <div className={cx('card')}>
          <Avatar sx={{ bgcolor: '#5872bf' }}>
            <Icon icon='iconamoon:invoice-fill' />
          </Avatar>
          <h2 className={cx('title')}>Invoices</h2>
          <p className={cx('value')}>61,899</p>
        </div>
        <div className={cx('card')}>
          <Avatar sx={{ bgcolor: '#d0ed72' }}>
            <Icon icon='iconoir:cash-solid' />
          </Avatar>
          <h2 className={cx('title')}>Revenue</h2>
          <p className={cx('value')}>$654,975</p>
          <p className={cx('percent')}>
            <b>2.41%</b> Decrease this year
          </p>
        </div>
        <div className={cx('card')}>
          <Avatar sx={{ bgcolor: '#3bad4e' }}>
            <Icon icon='material-symbols:store' />
          </Avatar>
          <h2 className={cx('title')}>Department</h2>
          <p className={cx('value')}>173</p>
        </div>
        <div className={cx('card')}>
          <BarChart
            dataset={dataset}
            colors={['#016343']}
            xAxis={[
              {
                scaleType: 'band',
                dataKey: 'month',
                valueFormatter: (month, context) =>
                  context.location === 'tick'
                    ? `${month.slice(0, 3)} \n2023`
                    : `${month} 2023`,
              },
            ]}
            series={[{ dataKey: 'revenue', label: 'Revenue', valueFormatter }]}
            {...otherSetting}
          />
        </div>
        <div className={cx('top-products')}>
          <h2>Top Products</h2>
          {topProducts.map((pr) => (
            <div key={pr.label} className={cx('product')}>
              <Avatar sx={{ bgcolor: pr.rank === 1 ? '#e84338' : '#97d8b1' }}>
                {pr.rank}
              </Avatar>
              <p>{pr.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
