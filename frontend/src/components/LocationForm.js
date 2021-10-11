
import React, {useState} from 'react';
import { useCookies } from 'react-cookie';
import { useTextInput} from '../hooks/text-input';
import { Modal, Button} from 'react-bootstrap';
import { changeLocation } from '../apis/profiles';

function LocationForm(){

    const {value:fromLocation,bind:fromLocationBind,reset:resetFromLocation } = useTextInput('')
    const [cookies] = useCookies(['token'])

    const handleSubmit = (evt) => {
        evt.preventDefault();
        changeLocation(cookies.token,fromLocation)
        resetFromLocation();
        setShow(false);
        window.location.reload();
    }

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Location Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label>
            Where are you from?:
            <input type="text" {...fromLocationBind} />
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

export default LocationForm