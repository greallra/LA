import React, { useEffect, useState } from 'react'
import "./sidebarchat.css";
import {IconButton, Avatar} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { getActiveMessages, setInconversationWith } from '../redux/actions'

export default function SidebarChat({conversation_id, users}) {
    const dispatch = useDispatch()
    const activeMessages = useSelector( store => store.mainReducer.activeMessages )
    const me = useSelector( store => store.mainReducer.user)
    const api_url = useSelector( store => store.mainReducer.api_url)
    let id = conversation_id ? conversation_id : 'no id';

    //extract notMe
    let extractNotMe, isActive;
    if(users) {
        extractNotMe = users.find( user => user._id != me._id)
  
    }
    if(activeMessages.length > 0) {
        let x = activeMessages.find( obj => obj.sender != me.username)
        if(x) {
            isActive = extractNotMe.username === x.sender;
        } 
       
    }
   
    //set grey background: temp solution search message for username = notMe.user
    // useEffect(() => {
       

    // }, [activeMessages, extractNotMe])

   

  
    return (
        <div className={`sidebarChat ${isActive ? 'active' : ''}`} onClick={ () => dispatch(getActiveMessages(conversation_id))}>
            <Avatar src={`${api_url}/api/v1/users/${extractNotMe._id}/avatar`}/>
            <div className="sidebarChat__info">
                <h2>{extractNotMe && extractNotMe.username}</h2>
                <p>{extractNotMe && extractNotMe.status}</p> 
            </div> 
        </div>
    )
}
