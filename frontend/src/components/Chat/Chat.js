import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";


import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    console.log(name, room)

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });

    return () => {
        socket.emit('disconnect');
        socket.off();
    }
  }, [ENDPOINT, location.search]);



  return (
    <h1>Chat</h1>
  );
}

export default Chat;
