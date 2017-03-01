var IO=require('socket.io');
// var SocketIOController=require('../controller/SocketIOController');

// var socketioC=new SocketIOController();
//Me esta faltando manejo de las sesiones y 
var SocketIO=function (config) { 
	config=config||{};
	var io=IO.listen(config.server);
	var usersOnline={};

	io.sockets.on('connection',function(socket){

		socket.on('user_connect',function(user,callback){	//Escucha todo las  conecciones a la app		
			var socketID={socketID:socket.id};
			callback(socketID);	
		});

		socket.on('register_user',function(user){ //registra a los que iniciaron sesion
			if (user.id && user.socketID){
				usersOnline[user.socketID]={user:user.id};
				
				var userTmp={};
				userTmp._id=user.id;
				userTmp.state=true;
				// socketioC.changeStateSession(userTmp);
			}
		});

		socket.on('create_message',function(lobby){		//crea una sala de chat privada	
			if (lobby.message.user._id!=lobby.userReceiver) {
				// socketioC.createMessage(lobby,io,socket);
			}else{
				console.log("Se quiere hablar el mismo :D")
			}
		});

		socket.on('joinLobby', function(lobbyID){
			socket.join(lobbyID);
		});

		socket.on('new_message',function(lobby){ // envio de mensajes			
			// socketioC.addMessage(lobby,io);
		});

		socket.on('new_notification', function(notification){ //envio de  notificaciones
			var lstSocketsOn=[];
			for (item in usersOnline) {
				if (usersOnline[item].user==notification.usuarioReceive) {
					lstSocketsOn.push(item);
				}
			}

			if (notification) {
				// socketioC.createNotification(notification,lstSocketsOn,io);
			}
		});

		socket.on('writing', function(data){
			var lstSocketsOn=[];
			for (item in usersOnline) {
				if (usersOnline[item].user==data.usuarioReceive) {
					lstSocketsOn.push(item);
				}
			}

			if (data){
				// socketioC.sendNotiWriting(data, lstSocketsOn, io);
			}
		});

		socket.on('end', function() {
			var user={};
			user._id=usersOnline[socket.id].user;
			if (user) {
				user.state=false;
				// socketioC.changeStateSession(user);
	        	socket.disconnect();	
			}
			
    	});

		socket.on('disconnect', function(){ // expulsa a usaurios que se desconectan
			console.log("Se desconecto...")
			console.log(usersOnline[socket.id]);
			delete usersOnline[socket.id];
		})
	})
}

module.exports=SocketIO;