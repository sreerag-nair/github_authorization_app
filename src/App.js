import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Dashboard from './Dashboard';
import Redirect from './RedirectComponent';
import { Link, Route, Switch } from 'react-router-dom';
const passport = require('passport')
const cors = require('cors')
class App extends Component {

  updateEmail(event) {
    console.log(" email value : ", event.target.value)
    this.setState({ emailId: event.target.value })

  }

  updatePassword(event) {
    console.log(" pwd value : ", event.target.value)
    this.setState({ password: event.target.value })
  }


  contactGithub() {
    // console.log("HERE<")
    //  axios.get('https://www.github.com/login/oauth/authorize/',{
    //   /* client_id : '3fb8c782622ac4a1d0a6',
    //   redirect_uri : '',
    //   state : 'An unguessable random string',
    //   allow_signup : false */
    // }, {
    //   headers : {
    //     'Access-Control-Allow-Origin' : '*',
    //   }
    // })
    // .then((response) =>{
    //   console.log("response from github : ", response)
    // }) 

    //this doesnt work when the window name is 'gitWindow'.... strange
    // window.open('https://www.github.com/login/oauth/authorize/?client_id=3fb8c782622ac4a1d0a6',
    //   'gitWindow',
    //   "height=100,width=100")

    //but this does.....
    window.open('https://www.github.com/login/oauth/authorize/?client_id=3fb8c782622ac4a1d0a6',//&redirect_uri=http://localhost:3000/dashboard',
      'gitwindow',
      "height=600,width=500")


    /*  fetch('https://www.github.com/login/oauth/authorize/?client_id=3fb8c782622ac4a1d0a6', {
    method: 'GET',
    mode: 'no-cors',
    // body : {
    //   client_id : '3fb8c782622ac4a1d0a6'
    // }
  })
  .then((response) => {
    console.log('rs : ', response)
  }) */

  }


  //// VERY IMPORTANT FUNCTION////
  check() {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1]
    console.log(window.location.href)
  }


  localdata() {
    console.log("dszfgv : ", this.state.emailId)
    console.log("dsxfgdfh : ", this.state.password)

    axios.post('http://localhost:8001/localstrategy', {
      username: this.state.emailId,
      password: this.state.password
    })
      .then((response) => {
        console.log("response : ", response)
      })
  }


  state = {
    emailId: '',
    password: ''
  }

  tywin(){
    axios.get('http://localhost:8005/fire',{},)
    .then((res) =>{
      console.log("res : ",res)
    })
  }

  render() {

    return (
      <span>
        <Switch>

          <Route exact path="/" render={() => {
            return (
              <div className="App">
                <div id="loginBox">
                  <div style={{ paddingTop: '100px' }}>
                    <div>
                      <div>email-id</div>
                      <input type="email" required value={this.state.emailId} onChange={this.updateEmail.bind(this)} />
                    </div>
                    <div>
                      <div>password</div>
                      <input type="text" required value={this.state.password} onChange={this.updatePassword.bind(this)} />
                    </div>
                    <div>
                      {/* <a href = "">Link</a> */}


                      {/* <Link to='http://localhost:8001/fire'> */}
                      <a href="http://localhost:8005/authenticate">
                        <button /* onClick = { this.tywin } */ type="submit" style={{ marginTop: '20px' }}>
                          Login using Github
                        </button>
                      </a>
                      {/* </Link> */}
                      <button type="submit" onClick={this.localdata.bind(this)}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }} />

          <Route exact path="/dashboard" render={ (props) => <Dashboard {...props} />} />
          <Route exact path="/redirect" render={ (props) => <Redirect {...props} />} />

        </Switch>
      </span>
    );
  }
}

export default App;


/* 
------------------LINKS------------------

http://jsbin.com/yoyadazoko/edit?html,js,console,output

*/