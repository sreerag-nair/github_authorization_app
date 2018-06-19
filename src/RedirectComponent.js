import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { clearInterval } from 'timers';

const axios = require('axios');

var dotGenerator;
var counter = 0;

class RedirectComponent extends Component {

    state = {
        code : '',
        dots : '',
        message : 'Redirecting to dashboard'
    }

    componentWillMount() {
        const code =
            window.location.href.match(/\?code=(.*)/) &&
            window.location.href.match(/\?code=(.*)/)[1]
        this.setState({ code : code })

    }


    componentDidMount() {

        dotGenerator = setInterval(() =>{

            if(!(counter % 3 ))
            this.setState({
                message : "Redirecting to dashboard"
            })
            
            var update = this.state.message + '.'

            ++counter;
            this.setState({
                message : update
            })

        },1000)
        
        axios.get('http://localhost:8005/authenticate?code=' + this.state.code)
        .then((response) =>{
            console.log("RESPONSE IN REDIRECT: ", response)
            this.props.history.push('/dashboard')
        })
        .catch(() =>{
            this.props.history.push('/')
        })
    }

    componentWillUnmount(){
        clearInterval(dotGenerator)
    }


    render() {
        return (
            <h1>{ this.state.message }</h1>
        )
    }
}


export default RedirectComponent;