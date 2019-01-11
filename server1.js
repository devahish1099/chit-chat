const WebSocket = require('ws');

const wss = new WebSocket.Server({port:8080});

console.log('server is working');

var Connectedusers = 0;

wss.on('connection',function connection(ws){
	ws.on('message', function incoming(message){
	  console.log('received message:' + message);
	Connectedusers++;
	   // Broadcast to everyone else.
	wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
         }
       });
	})

	ws.send('you are connected');
	
})


