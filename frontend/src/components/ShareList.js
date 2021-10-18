
import React, {useState} from 'react';
import { Modal, Button} from 'react-bootstrap';
import {Link}from 'react-router-dom'

function ShareList(props){

    const [show, setShow] = useState(props.show);

    const handleClose = () => {
        props.callback()
        setShow(false);
    }

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Location Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label>
            Here's the link: <Link style = {{"font-size": "2vh"}}
                to={{
                  pathname: `/share/${props.link}`,
                }}
              >Link</Link>
            </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ShareList