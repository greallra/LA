import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components';
import moment from 'moment';
import { FaRegCheckCircle } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'


const Wrapper = styled.div`
      margin: 12px 0;
    `
const TimeStamp = styled.div`
      
    `
const Reply = styled.form`
    // font-size: ${props => props.isMe ? "8px" : "12px"};
    display: flex;
    position: relative;
    justify-content: space-between;
    background: #F0F0F0;
    padding: 10px;
    border-top: 1px solid lightgrey;
    // ${props => props.isMe ? "margin-right: 70px" : "margin-left: 70px"};
    border-radius: .5rem;
    flex-grow: 8;
    &:hover {
        background: lightblue;
        cursor: pointer;
    }
    `

const Text = styled.div`
   
    `
const Edit = styled.input`
    display: ${props => props.editMode ? "flex" : "none"};

    `
const Toolbox = styled.div`
    opacity: ${props => props.hovering ? "100%" : "30%"};
    display: flex;
    background: white;
    position: absolute;
    right: 16px;
    top: -20px;
    border-radius: .5rem;
    border: 1px solid lightgrey;
   
    `
const Toolbox2 = styled.div`
    opacity: ${props => props.changesMade ? "100%" : "30%"};
    display: flex;
    color: white;
    background: var(--green);
    position: absolute;
    left: 0;
    top: -20px;
    border-radius: .5rem;
    border: 1px solid lightgrey;
    &:hover {
        background: green;
        cursor: pointer;
      }
    `
const Msg = styled.div`      
        // font-size: ${props => props.isMe ? "8px" : "12px"};
        display: flex;
        position: relative;
        justify-content: space-between;
        background: ${props => props.correctionConfirmed ? "#ccffcc" : "white"};
        padding: 10px;
        
        //${props => props.isMe ? "margin-right: 70px" : "margin-left: 70px"};
        border-radius: .5rem;
        flex-grow: 8;
        &:hover {
            background: lightblue;
            cursor: pointer;
          }
        
    `

export default function Message({role, message, timestamp, messageId, meId, handleSend}) {
    const [hovering, setHovering] = useState(false);
    const [reply, setReply] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [changesMade, setChangesMade] = useState(false);
    const [correctionConfirmed, setCorrectionConfirmed] = useState(false);
    const editRef = useRef()
    const replyRef = useRef()
    const [editMessage, setEditMessage] = useState(message);
    const isMe = messageId === meId;

    function handleEditMode() {
        setEditMode(true);
        editRef.current.focus();
    }
    function handleConfirmEdit() {
        //new message with corrections highlighted
        console.log("original", message);
        console.log("new", editMessage);
        if(message !== editMessage){
            setCorrectionConfirmed(true)
            replyRef.current.focus()
        }
    }
    useEffect(() => {
        
    }, [editMessage])

    function handleReply(e) {
        e.preventDefault()
        //original
        //correction
        //reply
        console.log("sned");
        handleSend(message, editMessage, reply)
    }
   
    function handleEditMessageChange(e){
        setEditMessage(e.target.value)
        if(editMessage !== message) {
            setChangesMade(true)
        }   
    }
 
        if(isMe){
            return (
                <Msg isMe={isMe} onMouseEnter={ () => setHovering(true) } onMouseLeave={ () => setHovering(false) } >   
                      {!editMode && <Text> {message}</Text> } <TimeStamp>{moment(timestamp).format("HH:MM")}</TimeStamp>

                </Msg>
             )
        } else {
            return (
                <Wrapper>
                <Msg isMe={isMe} onMouseEnter={ () => setHovering(true) } onMouseLeave={ () => setHovering(false) } correctionConfirmed={correctionConfirmed}>   
                      {!editMode && <Text> {message}</Text> } <Edit ref={editRef} value={editMessage} onChange={handleEditMessageChange} editMode={editMode}/> <TimeStamp>{moment(timestamp).format("HH:MM")}</TimeStamp>
                      <Toolbox hovering={hovering}>
                            <FiEdit style={{padding: 5, background: 'orange'}} onClick={handleEditMode} />
                            <FaRegCheckCircle style={{padding: 5, background: 'lightgreen'}} />
                      </Toolbox>
                      {editMode &&<Toolbox2 changesMade={changesMade}>
                            <span color="green" onClick={handleConfirmEdit}>Confirm Corrections</span><FaRegCheckCircle  color="green"/> 
                      </Toolbox2>}
                      
                </Msg>
                <Reply onSubmit={handleReply}>
                    <input type="text" ref={replyRef} value={reply} onChange={ (e) => setReply(e.target.value)} /><div>Add Reply</div>
                 </Reply>
                </Wrapper>
             )

        }
        
    // if(role === 'ADMIN'){
    //     return (
    //         <Msg isMe={isMe}>

    //               <Text> {message}</Text><TimeStamp>{moment(timestamp).format("HH:MM")}</TimeStamp>
    //               <Toolbox></Toolbox>
    //         </Msg>
    //     )
    // } else if(role === 'STUDENT'){
    //     return (
    //         <Msg isMe={isMe}>
    //               <Text> {message}</Text><TimeStamp>{moment(timestamp).format("HH:MM")}</TimeStamp>
        
    //         </Msg>
    //     )
    // } else if(role === 'TEACHER'){
    //     return (
    //         <Msg isMe={isMe}>
    //               <Text> {message}</Text><TimeStamp>{moment(timestamp).format("HH:MM")}</TimeStamp>
        
    //         </Msg>
    //     )
    // } else {
    //     return <div>nada</div>
    // }
    
}
