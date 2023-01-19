import { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../withRoutr/withRouter";
import serviceData from "../../services/Data";
import Input from "../Input/Input";
import Button from "../Button/Button";
import illustration from "../../asset/img/illustration.png";
import "./loginForm.css";

interface IProps {
  router: {
    navigate: (path: string) => void
  }
}

interface IState {
  email: string,
  password: string,
  message: string
}

class LoginForm extends Component<IProps, IState> {
  state = {
    email: "",
    password: "",
    message: "",
  };

  onSubmit = (email:string, password:string) => {
    serviceData
      .postFormData("/login", {
        email,
        password,
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.user.name);
        }
      })
      .then(() => {
        this.props.router.navigate("/posts");
      })
      .catch((error) => {
        switch (error.message) {
          case "Inputes are required!":
            this.setState({ message: "Inputes are required!" });
            break;
          case "Invalid email or password!":
            this.setState({ message: "Invalid email or password!" });
            break;
          case "Invalid password!":
            this.setState({ message: "Invalid password!" });
            break;
          default:
            console.log(error);
        }
      });
  };

  handleInputChanged = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]:  e.target.value,
    } as unknown as IState);
  };

  render() {
    const { email, password, message } = this.state;
    return (
      <>
        <div className="container">
          <div className="image">
            <img src={illustration} alt="Illustration"></img>
          </div>
          <div className="content">
            <div className="login__container">
              <div className="title">
                <div>Login to your Account</div>
              </div>
              <div className="form">
                <form action="">
                  <div className="inp-grp">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="mail@abc.com"
                      value={email}
                      onChange={this.handleInputChanged}
                    />
                  </div>
                  <div className="inp-grp">
                    <Input
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="*****************"
                      value={password}
                      onChange={this.handleInputChanged}
                    />
                  </div>
                  <span className="error-message">{message}</span>
                  <div className="inp-grp check__inp-grp">
                    <div className="check-grp">
                      <input type="checkbox" id="remember" name="checkbox" />
                      <label htmlFor="remember">Remember Me</label>
                    </div>
                    <div>
                      <span>Forgot Password?</span>
                    </div>
                  </div>
                  <div className="inp-grp">
                    <Button
                      value="Login"
                      onClick={() => this.onSubmit(email, password)}
                    />
                  </div>
                </form>
              </div>
              <div className="link-subtitle">
                Not Registered Yet?
                <Link to="/register">
                  <span>Create an account</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(LoginForm);
