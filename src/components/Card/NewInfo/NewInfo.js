import React from 'react';
import './NewInfo.scss';

//Provides the information - visibility Humidity, sunrise and sunset
const NewInfo = (props) => (
  <div className="items">
    <div className="item"><div>{props.visibility} km <br/> visibility</div></div>
    <div className="item"><div>{props.humidity} %<br/> Humidity</div></div>
    <div className="item"><div>{props.sunrise}<br/> Sunrise</div></div>
    <div className="item"><div>{props.sunset}<br/> Sunset</div></div> 
  </div>
)
export default NewInfo;