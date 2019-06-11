import React from 'react';
import Prices from './Prices';
import PropTypes from 'prop-types';

const PricesList = props =>
  <>
    {props.prices.map((price, i) => {
      return <Prices
               key={i}
               days={props.days[i][1]}
               id={price[0]}
               value={price[1]}
               updatePrices={props.updatePrices}/>
    })}
  </>

PricesList.propTypes = {
  prices: PropTypes.array.isRequired,
  days: PropTypes.array.isRequired,
  updatePrices: PropTypes.func.isRequired
}

export default PricesList;
