import React, {useState, useEffect} from 'react';
import './Chat.css';
import {Avatar, IconButton} from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from "react-router-dom";
import db from '../firebase';
import {useStateValue} from '../StateProvider';
import firebase from 'firebase';
import Emoji from './EmojiPiker';


const Chat = () => {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState(""); 
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
    };

    useEffect(() => {
       if(roomId) {
        db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
        db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => 
        setMessages(snapshot.docs.map((doc => doc.data()))
        ));
       } 
    },[roomId]);


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__headerLeft">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                    <div className="chat__headerInfo">
                        <h3>{roomName}</h3>
                        <p>Last seen at {' '} 
                                {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                        </p>
                    </div>
                </div>
            
                <div className="chat__headerRight">
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
               {messages.map(message =>(
                    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>    
               ))}               
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                
                <form>
                    <input 
                    value= {input}
                    type="text"
                    placeholder="type your message"
                    onChange={(e)  => setInput(e.target.value)}
                    />
                    <button onClick={sendMessage} type="submit"></button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
};

export default Chat;
