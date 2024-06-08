import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import styles from './ManageColumn.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
export default function ManageColumn({ columns, onHideColumn }) {
  return (
    <div className={cx('wrapper')}>
      <FormGroup>
        {columns.map((col) => (
          <FormControlLabel
            key={col.id}
            control={
              <Checkbox
                checked={!col.hide}
                onChange={(e) => onHideColumn(e, col.id)}
                disabled={col.id === 'id'}
              />
            }
            label={col.label}
          />
        ))}
      </FormGroup>
    </div>
  );
}

ManageColumn.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  onHideColumn: PropTypes.func,
};
