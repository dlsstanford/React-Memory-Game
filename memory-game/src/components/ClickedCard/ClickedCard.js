import React from "react";
import "./ClickedCard.css";

const ClickedCard = props => (
  <div onClick={() => props.pickCard(props.id)} className="card">
    <div className="img-container">
      <img alt={props.name} src={props.image} />
    </div>
  </div>
);
 
export default ClickedCard;
