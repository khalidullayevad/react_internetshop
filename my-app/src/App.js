import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import './bootstrap/css/bootstrap.min.css';

import "./App.css";


import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import CardList from './components/cardList';
import CardDetail from './components/cardDetail';
import CardEdit from './components/cardEdit';


var nav_class = {
  backgroundColor: "#2f4f67",
  color: 'white',
}

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
    <nav class="navbar navbar-expand-lg navbar-light" style={nav_class}>
            <div className="container">
            <a className="navbar-brand" href="#" style ={{color:'white', fontWeight:'bold'}} >ITrello</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} style ={{color:'white', fontWeight:'bold'}} className="nav-link">
                Home
              </Link>
            </li>

              </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item active">
                    <a className="nav-link" href="/all" style ={{color:'white', fontWeight:'bold'}}>All Cards </a>
                </li>
              <li className="nav-item">
                <Link to={"/profile"}style ={{color:'white', fontWeight:'bold'}} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login"style ={{color:'white', fontWeight:'bold'}} className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"}style ={{color:'white', fontWeight:'bold'}} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"}style ={{color:'white', fontWeight:'bold'}} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path = "/all" component = {CardList}></Route>
          <Route path = "/detail/:id" component = {CardDetail}></Route>
         <Route path = "/edit/:id" component = {CardEdit}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
