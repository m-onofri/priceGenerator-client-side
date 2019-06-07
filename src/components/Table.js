import React from 'react';
import Resume from './Resume.js';
import PropTypes from 'prop-types';

const Table = props => {

  //Remove the rooming items equal to zero
  const roomingArr = Object.entries(props.rooming).filter(r => r[1] !== 0);

  return (
    <table>
      <tbody>
        <tr>
          <th>Date</th>
          {roomingArr.map(r => <th>{r[0]}</th>)}
          <th>Total</th>
        </tr>
        <Resume
          days={props.days}
          prices={props.prices}
          rooming={props.rooming}
          total={props.total}/>
      </tbody>
    </table>
  )
}

Table.propTypes = {
  days: PropTypes.array.isRequired,
  prices: PropTypes.array.isRequired,
  rooming: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired
}

export default Table;
