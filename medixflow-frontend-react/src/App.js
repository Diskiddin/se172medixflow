import React, { Component } from 'react';
import axios from 'axios';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import rootReducer from './state/rootReducer';
import Documentation from './documentation/Documentation';
import './App.css';
import PatientMenu from './patients/PatientMenu';
import { receivePatients } from './state/patientsState';
import GoogleLogin from 'react-google-login';
import getID from './google_sso'; //Must make a file named google_sso.js with function that returns clientID


import { injectIntl, defineMessages } from "react-intl";

const store = createStore(rootReducer);

//Temporary


class App extends Component {
  componentDidMount() {
    axios.get('https://medixflow.de/api/v1/patient')
      .then(response => store.dispatch(receivePatients(response.data)))
      .catch((err) => {
        console.log(err);
      });
  }

  render() {

    const googleSuccess = (response) => {
      //Set browser session item
      sessionStorage.setItem('googleUser', JSON.stringify(response))
      this.forceUpdate();
    }
    const googleFail = (response) => {
      console.log("Login Failed");
    }

    const logOut = () => {

      sessionStorage.setItem('googleUser', null)
      this.forceUpdate();
    }

    //Check if there is a google user logged in
    if(sessionStorage.getItem('googleUser') !== 'null') {
      const {intl:{formatMessage}} = this.props;
      return (
        <div>
        <header className="locale">
              <div className="languages">
                <a href="/?locale=en">English</a>
                <a href="/?locale=de">Deutsch</a>
                <button onClick={logOut}>Logout</button>
              </div>
        </header>
        <Provider store={store}>
          <Router>
            <div className="App">
              <PatientMenu />
              <Route path="/patients/:id" component={Documentation} />
            </div>
          </Router>
        </Provider>

        {
          //Simple logout
        }

        </div>
      );
    } else {
      return (
        <div style={{position: 'absolute', left:'50%', top:'50%', transform: 'translate(-50%, -50%)'}}>
          <GoogleLogin
            clientId="API Key"
            buttonText="Login with Google"
            onSuccess={googleSuccess}
            onFailure={googleFail}
          />
        </div>
      )
    }

    /***
    const {intl:{formatMessage}} = this.props;
    return (
      <div>
      <header className="locale">
            <div className="languages">
              <a href="/?locale=en">English</a>
              <a href="/?locale=de">Deutsch</a>
            </div>
      </header>
      <Provider store={store}>
        <Router>
          <div className="App">
            <PatientMenu />
            <Route path="/patients/:id" component={Documentation} />
          </div>
        </Router>
      </Provider>
      </div>
    );
    ***/
  }
}

export default injectIntl(App);
