import * as React from "react";
import Navbar from "../components/Navbar";
import { api, setJwt } from "../request";
import { verify } from "jsonwebtoken";
import SignIn from "./SignIn";

interface Props {}

interface State {
  token?: string | null;
  email?: string;
  password?: string;
  role?: string;
  userId?: string;
}

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      token: localStorage.getItem("token")
    };
  }

  componentDidMount = () => {
    if (localStorage.getItem("token")) {
      let decoded = verify(
        localStorage.getItem("token")!,
        `${process.env.REACT_APP_JWT_SECRET}`
      ) as any;
      if (decoded.exp < Math.floor(Date.now() / 1000) + 60 * 60) {
        localStorage.removeItem("token");
      } else {
        this.setState({
          role: decoded.role
        });
      }
    }
  };

  handleSignIn = () => {
    let { email, password } = this.state;
    api({
      method: "post",
      url: "/auth",
      headers: { "Content-Type": "application/json" },
      data: {
        email,
        password
      }
    })
      .then(response => {
        setJwt(response.data.token);
        let decoded = verify(
          response.data.token,
          `${process.env.REACT_APP_JWT_SECRET}`
        ) as any;
        this.setState({
          token: response.data.token,
          role: decoded.role,
          email: decoded.email,
          userId: decoded.sub
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleSignOut = () => {
    localStorage.removeItem("token");
    this.setState({
      token: null
    });
  };

  public render() {
    const { role, token, userId } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <Navbar />
        <div style={{ maxWidth: 1070, margin: "auto" }}>
          <div>
            <SignIn handleSignIn={this.handleSignIn} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
