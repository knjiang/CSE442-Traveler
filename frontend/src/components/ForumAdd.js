import React, {useState} from 'react';
import { useCookies } from 'react-cookie';
import { useTextInput} from '../hooks/text-input';
import { Modal, Button} from 'react-bootstrap';
import { AddForum } from '../apis/forums';

function ForumForm(){

    const {value:name,bind:nameBind,reset:resetName } = useTextInput('')
    const [cookies] = useCookies(['token'])

    const handleSubmit = (evt) => {
        evt.preventDefault();
        AddForum(cookies.token,name)
        resetName();
        setShow(false);
    }

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Forum Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label>
            Name of Forum:
            <input type="text" {...nameBind} />
            </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ForumForm