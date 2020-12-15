import React, {useState, useEffect, useRef} from 'react'
import "./chat.css"
import { IconButton, Avatar } from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import CloseIcon from '@material-ui/icons/Close';
import AttachmentMessage from './AttachmentMessage'

import Message from './Message';

import { useSelector, useDispatch } from 'react-redux'
import { toggleEditMessageConfirmed, resetEdit } from '../redux/actions'


import axios from '../axios'
import styled from 'styled-components';
let av1 = "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
let av2 = "https://i2.wp.com/commsverse.blog/wp-content/uploads/2017/07/ant-man-portrait-session-1806x1254.jpeg?fit=1806%2C1254&ssl=1"

function iconStyles() {
    return {
      successIcon: {
        color: 'green',
      },
      errorIcon: {
        color: 'red',
      },
    }
  }




export default function Chat() {
    const [input, setInput] = useState('')
    const [correctionInput, setCorrectionInput] = useState('')
    const inputRef = useRef()
    const chatBodyRef = useRef()
   
    const editMessage = useSelector( store => store.mainReducer.editMessage )
    const messages = useSelector( store => store.mainReducer.activeMessages)
    const me = useSelector( store => store.mainReducer.user)
    const inConversationWith = useSelector( store => store.mainReducer.inConversationWith)
    const activeMessagesId = useSelector( store => store.mainReducer.activeMessagesId )
    const conversations = useSelector(store => store.mainReducer.conversations)

    const dispatch = useDispatch()

    //set the other person in the chat header
   

    function sendMessage(e){
        e.preventDefault();
        //normal message
        if(!editMessage) {
            axios.post('/api/v1/messages/new', {
                conversation_id: activeMessagesId,    
                sender: me.username,
                sender_id: me._id,
                original_message: input,
                correction_message: ''
            })
           
        }
        //edit and new message
        if(editMessage && input) {
            axios.post('/api/v1/messages/edit-send', {
                message_id: editMessage._id,    
                correction_message: correctionInput,
                conversation_id: editMessage.conversation_id,
                sender: me.username,
                sender_id: me._id,
                original_message: input
            })         
        }
        setInput('');
        dispatch(resetEdit())
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollTop + 40;
    }
    function handleFocus() {
        if(editMessage) {
            dispatch(toggleEditMessageConfirmed(true))
        }
    }

    return (
        <div className="chat">
            <div className="chat__header">
               
                <div className="chat__headerInfo">
                    <h3>{inConversationWith}</h3>
                    {/* <p>Last seen at...</p> */}
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body" ref={chatBodyRef}>
                {!messages && <h2>Choose a conversation</h2>}
                {messages.map( message =>  <Message message={message}/> )}
            </div>

            <div style={{ padding: 13}}>
            <AttachmentMessage correctionInput={correctionInput} setCorrectionInput={setCorrectionInput}/>
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input type="text" placeholder="type a message" value={input} onChange={ (e) => setInput(e.target.value)} ref={inputRef} onFocus={handleFocus}/>
                    <button type="submit" onClick={sendMessage} >Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}
