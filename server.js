var express = require('express')
var app = express()
var redis = require('./app.js');

var cors = require('cors')

app.use(cors())

app.get('/post', function (req, res) {
	redis.storeMessage(req.query.message,getMessages);

	  	function getMessages(messages_received){
				var messageList = {messages: messages_received}
				console.log("messageList",messageList);
				res.send(messageList).end();

		}
})

app.get('/getAllMessages', function (req, res) {
	console.log("getAllMessages");
  	redis.getAllMessages(getMessages);


  	function getMessages(messages_received){

	var messageList = {messages: messages_received}
	console.log("messageList",messageList);
	res.send(messageList).end();

}
})



app.get('/deleteMessage', function (req, res) {
  	if(req.query.token && req.query.token == 'aakash'){
				redis.deleteMessage(req.query.message_id,getMessages)
			  	
			  	function getMessages(messages_received){

				var messageList = {messages: messages_received}
				console.log("messageList",messageList);
				res.send(messageList).end();

			}
	}else{
			redis.getAllMessages(getMessages);
			function getMessages(messages_received){

				var messageList = {messages: messages_received}
				console.log("messageList",messageList);
				res.send(messageList).end();

			}
  		}

  	
})

app.get('/deleteAll', function (req, res) {
  	if(req.query.token && req.query.token == 'aakash'){
				redis.deleteAll(getMessages)
			  	
			  	function getMessages(messages_received){

				var messageList = {messages: messages_received}
				console.log("messageList",messageList);
				res.send(messageList).end();

			}
	}else{
			redis.getAllMessages(getMessages);
			function getMessages(messages_received){

				var messageList = {messages: messages_received}
				console.log("messageList",messageList);
				res.send(messageList).end();

			}
  		}

  	
})


app.listen(3000, function () {
  console.log('Listening on port 3000!')
})



/*var redis = require('./app.js');
redis.storeMessage("test message");
redis.getAllMessages(getMessages);

function getMessages(messages_received){
console.log("messages_received",messages_received);
}
redis.deleteMessage("message_1")
*/

