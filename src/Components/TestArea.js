import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite"
import {observable} from "mobx"
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {testService, testResult} from "../services/testService";
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Checkbox from "@material-ui/core/Checkbox";
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: '#dedede',
    },
    img: {
        height: 400,
        maxWidth: 400,
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },
    root1: {
        backgroundColor: '#fff',
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
}));

export const TestArea = observer(() => {
        const classes = useStyles();
        const theme = useTheme();
        let history = useHistory();
        const testData = testService();
        const [activeStep, setActiveStep] = useState(0);
        const maxSteps = testData.testObj.questions.length;
        const [checkedItems, setCheckedItems] = useState(() => observable([]));
        const [isChecked, setIsChecked] = useState(() => observable(new Map()));
        const [selectedValue, setSelectedValue] = useState(null);
        const [equalObjects, setEqualObjects] = useState(() => observable([]));
        let [rightCount, setRightCount] = useState(0);
        const [isDone, setIsDone] = useState(false);

        let findElem = {};
        let checkElem = {
            value: '',
            status: false
        };
        let currentQuestion = testData.testObj.questions.find(elem => elem.id === activeStep);

        useEffect(() => {
            if (isDone) {
                testResult(rightCount, maxSteps);
                history.push("/result");
            } else {
                console.log('use effect')
            }
        });
        const handleChange = event => {
            findElem = checkedItems.find(elem => elem.value === event.target.value);
            const item = event.target.value;
            const checked = event.target.checked;
            setIsChecked(prevState => prevState.set(item, checked));
            if (!findElem) {
                checkElem = {
                    value: event.target.value,
                    status: true,
                };
                checkedItems.push(checkElem);
            } else {
                let removeIndex = checkedItems.findIndex(elem => elem.value === event.target.value);
                checkedItems.splice(removeIndex, 1);
                isChecked.delete(item);
                setIsChecked(isChecked);
            }
        };

        const handleChangeRadio = event => {
            let radioValue = event.target.value;
            let checked = event.target.checked;
            setSelectedValue(radioValue);
            findElem = checkedItems.find(elem => elem.value === event.target.value);
            if (!findElem) {
                checkElem = {
                    value: event.target.value,
                    status: true
                };
                checkedItems.push(checkElem);
                console.log(checkedItems.value);
            } else {
                console.log('ya tyt');
            }
        }

        function checkRightAnswers() {
            let i = checkedItems.map(elem => elem.value);
            console.log('checkedItems' + i);
            i.forEach(e1 => {
                currentQuestion.answer.forEach(e2 => {
                    if (JSON.stringify(e1) === JSON.stringify(e2)) {
                        equalObjects.push(e1);
                        console.log(equalObjects)
                    }
                });
            });
            if (equalObjects.length === currentQuestion.answer.length && i.length === currentQuestion.answer.length) {
                console.log('все верно');
                setRightCount(prevState => prevState + 1);
                testResult();
            } else {
                console.log('вопрос не зачтен');
            }
        }

        const handleNext = () => {
            checkRightAnswers();
            setCheckedItems([]);
            setEqualObjects([]);
            if (activeStep < maxSteps - 1) {
                setActiveStep(prevActiveStep => prevActiveStep + 1);
            } else {
                setIsDone(true);
            }
        };

        const handleFinishTest = () => {
            checkRightAnswers();
            testResult(rightCount, maxSteps);
            history.push("/result");
        };

        const questionsView = () => {
            if (currentQuestion) {
                return (
                    <div key={currentQuestion.id} className={classes.root1}>
                        <div className={classes.answersBlock}>

                            {
                                currentQuestion.options.map(option => {
                                    return (
                                        <div key={option} className={classes.question}>
                                            {
                                                currentQuestion.type === 'radio' ? (
                                                    <>
                                                        <Radio
                                                            checked={selectedValue === option}
                                                            onChange={handleChangeRadio}
                                                            value={option}
                                                        />
                                                        <Typography variant="h6">{option}</Typography>
                                                    </>) : (
                                                    <>
                                                        <Checkbox
                                                            checked={isChecked.get(option)}
                                                            onChange={handleChange}
                                                            value={option}
                                                            inputProps={{
                                                                'aria-label': 'primary checkbox',
                                                            }}
                                                        />
                                                        <Typography variant="h6">{option}</Typography>
                                                    </>)
                                            }
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                )
            }
        };

        return (
            <div className={classes.root}>
                <Paper square elevation={0} className={classes.header}>
                    <Typography variant="h5">{currentQuestion.question.toString()}</Typography>
                </Paper>
                {questionsView()}
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    variant="text"
                    activeStep={activeStep}
                    nextButton={
                        activeStep === maxSteps - 1 ? (
                            <Button size="small" color="secondary" onClick={handleNext}
                                    disabled={checkedItems.length === 0}>
                                Закончить
                            </Button>
                        ) : (
                            <Button size="small" onClick={handleNext}
                                    disabled={checkedItems.length === 0}>
                                Ответить
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                            </Button>
                        )
                    }
                />
            </div>
        );
    }
);

export default TestArea