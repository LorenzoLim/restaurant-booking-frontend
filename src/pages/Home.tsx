import * as React from "react";
import Container from "../components/Container";
import NavBar from "../components/Navbar";
import { TextInput } from "../ui/TextInput";
import DatePicker from "react-date-picker";

interface State {
  date?: Date;
  amount?: number;
}

class Home extends React.Component<never, State> {
  state = {
    date: new Date(),
    amount: 1
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
          <div style={{ padding: 50, width: "100%" }}>
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
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
