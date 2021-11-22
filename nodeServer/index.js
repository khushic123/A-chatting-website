//NODE SERVER WHICH WILL HANDLE SCOKET.IO CONNECTIONS
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });
const users={};

//i am running a socket.io server which will basically listen to events

io.on(`connection`,socket=>{      //whenever any connection comes in socket we go inside this arrow func
    //first even - a user has joined chat
      socket.on(`new-user-joined`,name=>{  //works on particular sockets connections
        console.log("HEY",name);
          users[socket.id]=name; 
          socket.broadcast.emit(`user-joined`,name);
      });
      
      //second event-if a user sends message
      socket.on(`send-message`,message=>{
          socket.broadcast.emit(`received`, {message:message ,name: users[socket.id]})
      });

      //third event - a user has disconnected
      socket.on(`disconnect`,name=>{
          socket.broadcast.emit(`left`, users[socket.id])
          delete users[socket.id];

      });

});