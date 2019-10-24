import * as React from "react";
import { TextInput } from "../ui/TextInput";
import { RaisedButton } from "../ui/RaisedButton";

interface Props {
  handleSignIn: () => void;
}

interface State {
  email?: string;
  password?: string;
}

class SignIn extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  private handleEmail = (event: any) => {
    this.setState({
      email: event.target.value
    });
  };

  private handlePassword = (event: any) => {
    this.setState({
      password: event.target.value
    });
  };

  public render() {
    return (
      <div>
        <TextInput onChange={this.handleEmail} />
        <br />
        <TextInput type="password" onChange={this.handlePassword} />
        <br />
        <RaisedButton onClick={this.props.handleSignIn}>Sign-in</RaisedButton>
      </div>
    );
  }
}

export default SignIn;
