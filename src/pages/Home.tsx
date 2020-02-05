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
  availabilities?: Date;
  selectedTime?: any;
  size?: number;
  booked: boolean;
  bookings: any;
  tables?: any;
}

class Home extends React.Component<never, State> {
  state = {
    date: new Date(),
    selectedTime: new Date(),
    size: 1,
    booked: false,
    bookings: [],
    tables: []
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
        size: event.target.value
      },
      () => {
        this.fetchTimes();
      }
    );
  };

  handleBooking = (booking: any) => {
    const bookingDate = new Date(booking.dateTime);
    this.setState({
      booked: !this.state.booked,
      selectedTime: bookingDate
    });

    api({
      method: "put",
      url: `/bookings/${booking._id}`,
      headers: { "Content-Type": "application/json" },
      data: {
        dateTime: bookingDate,
        name: "Test User",
        size: this.state.size,
        booked: "booked"
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  fetchTimes = () => {
    const date = this.state.date ? this.state.date : new Date();
    console.log(date);

    api({
      method: "get",
      url: "/available-times",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        const newTables = response.data.map((table: any) => {
          const newTable = {
            size: table.tableId[0].size,
            minSize: table.tableId[0].minSize,
            time: table.time
          };
          return newTable;
        });
        this.setState({
          tables: newTables
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  fetchAvailibities = () => {
    const date = this.state.date ? this.state.date : new Date();
    console.log(date);

    api({
      method: "post",
      url: "/bookings/byDate",
      headers: { "Content-Type": "application/json" },
      data: {
        dateTime: date
      }
    })
      .then(response => {
        this.setState({
          availabilities: response.data
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
    const { tables, size } = this.state;

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
                  value={this.state.size}
                />
              </div>
            </div>
            {tables.map((table: any, index: number) => {
              const dateString = new Date(table.time);
              const date = dateString.toLocaleDateString();
              const time = this.formatAMPM(dateString);
              if (size >= table.minSize && size < table.size) {
                return (
                  <div key={index}>
                    <TimeCard
                      title={time}
                      booking={table}
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
                          <p>Table for: {table.size}</p>
                          <p>Booking under: Test</p>
                        </div>
                      )}
                    </TimeCard>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
