'use strict';

class OSCRunner {
	run(){
		var socket = io.connect('http://127.0.0.1', { port: 8081, rememberTransport: true});
		  console.log('oi');
		  socket.on('connect', function() {
		// sends to socket.io server the host/port of oscServer
		// and oscClient
		socket.emit('config',
		    {
		        server: {
		            port: 3333,
		            host: '127.0.0.1'
		        },
		        client: {
		            port: 3334,
		            host: '127.0.0.1'
		        }
		    }
		);
		});

		window.echoingEgo.data = {}; 
		var isOnce = true;
		socket.on('message', function(obj) {
		var parser = new OSCMessageParser()
		parser.parse(obj)
		if(isOnce){
			window.echoingEgo.initializeOnFrame();	
			isOnce = false;
		}
		});
    }
}