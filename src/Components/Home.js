import React from "react";
import {makeStyles} from "@material-ui/styles";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import testService1 from "../services/testService";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const useStyles = makeStyles({
    startButton: {
        marginTop: 50,
    }
});

export default function Home() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        testStarted: false,
    });
    const testData = testService1;

    const handleTestStarted = () => event => {
        console.log('first state value: ' + state.testStarted);
        setState({
            ...state,
            testStarted:  !state.testStarted,
        });
        console.log('state value: ' + state.testStarted);
    };


    return (
        <div style={{textAlign: 'center'}}>
            <Typography variant="h1" style={{color: 'white'}}>{testData.topic}</Typography>
            <Link to="/test" style={{textDecoration: 'none'}}> <Button style={state.testStarted ? {backgroundColor: '#dedede'} : {backgroundColor: 'red'}} onClick={handleTestStarted()} className={classes.startButton} variant="contained"
                    color="primary">Начать</Button></Link>
        </div>
    )
}
