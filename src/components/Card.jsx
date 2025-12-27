import React from "react";
import { Link } from "react-router-dom";

function Card({ title, description, link }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        width: "280px",
      }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link}>Learn More →</Link>
    </div>
  );
}

export default Card;
