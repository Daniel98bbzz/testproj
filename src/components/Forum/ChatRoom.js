// ChatRoom.js
import './ChatRoom.css';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../Context/AuthContext";

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const { user } = useContext(AuthContext); // Destructure user from AuthContext

    const fetchMessages = async () => {
        try {
            const response = await fetch('https://testprojapi.onrender.com/messages');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        if (!user) {
            console.error("No user logged in");
            return;
        }

        try {
            await fetch('https://testprojapi.onrender.com/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Use the user from AuthContext for the message
                body: JSON.stringify({ user: {name: user.username, image: user.image}, message }),
            });

            setMessage(''); // Clear the message input after sending
            fetchMessages(); // Fetch messages to update the list
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        fetchMessages(); // Fetch messages on component mount
        const interval = setInterval(fetchMessages, 2000); // Poll for new messages every 2 seconds
        return () => clearInterval(interval);
    }, []); // Run only once on mount

    return (
        <div className="chat-room">
            <h2 className="chat-room-title">Chat Room</h2>
            <ul className="message-list">
    			{messages.map((message) => (
        			<li key={message._id} className="message-item">
            			<img  src={message.user.image || 'path/to/default/image.png'} alt={message.user.name} className="user-image" />
            			<strong>{message.user.name}:</strong> {message.message}
        			</li>
    			))}
			</ul>

            <div className="message-inputs">
                <input
                    type="text"
                    className="input-message"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="send-button" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;
