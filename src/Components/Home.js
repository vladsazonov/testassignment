import React  from "react";
import {makeStyles} from "@material-ui/styles";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {testService} from "../services/testService";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
    },
    startButton: {
        marginTop: 50,
    }
});

export default function Home() {
    const classes = useStyles();
    const testData = testService();

    return (
        <div className={classes.root}>
            <Typography variant="h2" style={{color: 'white'}}>{testData.testObj.topic}</Typography>
            <Link to="/test" style={{textDecoration: 'none'}}>
                <Button className={classes.startButton} variant="contained" color="primary">
                    Начать
                </Button>
            </Link>
        </div>
    )
}
