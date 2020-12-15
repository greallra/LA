import React, {useEffect} from 'react'
import "./sidebar.css";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import {IconButton, Avatar} from '@material-ui/core';

import { useSelector } from 'react-redux'

import SidebarChat from './SidebarChat'

function SideBar({ getConversation}) {
    const me = useSelector(store => store.mainReducer.user)
    const conversations = useSelector(store => store.mainReducer.conversations)
    const api_url = useSelector( store => store.mainReducer.api_url)

    useEffect(() => {
        
       //console.log("me",me);
    }, [me])
    useEffect(() => {
        
       //console.log("conversations",conversations);
    }, [conversations])


    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div>
                    <Avatar src={`${api_url}/api/v1/users/${me._id}/avatar`}/>
                    {me && <div>{me.username}</div>}
                </div>
                
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>      
            </div>
            <div className="sidebar__search">
                    <div className="sidebar__searchContainer">
                        <SearchOutlined />
                        <input type="text" placeholder="start new chat"/>
                    </div>
            </div>
            <div className="sidebar__chats">
                {conversations && conversations.length > 0 && conversations.map( ({users, _id}) => {
                    return <SidebarChat conversation_id={_id} users={users} />
                } )}
              
            
            </div>
        </div>
    )
}

export default SideBar
