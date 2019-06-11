import React from 'react';
import RoomingElement from './RoomingElement';
import PropTypes from 'prop-types';

const Rooming = props =>
  <div className="list">
    <p style={{textAlign: "center"}}>Rooming</p>
    <p>______________________</p>
    <p>______________________</p>
    <RoomingElement title="adulti" id="ad" value={props.value.ad} updateRooming={props.updateRooming}/>
    <RoomingElement title="adulti 3-4 letto" id="ad34" value={props.value.ad34} updateRooming={props.updateRooming}/>
    <RoomingElement title="chd 3 letto" id="chd3" value={props.value.chd3} updateRooming={props.updateRooming}/>
    <RoomingElement title="chd 4 letto" id="chd4" value={props.value.chd4} updateRooming={props.updateRooming}/>
    <RoomingElement title="infant" id="inf" value={props.value.inf} updateRooming={props.updateRooming}/>
    <RoomingElement title="animal" id="animal" value={props.value.animal} updateRooming={props.updateRooming}/>
    <RoomingElement title="culla" id="culla" value={props.value.culla} updateRooming={props.updateRooming}/>
    <RoomingElement title="supp. singola" id="sing" value={props.value.sing} updateRooming={props.updateRooming}/>
  </div>

Rooming.propTypes = {
  value: PropTypes.object.isRequired,
  updateRooming: PropTypes.func.isRequired
}

export default Rooming;
