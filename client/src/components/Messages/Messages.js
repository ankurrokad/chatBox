import React from 'react'
import './Messages.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import { Message } from './Message/Message'

export const Messages = ({ messages, name }) => {
    return (

        <ScrollToBottom className="messages" >
            {messages.map((message, i) => {
                return (
                    <div key={i}><Message message={message} name={name} /></div>)
            })}
        </ScrollToBottom>
    )
}
