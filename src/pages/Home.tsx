import * as React from "react";
import Container from "../components/Container";
import NavBar from "../components/Navbar";
import { api } from "../request";
import TimeCard from "../components/TimeCard";
import { TextInput } from "../ui/TextInput";
import DatePicker from "react-date-picker";
const moment = require("moment");

interface State {
  date?: Date;
  selectedTime?: any;
  amount?: number;
  booked: boolean;
  bookings: any;
}

class Home extends React.Component<never, State> {
  state = {
    date: new Date(),
    selectedTime: new Date(),
    amount: 1,
    booked: false,
    bookings: []
  };

  componentDidMount() {
    this.fetchTimes();
  }

  handleDate = (date: any) => {
    this.setState(
      {
        date: date
      },
      () => {
        this.fetchTimes();
      }
    );
  };

  handleAmount = (event: any) => {
    this.setState(
      {
        amount: event.target.value
      },
      () => {
        this.fetchTimes();
      }
    );
  };

  handleBooking = (booking: any) => {
    this.setState({
      booked: !this.state.booked,
      selectedTime: booking.dateTime
    });
  };

  fetchTimes = () => {
    const date = this.state.date ? this.state.date : new Date();
    api({
      method: "post",
      url: "/bookings/byDate",
      headers: { "Content-Type": "application/json" },
      data: {
        dateTime: date
      }
    })
      .then(response => {
        const tableAmountMatch = response.data
          .map((booking: any) => {
            if (!booking.booked) {
              if (this.state.amount <= 2 && booking.size === 2) {
                booking.size = this.state.amount;
                return booking;
              } else if (this.state.amount <= 4 && booking.size === 4) {
                booking.size = this.state.amount;
                return booking;
              } else if (this.state.amount <= 6 && booking.size === 6) {
                booking.size = this.state.amount;
                return booking;
              } else {
                return null;
              }
            } else {
              return null;
            }
          })
          .filter((booking: any) => booking);
        this.setState({
          bookings: tableAmountMatch
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  formatAMPM = (date: Date) => {
    let hours = date.getHours();
    let minutes: any = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
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
        <NavBar />
        <Container>
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
                  minDate={moment().toDate()}
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
                  <TimeCard
                    title={time}
                    booking={booking}
                    handleBooking={this.handleBooking}
                  >
                    {this.state.booked ? (
                      <div
                        style={{
                          padding: 20
                        }}
                      >
                        <p>Your booking has been confirmed</p>
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
                      </div>
                    )}
                  </TimeCard>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
