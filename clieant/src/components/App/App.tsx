import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import Details from "../Details/Details";
import ToDoList from "../ToDoList/ToDoList";
import MainLayout from "../../layout/MainLayout";
import PublicLayout from "../../layout/PublicLayout";
import AuthLayout from "../../layout/AuthLayout";
import "./app.css";

class App extends Component {
  render() {
    return (
      <MainLayout>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/login" element={<LoginForm />}></Route>
                <Route path="/register" element={<RegisterForm />}></Route>
              </Route>
            </Route>
            <Route element={<AuthLayout />}>
              <Route>
                <Route path="/posts" element={<ToDoList />}></Route>
                <Route path="/details" element={<Details />}></Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MainLayout>
    );
  }
}

export default App;
