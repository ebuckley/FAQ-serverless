'use strict';
const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid')

async function getQuestion(id) {
  const params = {
    TableName: process.env.dynamodb,
    Key: {
      id: id
    }
  };
  console.log('getting question:', params)
  return dynamoDb.get(params).promise()
    .then(res => res.Item);
}
async function getAllQuestions() {
  const params = {
    TableName: process.env.dynamodb
  };
  return dynamoDb.scan(params).promise();
}

module.exports.askQuestion = async ({ question, asker }) => {
  const timestamp = new Date().getTime();
  const params = {
    TableName: process.env.dynamodb,
    Item: {
      createdAt: timestamp,
      updatedAt: timestamp,
      id: uuid.v4(),
      question,
      asker,
      answers: []
    }
  };
  return dynamoDb.put(params).promise();
}

module.exports.getAllQuestions = getAllQuestions;

module.exports.getQuestion = getQuestion;

module.exports.answerQuestion = async ({ id, answer, person }) => {
  const question = await getQuestion(id);
  console.log('fetched question:', question)
  const timestamp = new Date().getTime();
  const newAnswer = { id: uuid.v1(), answer, person, createdAt: timestamp, reactions: [] };
  console.log('created new answer:', newAnswer)
  const answers = question.answers.concat(newAnswer);
  console.log('saving ', answers.length, ' new answers ')
  const Item = Object.assign(question, {
    updatedAt: timestamp,
    answers
  })

  const params = {
    TableName: process.env.dynamodb,
    Item
  };
  console.log('persisting to dynamo', params)
  return dynamoDb.put(params).promise();
}

module.exports.react = async ({ questionid, answerid, person, reaction }) => {
  const timestamp = new Date().getTime();
  const question = await getQuestion(questionid);
  const comment = question.answers.find(answer => answer.id == answerid);
  if (!comment) {
    return Promise.reject(Error({ message: "Could not find a valid comment for id " + answerid }))
  }
  if (!comment.reactions) {
    comment.reactions = []
  }

  comment.reactions.push({ person, reaction, id: uuid.v4() })
  question.updatedAt = timestamp;
  const params = {
    TableName: process.env.dynamodb,
    Item: question
  }
  console.log('saving', JSON.stringify(params, null, '  '))
  const reactionResult = await dynamoDb.put(params).promise();

  console.log('saved reaction')
  return reactionResult;
}