import React, { useState,useEffect } from 'react';
import Picker from 'emoji-picker-react';
import { Button } from 'react-bootstrap';
import {addEmojiToComment} from '../apis/forums';
import { useCookies } from 'react-cookie';

function ForumComment(props){
    const [cookies,setCookie] = useCookies(['token']);
    const [emojis, setEmojis] = useState(props.emojis)
    const showPicker = props.showPicker
    const setShowPicker = props.setShowPicker
    const handlePicker = props.handlePicker
    const [childPicker, setChildPicker] = useState(false)

    useEffect(() => {
        if (!showPicker){
            setChildPicker(false)
        }
    })

    const onEmojiClick = (event, emojiObject) => {
        addEmojiToComment(cookies.token,emojiObject.unified,props.id)
        if (!emojis.includes(emojiObject.unified)){
            setEmojis(emojis.concat([emojiObject.unified]))
        }
    }

    const convertEmoji = (unicode) => {
        return String.fromCodePoint(parseInt(unicode, 16))
    }

    return (
        <div onClick={() => handlePicker()} className= "commentdetails" id={props.id} style = {{display: "flex", width: "80%", justifyContent: "space-between", overflowWrap: "anywhere"}}>
            <h1 style = {{fontSize: "2vh", textAlign: "left", maxWidth: "20rem"}}> 
                {props.body} 
                <h1 style = {{fontSize: "1.5vh", color:"#5c5c5c"}}>
                    Commented by: {props.user}
                </h1>
                <div className="emojis" style = {{textAlign: "left", maxWidth: "25rem"}}>
                {emojis.map((emoji,index) => (
                    convertEmoji(emoji)
                ))}
                </div>
            </h1>  

            <button id = "emojiBTN" onClick={() => (setShowPicker(true), setChildPicker(true))} style = {{marginTop: "0rem", width: "1.25rem", height: "1.25rem", display: "flex", justifyContent: "center", alignContent: "center", borderRadius: "2vh"}}>
                <h1 style = {{fontSize: "1rem", marginTop: "-0.16rem", marginBottom: "auto"}}>{convertEmoji('1f600')}</h1>
            </button>
            <div style = {{position: "absolute", right: "-20vw"}}>
                {showPicker && childPicker && <Picker onEmojiClick={onEmojiClick} />}
            </div>
        </div>  
    );
}

export default ForumComment