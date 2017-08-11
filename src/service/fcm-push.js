var FCM = require('fcm-node');
var serverKey = 'AAAAMYHtcMI:APA91bHVIzrHu1BUHvGfYKIDhykS2ZGoERZn9IezcG_7sO7Q0T8DujoD5i7Df6nmqbl8TmK3Jv2A-szbWxeVhXKrMZ790bfcxPg6oSkKd56m9R0DOTyC7iCF3OkyUO329O3VrIf4BfwT'; //put your server key here 
var fcm = new FCM(serverKey);

const sendPush = (recipient, message, options) => {
  const message = { 
    to: recipient,
    
    notification: {
        title: 'Jeni is here', 
        body: 'Body of your push notification' 
    }
  };

  return new Promise((resolve, reject) => {
    fcm.send(message, (err, response) => {
      if (err) { 
        reject('Something has gone wrong!');
        return;
      }

      resolve(`Successfully sent with response: ${response}`);
    });
  });
}