import React from 'react';
import './App.css';
import Home from "./Components/Home";
import TestCard from "./Components/TestCard";
import Drawers from "./Components/Drawers";
import Test from "./Components/Test"
import ResultPage from "./Components/ResultPage";
import History from './Components/History';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
    return (
                <Router History={History}>
                   <ScreenSwitcher/>
                </Router>
    );
}

function ScreenSwitcher() {
    return (
            <div className="App">
                <Switch>
                    <Route exact path="/">
                       <Home/>
                    </Route>
                    <Route path="/test"
                    render={props => <Test {...props}/>}/>
                    <Route exact path="/result">
                        <ResultPage/>
                    </Route>
                </Switch>
            </div>
        )
}

export default App;
