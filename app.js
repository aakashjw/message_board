var redis = require('redis');
var client,multi;


exports.storeMessage = function(message,callback){
			var messages=[];
			var done = 0;

			client = redis.createClient(); 
			client.on('connect', function() {
			    console.log('connected');
			    client.incr('messageCount', function(err, id) {
						client.hmset('message_'+id, {
				   		 'id': id,
				    	 'messageText': message,
				    	 'TimeStamp': new Date()
						},function(err){

							client.keys('message_*', function(err, keys) {
			    	
			    	keys.forEach(function(key, index){
			    		
	        			client.hgetall(key, function(err,k){
	        				done++;
	        				messages.push(k)
	        				if(done == keys.length){
	        					callback(messages)
	        				}	
	        			})
	        			
	        		});
	        		
						
						
				});


						});	
				});

			

			});
		
		

}

exports.getAllMessages = function(callback){
			var messages=[];
			client = redis.createClient(); 
			var done = 0;
			client.on('connect', function() {
			    console.log('connected');
			    client.keys('message_*', function(err, keys) {
			    	
			    	keys.forEach(function(key, index){
			    		
	        			client.hgetall(key, function(err,k){
	        				done++;
	        				messages.push(k)
	        				if(done == keys.length){
	        					callback(messages)
	        				}	
	        			})
	        			
	        		});
	        		
						
						
				});
				
				
			});
		// start a separate multi command queue
		

}
exports.deleteMessage = function(message_id,callback){
			var messages=[];
			var done = 0;

			client = redis.createClient(); 
			client.on('connect', function() {
			    console.log('connected');
			    client.del(message_id, function(err){
			    	console.log("deleted",message_id);
			    	client.keys('message_*', function(err, keys) {
			    	if(keys.length <= 0)
			    	{
			    		callback({messages:false})
			    		return;
			    	}
			    	keys.forEach(function(key, index){
			    		
	        			client.hgetall(key, function(err,k){
	        				done++;
	        				messages.push(k)
	        				if(done == keys.length){
	        					callback(messages)
	        				}	
	        			})
	        			
	        		});
	        		
						
						
				});
			   })
			      
				
			});
		
		

}

exports.deleteAll = function(callback){
			
			var done = 0;

			client = redis.createClient(); 
			client.on('connect', function() {
			    client.keys('message_*', function(err, keys) {
			    	if(keys.length <= 0)
			    	{
			    		callback({messages:false})
			    		return;
			    	}
			    	keys.forEach(function(key, index){
			    		
	        			client.del(key, function(err,k){
	        				done++;
	        				if(done == keys.length){
	        					callback({messages:false})
	        				}	
	        			})
	        			
	        		});
	        		
						
						
				});
			  
			      
				
			});
		
		

}
