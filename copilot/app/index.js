var aws = require('aws-sdk');
const express = require('express');
const app = express();
const table = process.env.HITS_NAME;
const PORT = 80; // The port to listen on

const dynamodb = new aws.DynamoDB.DocumentClient();

if (!table) {
  console.error('Warning: The HITS_NAME environment variable needs to be set with the name of a DynamoDB table');
}

const os = require('os');
const hostname = os.hostname();

app.get('*', function (req, res) {
  if (!table) {
    console.error('Error: The HITS_NAME environment variable needs to be set with the name of a DynamoDB table');
    return res.send('Error: The HITS_NAME environment variable needs to be set with the name of a DynamoDB table');
  }

  dynamodb.update({
    TableName: table,
    Key: {
      counter: 'global',
    },
    UpdateExpression: 'SET hitCount = if_not_exists(hitCount, :zero) + :value',
    ExpressionAttributeValues: {
      ':zero': 0,
      ':value': 1,
    },
    ReturnValues: 'ALL_NEW'
  }, function (err, results) {
    if (err) {
      return res.send(err);
    } else {
      var hitCount = results.Attributes.hitCount;
      res.send(`There have been ${hitCount} hits. (${hostname})`);
    }
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

// This causes the process to respond to "docker stop" faster
process.on('SIGTERM', function () {
  console.log('Received SIGTERM, shutting down');
  app.close();
});