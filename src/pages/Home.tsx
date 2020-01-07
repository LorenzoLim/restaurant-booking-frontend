import * as React from "react";
import Container from "../components/Container";
import NavBar from "../components/Navbar";
// import Card from "../components/Card";
import Modal from "../components/Modal";
import { TextInput } from "../ui/TextInput";
import { RaisedButton } from "../ui/RaisedButton";
import DatePicker from "react-date-picker";

interface State {
  date?: Date;
  amount?: number;
  booked: boolean;
}

class Home extends React.Component<never, State> {
  state = {
    date: new Date(),
    amount: 1,
    booked: false
  };

  handleDate = (date: any) => {
    this.setState({
      date: date
    });
  };

  handleAmount = (event: any) => {
    this.setState({
      amount: event.target.value
    });
  };

  handleBooking = () => {
    this.setState({
      booked: !this.state.booked
    });
  };

  public render() {
    return (
      <div>
        <Container>
          <NavBar />
          <div
            style={{
              marginLeft: 50,
              paddingTop: 80,
              fontSize: 50,
              borderBottom: "4px solid #ff3232",
              width: 250
            }}
          >
            Booking
          </div>
          <div style={{ padding: 50 }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "40%" }}>
                <p style={{ marginTop: 0 }}>Date:</p>
                <DatePicker
                  onChange={this.handleDate}
                  value={this.state.date}
                />
              </div>
              <div style={{ width: "200px" }}>
                <p style={{ marginTop: 0 }}>How many people? (Max 8)</p>
                <TextInput
                  style={{ margin: 0, width: 200 }}
                  onChange={this.handleAmount}
                  value={this.state.amount}
                />
              </div>
            </div>
            <Modal title="7:30PM">
              {this.state.booked ? (
                <div
                  style={{
                    padding: 20
                  }}
                >
                  <p>Your booking has been confirmed</p>
                  <div style={{ paddingTop: 10 }}>
                    <RaisedButton onClick={this.handleBooking}>
                      Cancel Booking
                    </RaisedButton>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    padding: 20
                  }}
                >
                  <p>Date: 6/1/2020</p>
                  <p>Time: 7:30PM</p>
                  <p>Table for: 4</p>
                  <p>Booked under: Lorenzo Lim</p>
                  <div style={{ paddingTop: 10 }}>
                    <RaisedButton onClick={this.handleBooking}>
                      Book Now
                    </RaisedButton>
                  </div>
                </div>
              )}
            </Modal>
            <Modal title="8:00PM">
              <div
                style={{
                  padding: 20
                }}
              >
                Date: 6/1/2020
                <br /> Time: 8:00PM
                <br /> Table for: 1
                <br /> Booked under: Lorenzo Lim
              </div>
            </Modal>
            <Modal title="8:30PM">
              <div
                style={{
                  padding: 20
                }}
              >
                Date: 6/1/2020
                <br /> Time: 8:30PM
                <br /> Table for: 8
                <br /> Booked under: Lorenzo Lim
              </div>
            </Modal>
            <Modal title="9:00PM">
              <div
                style={{
                  padding: 20
                }}
              >
                Date: 6/1/2020
                <br /> Time: 9:00PM
                <br /> Table for: 2
                <br /> Booked under: Lorenzo Lim
              </div>
            </Modal>
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
