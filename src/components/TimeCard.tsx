import * as React from "react";
import Modal from "./Modal";

interface Props {
  title: string;
  booking?: any;
  handleBooking?: any;
}

interface State {
  open: boolean;
}

class TimeCard extends React.Component<Props, State> {
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
        <Modal open={this.state.open} toggleModal={this.toggleModal}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export default TimeCard;
