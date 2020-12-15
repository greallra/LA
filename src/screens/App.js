import React, { useState, useEffect } from 'react';
import MainRouter from '../router/MainRouter';
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import Pusher from 'pusher-js'
import axios from '../axios' //importing our custom axios
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getUser, addMessage, setEditedMessage } from '../redux/actions'

//i can try firebase too!!

function App() {
  const { username } = useParams()
  const mainReducer = useSelector(store => store.mainReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    
    if(username) {
      //get user
      dispatch(getUser(username))
    }

  }, [])

  useEffect(() => {
      console.log("mainReducer", mainReducer);
  }, [mainReducer])

  useEffect(() => {
    // Enable pusher logging - don't include this in production
    //Pusher.logToConsole = true;

    const pusher = new Pusher('34c007a187923b1d51f5', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('my-channel');

    channel.bind('new-message', function(data) {

      //console.log(data);
      dispatch(addMessage(data))
        //could refrefesh all messages or refetch all messages
      // setMessages([...messages, data])
    });
    
    channel.bind('updated-message', function(data) {
      //console.log("updated-message", data);
      dispatch(setEditedMessage(data))
        //could refrefesh all messages or refetch all messages
        
    });
    
    pusher.connection.bind('connected', function() {
      console.log('Realtime is go!');
    });
    // var callback = function(eventName, data) {
    //   console.log(`bind global: The event ${eventName} was triggered with data ${JSON.stringify(data)}`);
    // };
    // //bind to all events on the connection
    // pusher.bind_global(callback);

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [])

  return (
    <div className="app">
        <div className="app__body">
          <Sidebar />
          <Chat />
        </div>
    </div>
  );
}

export default App;

