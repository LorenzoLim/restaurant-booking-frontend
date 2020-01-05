import * as React from "react";
import { api, setJwt } from "../request";
import { verify } from "jsonwebtoken";
import { TextInput } from "../ui/TextInput";
import { RaisedButton } from "../ui/RaisedButton";

interface Props {}

interface State {
  token?: string | null;
  email?: string;
  password?: string;
  role?: string;
  userId?: string;
}

class SignIn extends React.Component<Props, State> {
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

  handleEmail = (event: any) => {
    this.setState({
      email: event.target.value
    });
  };

  handlePassword = (event: any) => {
    this.setState({
      password: event.target.value
    });
  };

  public render() {
    const { role, token, userId } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <div style={{ maxWidth: 1070, margin: "auto" }}>
          <div>
            <TextInput onChange={this.handleEmail} />
            <br />
            <TextInput type="password" onChange={this.handlePassword} />
            <br />
            <RaisedButton onClick={this.handleSignIn}>Sign-In</RaisedButton>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
