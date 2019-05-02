'use strict';
const { askQuestion, getAllQuestions, getQuestion, answerQuestion, react } = require('./lib/domain');
const { handleError, headers } = require('./lib/util');

module.exports.askQuestion = async (event) => {
  console.log("Ask a new question", event)
  let data = {
    hotlist: []
  };
  try {
    data = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 401,
      message: `bad request expected JSON: ${e}`
    };
  }
  return askQuestion(data)
    .then(result => {
      return {
        statusCode: 201,
        headers: headers(),
        body: JSON.stringify({
          message: 'Created a question',
          result: result,
        }),
      };
    })
    .catch(handleError);
};

module.exports.viewQuestion = async (event) => {
  const questionId = event.pathParameters.id;
  console.log('getting question', questionId)
  return getQuestion(questionId)
    .then(result => ({
      statusCode: 200,
      body: JSON.stringify({
        message: "Found question " + questionId,
        result
      }),
      headers: headers()
    }))
    .catch(handleError);
};

module.exports.answerQuestion = async (event) => {
  const id = event.pathParameters.id;
  console.log("answer a question", id)
  let data = {};
  try {
    data = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 401,
      headers: headers(),
      message: `bad request expected JSON: ${e}`
    };
  }
  return answerQuestion({ id, answer: data.answer, person: data.person })
    .then(result => ({
      statusCode: 201,
      headers: headers(),
      body: JSON.stringify({
        message: 'Ask question: Your function executed successfully!',
        result,
      }),
    }))
    .catch(handleError);
};

module.exports.react = async (event) => {
  console.log("React to an answer", event.pathParameters)
  let data = {};
  try {
    data = JSON.parse(event.body);
  } catch (e) {
    console.error('could not parse body', e)
    return {
      statusCode: 500,
      headers: headers(),
      body: `bad request expected JSON: ${e}`
    };
  }
  if (!data) {
    return { statusCode: 400, headers: headers(), body: 'expected response body with reaction and person' }
  }

  return react({ questionid: event.pathParameters.questionid, answerid: event.pathParameters.answerid, reaction: data.reaction, person: data.person })
    .catch(handleError)
};

module.exports.hotList = async (event) => {
  return getAllQuestions()
    .then(result => ({
      statusCode: 200,
      headers: headers(),
      body: JSON.stringify({
        message: 'Fetched all questions',
        result: result,
      }),
    })).catch(handleError);
};