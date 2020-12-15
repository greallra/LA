import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import { IconButton, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import { resetEdit, toggleEditMessageConfirmed } from '../redux/actions'

const Confirmed = styled.div`
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  color: var(--green);
  font-weight: 900;
  font-size: 20px;
`
const H1 = styled.div`
  margin-bottom: 5px;
`
const AM = styled.div`
  display: flex;
 background: var(--grey);
 padding: 10px;
  align-items: center;
  border-left: 6px solid var(--yellow);
  border-radius: .5rem;
  ${props => props.isCorrected && 
    `
    background: var(--light-green);
    `}
`
const AttachmentMessageLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex:1;
  margin-right: 5px;
`
const AttachmentMessageRight = styled.div`
  display: flex;
  flex-direction: column;
  flex:1;
`


const Orignal = styled.div`
    border-radius: 30px;
    padding: 10px;
    background: var(--light-red);
`

export default function AttachmentMessage({correctionInput, setCorrectionInput}) {
    const editMessage = useSelector( store => store.mainReducer.editMessage )
    const editMessageConfirmed = useSelector( store => store.mainReducer.editMessageConfirmed )

    const dispatch = useDispatch()

    function handleCancelCorrection() {
        dispatch(resetEdit())
        dispatch(toggleEditMessageConfirmed(false))
        setCorrectionInput('')
    }
   

    useEffect(() => {
        // console.log("editMessageConfirmed", editMessageConfirmed);
    }, [editMessageConfirmed])
    useEffect(() => {
        if(editMessage) setCorrectionInput(editMessage.original_message)
        // console.log("editMessage", editMessage);
    }, [editMessage])
    useEffect(()=> {
        //if(editMessage) setNewMessage(editMessage.original_message)
    }, [])

    
    if(!editMessage) {
        return <></>
    }
    const { sender, original_message } = editMessage;
    const isCorrected = original_message != correctionInput;

    return (
        <>
        {editMessageConfirmed && <Confirmed><span>Correction confirmed</span>  <CheckCircleOutlineIcon /></Confirmed>}
        <AM isCorrected={isCorrected}>
                <AttachmentMessageLeft>
                   
                    <H1>{sender} 's original message</H1>
                    <Orignal>{original_message}</Orignal> 
                </AttachmentMessageLeft>
                <AttachmentMessageRight>
                    <H1>Write your correction here!</H1>
                    <input type="text" value={correctionInput} placeholder={original_message} onChange={ (e) => setCorrectionInput(e.target.value) }/>
                </AttachmentMessageRight>
                <IconButton onClick={handleCancelCorrection}> <CloseIcon /></IconButton>
                
        </AM>
      
        </>
    )
}
