import React from 'react'

export default function ConnectedUsers({connectedUsers = [], me}) {
    if(me && connectedUsers.length > 0) {
        connectedUsers = connectedUsers.filter( user => user.id !== me.id)
    }
    return (
        <div>
            {connectedUsers && connectedUsers.length > 0 &&
                connectedUsers.map( ({username}) => {
                    return <div>
                        {username}
                    </div>
                })
            }
        </div>
    )
}
