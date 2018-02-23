'use strict';

/* eslint-disable no-param-reassign */

module.exports.publish = function (context) {
  context.log('Publishing new messages...');

  // var connStr = process.argv[2] || process.env.CONNECTION_STRING;
  var connStr = "Endpoint=sb://terraform-workshop.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=cR+D/xI0BgyNpFmn+lbNsgHrXEzZJJWhvrruONLnljE=";
  if (!connStr) throw new Error('Must provide connection string');
  var topicName = 'workshop';

  var azure = require('azure-sb');
  var sbService = azure.createServiceBusService(connStr);
  sendMessages(sbService, topicName);  
  
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: 'Message sent!',
  };

  context.done();
  
  var idx = 0;
  function sendMessages(sbService, topicName) {
    var msg = 'Message # ' + (++idx);
    sbService.sendQueueMessage(topicName, msg, function (err) {
     if (err) {
       console.log('Failed Tx: ', err);
     } else {
       console.log('Sent ' + msg);
     }
    });
  }
};