import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {makeStyles} from "@material-ui/styles";
import TestCard from "./TestCard";
import TestArea from "./TestArea";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {
    }
});

export default function Test() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
    });

    const handleChange = name => event => {
        setState({...state, [name]: event.target.checked});
    };

    return (
        <div className={classes.root}>
            <TestArea/>
        </div>
    );
}