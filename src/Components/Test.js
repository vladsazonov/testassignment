import React from 'react';
import {makeStyles} from "@material-ui/styles";
import TestArea from "./TestArea";

const useStyles = makeStyles({
    root: {
    }
});

export default function Test() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TestArea/>
        </div>
    );
}