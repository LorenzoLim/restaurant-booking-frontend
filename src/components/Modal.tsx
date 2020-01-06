import * as React from "react";

interface Props {
  title: string;
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
            onClick={this.toggleModal}
          >
            <div
              style={{
                backgroundColor: "#fefefe",
                margin: "auto",
                width: "80%",
                minHeight: 400,
                maxWidth: 800,
                overflow: "auto"
              }}
            >
              <div
                style={{
                  height: 40,
                  backgroundColor: "#ff3232",
                  color: "white",
                  lineHeight: 2.5,
                  paddingLeft: 20
                }}
              >
                Booking Information
              </div>
              {this.props.children}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Modal;
