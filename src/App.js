import React, { Component } from 'react';
import { Route, NavLink, BrowserRouter as Router } from 'react-router-dom';
import MainApp from './MainApp';
import Admin from './Admin';
import './App.css';

class App extends Component {
    state = {
        data: {},
        loaded: false
    }
    
    componentDidMount() {
        fetch("http://localhost:9000/priceList")
            .then(res => res.json())
            .then(data => {
                this.setState({
                data: data,
                loaded: true
            });
        });
    }

    render() {
        
        if (this.state.loaded) {
            return(
                <Router>
                    <div>
                        <div className="nav" >
                            <NavLink exact activeClassName="active" className="link" to="/">Price Generator</NavLink>
                            <NavLink activeClassName="active" className="link" to="/admin">Admin Page</NavLink>
                        </div>
                        <Route exact path="/" render={(props) =>  <MainApp
                                                                    match={props.match}
                                                                    data={this.state.data}             
                                                                />} />
                        <Route path="/admin" render={(props) => <Admin
                                                                    match={props.match}
                                                                    data={this.state.data}             
                                                                />} />
                    </div>
                </Router>
            );
        } else {
            return "Wait...";
        }   
        
    }
}

export default App;