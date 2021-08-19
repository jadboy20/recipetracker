import './App.css';
import { Header, Button } from 'semantic-ui-react'
import { render } from 'react-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("App mounted...");
    }

    componentWillUnmount() {
        console.log("App unmounted...");
    }
    render() {
        return (
            <div>
                <Header>Main page</Header>

                <Link to="/main">Main Page</Link>
            </div>
        );
    }
}

export default App;
