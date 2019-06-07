import React from 'react';
import PropTypes from 'prop-types';

const SelectListini = props =>
  <div id="pricelists">
    <label>Price Lists</label>
    <select
      id="listini"
      name="listini"
      onChange={props.updatePriceList}
      value={props.value}>
        {props.priceLists.map((x, i) => <option key={i} value={x}>{x}</option>)}
    </select>
  </div>

SelectListini.propTypes = {
  value: PropTypes.string.isRequired,
  updatePriceList: PropTypes.func.isRequired,
  priceLists: PropTypes.array.isRequired
}

export default SelectListini;
