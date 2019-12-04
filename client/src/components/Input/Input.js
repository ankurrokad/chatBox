import React from 'react'
import './Input.css'

export const Input = ({ message, setMessage, sendMessage }) => {
    return (
        <div>
            <form className="form">
                <input
                    className="input"
                    type="text"
                    placeholder="Enter message..."
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />

                <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>

            </form>

        </div>
    )
}
