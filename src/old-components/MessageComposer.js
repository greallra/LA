import React, { useState } from 'react'
import styled from 'styled-components';

const MessageCompozer = styled.form`
    flex-grow: 1;
    background: white;
    display: flex;
`
const Input = styled.input`
   border: 1px solid var(--lightgrey);
   flex-grow: 6;
`
const Button = styled.button`
   border: 1px solid var(--lightgrey);
   flex-grow: 2;
   color: blue;
`

export default function MessageComposer() {
    const [message, setMessage] = useState('');
 
    function handleSendMessage(e){
        e.preventDefault();
        // (e) => sendMessage(e)
    }

    return (
    <MessageCompozer onSubmit={handleSendMessage}>
        <Input type="text" value={message} onChange={ (e) => setMessage(e.target.value)}/>
        <Button type="submit" disabled={!message}>Send</Button>
    </MessageCompozer>
    )
}
