import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {makeStyles} from "@material-ui/styles";
import {Typography, Divider} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {testService} from '../services/testService'
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#fff',
        /* width: 300,
         height: 500,*/
        borderRadius: 20,
        padding: 20,
        textAlign: 'center',
    },
    question: {
        display: 'flex',
        alignItems: 'center',
    },
    answersBlock: {
        marginTop: 30,
        marginBottom: 30,
    },
    questionName: {
        marginBottom: 10,
    },
});

export default function TestCard() {
    const classes = useStyles();
    const testData = testService();
    const [checkedItems, setCheckedItems] = React.useState([]);
    let findElem = {};
    let checkElem = {
        value: '',
        status: false
    };

    const handleChange = event => {
        findElem = checkedItems.find(elem => elem.value === event.target.value);

        if (!findElem) {
            checkElem = {
                value: event.target.value,
                status: true,
            };
            checkedItems.push(checkElem);
            console.log(checkedItems)
        } else {
            let a = checkedItems.findIndex(elem => elem.value === event.target.value);
            checkedItems.splice(a, 1);
            console.log(checkedItems)
        }
    };

    const questionsView = () => {
        return (
            testData.questions.map(elem => {
                    return (
                        <div className={classes.root}>
                            <Typography>{elem.id}</Typography>
                            <Typography variant="h4" className={classes.questionName}>{elem.question}</Typography>
                            <Divider/>
                            <div className={classes.answersBlock}>
                                {
                                    elem.options.map(option => {
                                        return (
                                            <div className={classes.question}>
                                                <Checkbox
                                                    onChange={handleChange}
                                                    value={option}
                                                    inputProps={{
                                                        'aria-label': 'primary checkbox',
                                                    }}
                                                />
                                                <Typography>{option}</Typography>
                                            </div>
                                        )
                                    })
                                }
                                <Button variant="contained" color="primary">ответить</Button>
                            </div>
                        </div>
                    )
                }
            ))
    };

    return (
        <div>
            {questionsView()}
        </div>
    );
}