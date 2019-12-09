import React from "react";
import {makeStyles} from "@material-ui/styles";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {testService} from "../services/testService";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    startButton: {
        marginTop: 50,
    },
    color: {
        color: "#fff"
    },
    resultText: {
        color: "#fff",
        marginTop: 20,
    }
});

export default function Home() {
    const classes = useStyles();
    const testData = testService();
    const finishCount = testData.finishCount;
    const questionsCount = testData.questionsCount;

    return (
        <div style={{textAlign: 'center'}}>
            <Typography className={classes.color} variant="h3">Тест завершен</Typography>
            <Typography className={classes.resultText} variant="h5">
                Вы правильно ответили на {finishCount ? finishCount : '0'} вопросов из {questionsCount ? questionsCount : '0'}
            </Typography>
            <Link to="/" style={{textDecoration: 'none'}}>
                <Button style={{marginTop: 80}} variant="contained" color="primary">Пройти заново</Button>
            </Link>
        </div>
    )
}
