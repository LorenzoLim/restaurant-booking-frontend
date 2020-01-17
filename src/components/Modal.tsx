import * as React from "react";
import { RaisedButton } from "../ui/RaisedButton";

interface Props {
  title: string;
  booking?: any;
  handleBooking?: any;
}
interface State {
  open: boolean;
}

class Modal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      open: false
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({
      open: !this.state.open
    }));
  };

  setTime = () => {
    this.props.handleBooking(this.props.booking);
  };

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
            justifyContent: "center",
            boxShadow:
              "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)"
          }}
          onClick={this.toggleModal}
        >
          <div style={{ padding: 15, fontWeight: "bold" }}>
            {this.props.title}
          </div>
        </div>
        {this.state.open && (
          <div
            style={{
              display: this.state.open ? "block" : "none",
              position: "fixed",
              zIndex: 1,
              paddingTop: 100,
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              overflow: "auto",
              backgroundColor: "rgba(0,0,0,0.4)"
            }}
          >
            <div
              style={{
                backgroundColor: "#fefefe",
                margin: "auto",
                width: "80%",
                minHeight: 300,
                maxWidth: 400,
                zIndex: 2,
                overflow: "auto"
              }}
            >
              <div
                style={{
                  height: 40,
                  backgroundColor: "#ff3232",
                  color: "white",
                  lineHeight: 2.0,
                  paddingLeft: 20,
                  fontSize: 20
                }}
              >
                Booking Information
                <span
                  style={{
                    color: "white",
                    float: "right",
                    marginRight: 10,
                    marginTop: -20,
                    fontSize: 38,
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                  onClick={this.toggleModal}
                >
                  &times;
                </span>
              </div>
              {this.props.children}
              <div style={{ paddingTop: 10 }}>
                <RaisedButton onClick={this.setTime}>Book Now</RaisedButton>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Modal;
