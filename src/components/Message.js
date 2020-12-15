import React, { useState } from 'react'
import styled from 'styled-components';
import { IconButton, Avatar } from '@material-ui/core';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'

import { edit } from '../redux/actions'
import axios from '../axios'

const ChatMessageRow = styled.div`
    display: flex;
    align-items: center; 
    margin-top: 30px;
    position: relative;
    ${props => props.isMe && 
        `
        flex-direction: row-reverse;
        `}
`
const ChatMessage = styled.div`
    // min-width 100px;
    position: relative;
    font-size: 16px;
    padding: 10px;
    width: fit-content;
    border-radius: 10px;
    background: #ffffff;

    ${props => props.isMe && 
    `//background: #ffffed;
    //  margin-left: auto;
    `}
    ${props => props.perfect && 
    `background: var(--light-green);
    color: var(--green);
    `}
    ${props => props.isCorrection && 
    `background: var(--light-yellow);
     color: var(--yellow);
    `}
   
}
`
const UserTime = styled.div`
  position: absolute;
  top: -23px;
  font-size: 13px;
  ${props => props.isMe ? `right: 0;`: `left: 0;`}
`

const CorrectedMessage = styled.span` 
    margin-left: 10px;
    color: var(--yellow);
    color: var(--green);
`
const ActionBox = styled.div`
    position: relative;
`

const OriginalMessage = styled.span`
    width: fit-content;
    border: none;
    outline-width: 0;
    background: none;
    ${props => props.isCorrection && 
    `
        margin-left: 10px;
        color: var(--yellow);
        text-decoration: line-through;
    `}
`

let role, isMe;
export default function Message({message}) {
    let isCorrection =  !!message.correction_message;

    const me = useSelector( store => store.mainReducer.user)
    const api_url = useSelector( store => store.mainReducer.api_url)
    const isMe = me.username === message.sender;
    const isPerfect = message.perfect;
    const dispatch = useDispatch()
    // const [correctionMessage, setCorrectionMessage] = useState()

    // const [editMode, setEditMode] = useState(false)

    function formatCorrection(correction, original){
        return correction;
    }
    function handleEdit(message) {
        dispatch(edit(message))
    }
    async function handlePerfect(message_id) {
        await axios.post('/api/v1/messages/edit', { message_id, perfect: true })
    }

    if(me) role = me.role;

    return (
        <ChatMessageRow isMe={isMe}> 


                    <Avatar src={`${api_url}/api/v1/users/${message.sender_id}/avatar`} />
                    <div>
                    {isPerfect && <CheckCircleOutlineIcon style={{color: 'var(--green)'}}  /> }
                    {!isPerfect && !isCorrection && <FiberManualRecordIcon style={{color:'white'}} /> }
                    {isCorrection && <CheckCircleOutlineIcon style={{color: 'var(--light-yellow)'}} /> }
                    </div>
                    
                    <UserTime isMe={isMe}>
                        <span>{message.sender}</span>
                        <span className="chat__timestamp">{moment(message.createdAt).format('HH:MM')}</span>
                    </UserTime>
                    <ChatMessage isMe={isMe} perfect={isPerfect} isCorrection={isCorrection}> 
                        
                        <div>
                            <CorrectedMessage>{isCorrection && formatCorrection(message.correction_message, message.original_message)}</CorrectedMessage>
                            <OriginalMessage isCorrection={isCorrection}>{message.original_message}</OriginalMessage>            
                        </div>
                        
                    </ChatMessage>
                    {role === 'TEACHER' && me.username !== message.sender &&
                            <ActionBox>
                                <IconButton>
                                    {!isPerfect && !isCorrection && <EditIcon  style={{color: 'black'}} onClick={() => handleEdit(message) }/> }  
                                    
                                </IconButton>
                                <IconButton>
                                    {!isPerfect && !isCorrection && <CheckCircleOutlineIcon style={{color: 'green'}} onClick={() => handlePerfect(message._id) }/> }  
                                </IconButton>   
                            </ActionBox>}
                    {role === 'STUDENT' && me.username !== message.sender &&
                            <ActionBox>
                                <HelpOutlineIcon />
                            </ActionBox>}
                 </ChatMessageRow>
    )
}
