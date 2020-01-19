import * as React from "react";

interface Props {
  title: string;
}

interface State {
  open: boolean;
}

class Card extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      open: false
    };
  }

  public render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            height: 50,
            width: "100%",
            marginTop: 25,
            cursor: "pointer",
            boxShadow:
              "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)"
          }}
        >
          <div style={{ padding: 15, fontWeight: "bold" }}>
            {this.props.title}
          </div>
        </div>
        {this.props.children && (
          <div style={{ border: "1px solid black", padding: 15 }}>
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}

// const Card = (props: any) => {
//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           height: 50,
//           width: "100%",
//           marginTop: 25,
//           cursor: "pointer",
//           boxShadow:
//             "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)"
//         }}
//       >
//         <div style={{ padding: 15, fontWeight: "bold" }}>{props.title}</div>
//       </div>
//       {props.children && (
//         <div style={{ border: "1px solid black", padding: 15 }}>
//           {props.children}
//         </div>
//       )}
//     </div>
//   );
// };

// Time
// Cancel Booking
// Booking/ Booked
// Booking name
// Booking amount

export default Card;
