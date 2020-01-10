import * as React from "react";
import Container from "../components/Container";
import NavBar from "../components/Navbar";
import { api } from "../request";
import Modal from "../components/Modal";
import { TextInput } from "../ui/TextInput";
import { RaisedButton } from "../ui/RaisedButton";
import DatePicker from "react-date-picker";

interface State {
  date?: Date;
  size?: number;
  booked: boolean;
  hours?: number;
  minutes?: number;
  bookings: any;
}

class Home extends React.Component<never, State> {
  state = {
    date: new Date(),
    amount: 1,
    booked: false,
    hours: undefined,
    minutes: undefined,
    bookings: []
  };

  componentDidMount() {
    this.fetchTimes();
  }

  handleDate = (date: any) => {
    this.setState({
      date: date
    });
  };

  handleAmount = (event: any) => {
    this.setState({
      size: event.target.value
    });
  };

  handleBooking = () => {
    var newTime = this.state.date;
    if (this.state.hours && this.state.minutes) {
      newTime.setHours(this.state.hours!);
      newTime.setMinutes(this.state.minutes!);
    }

    this.setState({
      booked: !this.state.booked,
      date: newTime
    });
  };

  fetchTimes = () => {
    api({
      method: "post",
      url: "/bookings/byDate",
      headers: { "Content-Type": "application/json" },
      data: {
        dateTime:
          "Wed Jan 20 2020 21:30:36 GMT+1000 (Australian Eastern Standard Time)"
      }
    })
      .then(response => {
        console.log("response: ", response.data);
        this.setState({
          bookings: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  formatAMPM = (date: Date) => {
    let hours = date.getHours();
    let minutes: any = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  public render() {
    const { bookings } = this.state;

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
                <p style={{ marginTop: 0 }}>How many people? (Max 6)</p>
                <TextInput
                  style={{ margin: 0, width: 200 }}
                  onChange={this.handleAmount}
                  value={this.state.amount}
                />
              </div>
            </div>
            {bookings.map((booking: any, index: number) => {
              const dateString = new Date(booking.dateTime);
              const date = dateString.toLocaleDateString();
              const timeString = new Date(booking.dateTime);
              const time = this.formatAMPM(timeString);

              return (
                <div key={index}>
                  <Modal title={time}>
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
                        <p>Date: {date}</p>
                        <p>Time: {time}</p>
                        <p>Table for: {booking.size}</p>
                        <p>Booking under: {booking.name}</p>
                        <div style={{ paddingTop: 10 }}>
                          <RaisedButton onClick={this.handleBooking}>
                            Book Now
                          </RaisedButton>
                        </div>
                      </div>
                    )}
                  </Modal>
                </div>
              );
            })}

            {/* <Modal title="8:00PM">
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
            </Modal> */}
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
