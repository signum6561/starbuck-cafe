import styles from './DataTable.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
export default function DataTable({ columns, rows }) {
  const createRow = (row, key) => {
    return (
      <tr key={key}>
        {columns.map((col) => (
          <td key={col.id} className={cx('cell', col.align)}>
            {row[col.id]}
          </td>
        ))}
      </tr>
    );
  };

  return (
    <div className={cx('wrapper')}>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th className={cx('field', col.align)} key={col.id}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows.map((row, index) => createRow(row, index))}</tbody>
      </table>
    </div>
  );
}

DataTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
};
