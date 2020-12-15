import React from 'react'

import { RiRadioButtonLine } from 'react-icons/ri';

export default function MeStatus({me, connected}) {
    return (
        <div>
            <div>{me && me.username}</div>
            <RiRadioButtonLine  color={connected ? 'green':'grey'} />
          
        </div>
    )
}
