import Filter from '@components/Filter/';
import styles from './FilterBuilder.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const cx = classNames.bind(styles);
export default function FilterBuilder({
  config,
  onAddFilter,
  onDeleteFilter,
  onClearFilter,
  value,
}) {
  const filterList = value;

  return (
    <div className={cx('wrapper')}>
      {filterList.map((filter) => (
        <Filter
          key={filter.id}
          columns={config}
          onFilterChange={onAddFilter}
          onRemoveFilter={onDeleteFilter}
          value={filter}
        />
      ))}
      <Button
        onClick={() => {
          onAddFilter({
            value: '',
            operator: 'eq',
            column: config[0].id,
          });
        }}
      >
        Add Filter
      </Button>
      {value.length > 0 && (
        <Button onClick={() => onClearFilter()}>Clear</Button>
      )}
    </div>
  );
}

FilterBuilder.propTypes = {
  config: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddFilter: PropTypes.func,
  onDeleteFilter: PropTypes.func,
  onClearFilter: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.object),
};
