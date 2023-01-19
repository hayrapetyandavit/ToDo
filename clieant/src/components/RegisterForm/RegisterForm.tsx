import { Component } from "react";
import { Link } from "react-router-dom";
import serviceData from "../../services/Data";
import withRouter from "../withRoutr/withRouter";
import Input from "../Input/Input";
import Button from "../Button/Button";
import illustration from "../../asset/img/illustration.png";
import "../LoginForm/loginForm.css";

interface IProps {
  router: {
    navigate: (path: string) => void
  }
}

interface IState {
  name: string,
  email: string,
  password: string,
  message: string
}

class RegisterForm extends Component<IProps, IState> {
  state = {
    name: "",
    email: "",
    password: "",
    message: "",
  };

  onSubmit = (name:string, email:string, password:string) => {
    serviceData
      .postFormData("/register", {
        name,
        email,
        password,
      })
      .then(() => {
        this.props.router.navigate("/login");
      })
      .catch((error) => {
        switch (error.message) {
          case "Please SignIn!":
            this.props.router.navigate("/login");
            this.setState({ message: "Please Log In!" });
            break;
          case "Inputes are required!":
            this.setState({ message: "Inputes are required!" });
            break;
          case "Enter your email and password!":
            this.setState({ message: "Enter your email and password!" });
            break;
          default:
            console.log(error);
        }
      });
  };

  handleInputChanged = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value,
    } as unknown as IState);
  };

  render() {
    const { name, email, password, message } = this.state;
    return (
      <>
        <div className="container">
          <div className="image">
            <img src={illustration} alt="Illustration"></img>
          </div>
          <div className="content">
            <div className="login__container">
              <div className="title">
                <div>Create an Account</div>
              </div>
              <div className="form">
                <form action="">
                  <div className="inp-grp">
                    <Input
                      label="Name"
                      name="name"
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={this.handleInputChanged}
                    />
                  </div>
                  <div className="inp-grp">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      placeholder={"mail@abc.com"}
                      value={email}
                      onChange={this.handleInputChanged}
                    />
                  </div>
                  <div className="inp-grp">
                    <Input
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="****************"
                      value={password}
                      onChange={this.handleInputChanged}
                    />
                  </div>
                  <span className="error-message">{message}</span>
                  <div className="inp-grp">
                    <Button
                      value="Register"
                      onClick={() => this.onSubmit(name, email, password)}
                    />
                  </div>
                </form>
              </div>
              <div className="link-subtitle">
                <Link to="/login">
                  <span>Already have an account?</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(RegisterForm);
