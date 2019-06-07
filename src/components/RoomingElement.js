import React from 'react';
import PropTypes from 'prop-types';

const RoomingElement = props =>
<div className="rooming">
  <label>{props.title}</label>
  <input id={props.id} type="number" value={props.value} onChange={props.updateRooming}/>
</div>

RoomingElement.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  updateRooming: PropTypes.func.isRequired 
}

export default RoomingElement;
