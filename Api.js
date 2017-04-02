var url = 'http://localhost:3000';


function postMessage(message,callback){
  fetch(url+'/post?message='+message, {protocol:'http:'})  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' +  
          response.status);  
        return;  
      }

      // Examine the text in the response  
      response.json().then(function(data) {  
        callback(data.messages) 
        return data;
      });  
    }  
  )  
  .catch(function(err) {  
    console.log('Fetch Error :-S', err);  
  });
}

function getAllPosts(callback){
  fetch(url+ '/getAllMessages', {protocol:'http:'})  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' +  
          response.status);  
        return;  
      }

      // Examine the text in the response  
      response.json().then(function(data) {  
        console.log(data);
        callback(data.messages)
      });  
    }  
  )  
  .catch(function(err) {  
    console.log('Fetch Error :-S', err);  
  });
}

function deleteMessage(message_id,callback,secret_token){
  fetch(url+ '/deleteMessage?message_id='+message_id+'&token='+secret_token , {protocol:'http:'})  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' +  
          response.status);  
        return;  
      }

      // Examine the text in the response  
      response.json().then(function(data) {  
        callback(data.messages)
        return data;
      });  
    }  
  )  
  .catch(function(err) {  
    console.log('Fetch Error :-S', err);  
  });
}

function deleteAll(callback,secret_token){
  fetch(url+ '/deleteAll?token='+secret_token , {protocol:'http:'})  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' +  
          response.status);  
        return;  
      }

      // Examine the text in the response  
      response.json().then(function(data) {  
        callback(data.messages)
        return data;
      });  
    }  
  )  
  .catch(function(err) {  
    console.log('Fetch Error :-S', err);  
  });
}


export {
  postMessage,
  deleteMessage,
  getAllPosts,
  deleteAll
}