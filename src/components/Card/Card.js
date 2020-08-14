import React from 'react';
import './Card.scss';
import {  faTemperatureHigh, faTemperatureLow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewInfo from './NewInfo/NewInfo';

//Creates the card which displays the weather information for the selected city 
const Card = (props) => (
  <div className="mainDiv">
    <h2 className="headi">{props.name}, {props.country}</h2>
    <h2 className="headi">Feels like: {props.feels_like}</h2>
    <div className="subDiv">
        <div className="divSty">{props.temperature + '\xB0'}</div>
        <div className="descSpan">
          <div>{props.description}</div>
          <div><span><FontAwesomeIcon icon={faTemperatureHigh} size="2x" /></span>{props.max_temp}</div>
          <div><span><FontAwesomeIcon icon={faTemperatureLow} size="2x" /></span>{props.min_temp} </div>
        </div>
    </div>
    <div className="newInfoContainer">
      <NewInfo  sunset={props.sunset} sunrise={props.sunrise} visibility={props.visibility} humidity={props.humidity}/>
    </div>
  </div>
)
export default Card;