import React, { Component } from 'react';
const axios = require('axios');


class OpenInSamePage extends Component {

    state = {
        emailId: '',
        password: '',
        response: ''
    }

    updateEmail(event) {
        console.log(" email value : ", event.target.value)
        this.setState({ emailId: event.target.value })

    }

    updatePassword(event) {
        console.log(" pwd value : ", event.target.value)
        this.setState({ password: event.target.value })
    }

    contactGithub() {
        axios.get('https://www.github.com/login/oauth/authorize/?client_id=3fb8c782622ac4a1d0a6', {},
        )
            .then(function (response) {
                console.log('rs : ', response)
                // this.setState({ response : response })
                // return response.text();
            })
            .catch(function (err) {
                console.log('err : ', err)
            })

    }

    render() {
        return (
            // <h1>OpenInSamePage</h1>

            <div className="App">
                <div id="loginBox">
                    <div style={{ paddingTop: '100px' }}>
                        <div>
                            <div>email-id</div>
                            <input type="email" value={this.state.emailId} onChange={this.updateEmail.bind(this)} />
                        </div>
                        <div>
                            <div>password</div>
                            <input type="text" value={this.state.password} onChange={this.updatePassword.bind(this)} />
                        </div>
                        <div>
                            {/* <a href = "">Link</a> */}
                            <button type="submit" style={{ marginTop: '20px' }}>
                                <a href="https://www.github.com/login/oauth/authorize/?client_id=3fb8c782622ac4a1d0a6&redirect_uri=http://localhost:3000/&allow_signup=false">
                                    Login using Github
                                </a>
                            </button>
                            <button onClick={this.check}>
                                Check!
                            </button>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default OpenInSamePage;