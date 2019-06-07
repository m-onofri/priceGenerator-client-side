import React from 'react';
import PropTypes from 'prop-types';

const TotalAmount = props => <h2 id="totalAmount">Total: {props.total} €</h2>

TotalAmount.propTypes = {total: PropTypes.number.isRequired}

export default TotalAmount;
