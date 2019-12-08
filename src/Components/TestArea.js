import React from 'react';
import {observer} from "mobx-react-lite"
import {observable} from "mobx"
import {useState} from "react"
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {Divider} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import testService from "../services/testService";
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import {Link} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
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
        width: 400,
        height: 400,
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
        const testData = testService();
        const [activeStep, setActiveStep] = React.useState(0);
        const maxSteps = testData.questions.length;
        const [checkedItems, setCheckedItems] = useState(() => observable([]));
        const [isChecked, setIsChecked] = useState(() => observable(new Map()));
        /*const [isChecked, setIsChecked] = React.useState(new Map());*/
        const [questionName, setQuestionName] = React.useState('55');
        const [selectedValue, setSelectedValue] = React.useState(null);
        const [answers, setAnswer] = React.useState(null);
        const [equalObjects, setEqualObjects] = useState(() => observable([]));
        let [rightCount] = useState(() => observable.box(0));

        let findElem = {};
        let checkElem = {
            value: '',
            status: false
        };

        let cheki;
        let a = testData.questions.find(elem => elem.id === activeStep);
        const handleChangeRadio = event => {
            setSelectedValue(event.target.value)
        }

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
                let a = checkedItems.findIndex(elem => elem.value === event.target.value);
                checkedItems.splice(a, 1);
                isChecked.delete(item);
                setIsChecked(isChecked);
            }
        };

        function checkRightAnswers() {
            let i = checkedItems.map(elem => elem.value);

            i.forEach(function (elementOfSomeArray) {
                a.answer.forEach(function (elementOfOrherArray) {
                    if (JSON.stringify(elementOfSomeArray) === JSON.stringify(elementOfOrherArray)) {
                        equalObjects.push(elementOfOrherArray);
                    }
                });
            });

            console.log('equalObjects ' + equalObjects.length);
        }

        const handleNext = () => {
            checkRightAnswers();
            let sum = +rightCount + +equalObjects.length;
            console.log('sum' + sum);
            rightCount += sum
            console.log('rightCount' + rightCount);
            setCheckedItems([]);
            setActiveStep(prevActiveStep => prevActiveStep + 1);

        };

        const handleBack = () => {
            setActiveStep(prevActiveStep => prevActiveStep - 1);
            questionsView();
        };

        const questionsView = () => {
            console.log('checkedItems array ' + checkedItems.length);
            let currentQuestion = testData.questions.find(elem => elem.id === activeStep);
            if (currentQuestion) {
                cheki = currentQuestion.answer;
                return (
                    <div key={currentQuestion.id} className={classes.root1}>
                        <Typography variant="h4" className={classes.questionName}>{a.question}</Typography>
                        <Divider/>
                        <div className={classes.answersBlock}>
                            {
                                currentQuestion.options.map(option => {
                                    cheki = isChecked.get(option);
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
                                                        <Typography>{option}</Typography>
                                                    </>) : (
                                                    <>
                                                        <Typography>{cheki ? cheki.toString() : 'undef'}</Typography>
                                                        <Checkbox
                                                            checked={isChecked.get(option)}
                                                            onChange={handleChange}
                                                            value={option}
                                                            inputProps={{
                                                                'aria-label': 'primary checkbox',
                                                            }}
                                                        />
                                                        <Typography>{option}</Typography>
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
                    <Typography>{questionName}</Typography>
                </Paper>
                <Button onClick={testService.test} variant="contained">Check</Button>
                {questionsView()}
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    variant="text"
                    activeStep={activeStep}
                    nextButton={
                        checkedItems.length > 0 && activeStep === maxSteps - 1 ? (
                            <Link to="/result">
                                <Button size="small" color="secondary" onClick={handleNext}
                                        disabled={checkedItems.length === 0}>
                                    Завершить
                                </Button>
                            </Link>) : (
                            <Button size="small" onClick={handleNext}
                                    disabled={checkedItems.length === 0 || activeStep === maxSteps - 1}>
                                Ответить
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                            </Button>
                        )
                    }
                    /*backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                            Назад
                        </Button>
                    }*/
                />
            </div>
        );
    }
);

export default TestArea