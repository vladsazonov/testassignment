import React from 'react';
import './App.css';
import Home from "./Components/Home";
import Test from "./Components/Test"
import ResultPage from "./Components/ResultPage";
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";

export default function App() {
    return (
        <Router>
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
                <Route path="/test">
                    <Test/>
                </Route>
                <Route exact path="/result">
                    <ResultPage/>
                </Route>
            </Switch>
        </div>
    )
}
