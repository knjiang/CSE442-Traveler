import React, {useState} from 'react';
import { Modal, Button} from 'react-bootstrap';
import {addTag} from '../apis/forums';

function ShareTag(props){

    const handleClose = () => {
        props.callback()
    }
    const submitTag = (e) => {
        let friend = document.getElementById("friendName").value
        addTag(props.cookies.token, props.postID, friend)
        props.callback()
    }

    return(
        <div>
        <Modal show={props.show} onHide={() => (handleClose())}>
        <Modal.Header closeButton>
        <Modal.Title>Tag your friend!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit>
            Friend: <input style = {{"width": "10vw;"}} id = "friendName"></input>
            </form>
        <Button variant="secondary" onClick = {(e) => submitTag(e)}>
            Tag!
        </Button>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>
            Close
        </Button>
        </Modal.Footer>
    </Modal>
    </div>
    )
}

export default ShareTag