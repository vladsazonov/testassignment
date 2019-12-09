import React from 'react';
import testData from '../test';

let testObj = {
   testTitle: '',
   topic: '',
   questions: [],
};
let finishCount;
let questionsCount;

export function testService () {
    testObj = {
        testTitle: testData.Test.Name,
        topic: testData.Test.Topic,
        questions: testData.Test.questions,
    };

   return {
       testObj,
       finishCount,
       questionsCount
   };
};

export const testResult = (rightCount, maxSteps) => {
    finishCount = rightCount;
    questionsCount = maxSteps;
};