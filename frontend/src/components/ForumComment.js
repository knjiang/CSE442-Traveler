import React, { useState,useEffect } from 'react';
import Picker from 'emoji-picker-react';
import { Button } from 'react-bootstrap';
import {addEmojiToComment} from '../apis/forums';
import { useCookies } from 'react-cookie';

function ForumComment(props){
    const [cookies,setCookie] = useCookies(['token']);
    const [showPicker, setShowPicker] = useState(false)
    const [emojis, setEmojis] = useState(props.emojis)

    const onEmojiClick = (event, emojiObject) => {
        addEmojiToComment(cookies.token,emojiObject.unified,props.id)
        setEmojis(emojis.concat([emojiObject.unified]))
    }

    const handlePicker = () => {
        setShowPicker(!showPicker)
    }

    const convertEmoji = (unicode) => {
        return String.fromCodePoint(parseInt(unicode, 16))
    }
    
    return (
        <div className= "commentdetails" id={props.id}>
            <p> 
                {props.body} - {props.user}
            </p>  
            <div className="emojis">
                {emojis.map((emoji,index) => (
                    convertEmoji(emoji)
                ))}
            </div>
            <Button onClick={handlePicker}>Pick Emoji</Button>
            {showPicker && <Picker onEmojiClick={onEmojiClick} />}
        </div>  
    );
}

export default ForumComment
