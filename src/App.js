import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Users from './Components/users/Users';
import User from './Components/users/User';
import Search from './Components/users/Search';
import Alert from './Components/Layout/Alert';
import About from './Components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  };

  // Search Github users
  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  // Get a single Github user
  getUser = async username => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ user: res.data, loading: false });
  };

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    // Clear the alert message after a set amount of time
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, user, loading } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar title='Github Finder' icon='fab fa-github' />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
