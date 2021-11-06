import React, { useState,useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

function ForumComment(props){
    const [cookies,setCookie] = useCookies(['token']);

    const showPicker = props.showPicker
    const setShowPicker = props.setShowPicker
    const emojis = props.emojis
    const setEmojis = props.setEmojis

    const handlePicker = () => {
        if (showPicker) {
            setShowPicker(false)
        }
    }

    const convertEmoji = (unicode) => {
        return String.fromCodePoint(parseInt(unicode, 16))
    }
    
    return (
        <div onClick = {() => handlePicker()} className= "commentdetails" id={props.id} style = {{display: "flex", justifyContent: "space-between", width: "75%"}}>
            <h1 style = {{"maxWidth": "20rem", textAlign: "left", fontSize: "2vh", overflowWrap: "break-word", wordBreak: "normal"}}> 
                {props.body} 
                <br/>

                <h1 style = {{fontSize: "1.5vh", marginTop: "1vh"}}>
                    Posted by: {props.user}
                </h1>

            </h1>  
            <div className="emojis">
                {emojis.map((emoji,index) => (
                    convertEmoji(emoji)
                ))}
            </div>
            <div>
                <Button onClick={() => setShowPicker(true)}>React</Button>
            </div>
        </div>  
    );
}

export default ForumComment
