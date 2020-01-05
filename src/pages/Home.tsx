import * as React from "react";
import Container from "../components/Container";
import NavBar from "../components/Navbar";

class Home extends React.Component<never> {
  public render() {
    return (
      <div>
        <Container />
        <NavBar />
        <div style={{ textAlign: "center" }}>Content</div>
      </div>
    );
  }
}

export default Home;
