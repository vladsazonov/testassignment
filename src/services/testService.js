import React from 'react';
import testData from '../example_2';

let testObj = {
   testTitle: '',
   topic: '',
   questions: [],
};

export default function testService () {

   return (
       testObj = {
          testTitle: testData.Test.Name,
          topic: testData.Test.Topic,
          questions: testData.Test.questions,
       }
   );
};

export const test = () => {
    alert('hyi')
};