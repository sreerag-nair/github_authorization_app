import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    emailId : '',
    password : ''
  }

  updateEmail(event){
    console.log(" email value : ", event.target.value)
    this.setState({ emailId : event.target.value })

  }

  updatePassword(event){
    console.log(" pwd value : ", event.target.value)
    this.setState({ password : event.target.value })
  }

  contactGithub(){
    axios.get('https://github.com/login/oauth/authorize',{})
    .then((response) =>{
      console.log("response : ", response)
    })
  }

  render() {
    return (
      <div className="App">
        <div id="loginBox">
          <div style={{ paddingTop: '100px' }}>
            <div>
              <div>email-id</div>
              <input type="email" value = { this.state.emailId } onChange = { this.updateEmail.bind(this) }/>
            </div>
            <div>
              <div>password</div>
              <input type="text" value = { this.state.password } onChange = { this.updatePassword.bind(this) }/>
            </div>
            <div>
              <button type = "submit" onClick = { this.contactGithub } style = {{ marginTop : '20px' }}>
                Login using Github
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
