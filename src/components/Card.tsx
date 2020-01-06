import * as React from "react";

const Card = (props: any) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          height: 50,
          width: "100%",
          margin: "25px 0px",
          cursor: "pointer",
          boxShadow:
            "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)"
        }}
      >
        <div style={{ padding: 15, fontWeight: "bold" }}>{props.title}</div>
      </div>
      <div>{props.children}</div>
    </div>
  );
};

// Time
// Cancel Booking
// Booking/ Booked
// Booking name
// Booking amount

export default Card;
