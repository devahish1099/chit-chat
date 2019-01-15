const WebSocket = require('ws');

const wss = new WebSocket.Server({port:8080});

console.log('server is working');

var Connectedusers = 0;
var users = [];



wss.on('connection',function connection(ws){
		Connectedusers++;
		console.log(Connectedusers);
		wss.clients.forEach(function each(client) {
				if (client !== ws && client.readyState === WebSocket.OPEN) {
					var userList={type:"arr",data:""}
					userList.data = users;
					userList = JSON.stringify(userList);
					client.send(userList);
					}
				});

		ws.on('message', function incoming(message){
				message = JSON.parse(message);
				console.log(message.type);
	  		//console.log('received message:' + message);
				switch (message.type) {
					case "id":
							users.push(message.userId);
					break;
					case "msg":
							// Broadcast to everyone else.
		 					wss.clients.forEach(function each(client) {
			 						if (client !== ws && client.readyState === WebSocket.OPEN) {
										message = JSON.stringify(message);
										client.send(message);
										}
									});

					break;
					default:

		}

	})

	//ws.send('you are connected');

})
