
import React, {useState, useEffect} from 'react';
import { addList, getList, addDeleteLocationList } from '../apis/profiles';
import { useCookies } from 'react-cookie';
import { useTextInput} from '../hooks/text-input';
import { DropdownButton, Dropdown, Button, Modal, Alert } from 'react-bootstrap'

function SaveLocationToList(props){

    const [list,setList] = useState({
        lists: null
      })
    const {value:newList,bind:newListBind,reset:resetNewList } = useTextInput('')
    const [showNewList, setNLShow] = useState(false); //For list add modal
    const [showNewListE, setNLShowError] = useState(false); // For list add error alert
    const [showNewListS, setNLShowSuccess] = useState(false); // For list add success alert

    const [showSaveLocation, setSLShow] = useState(false); //For modal
    const [showSaveLocationE, setSLShowError] = useState(false); // For error alert
    const [showSaveLocationS, setSLShowSuccess] = useState(false); // For success alert

    const cookies = props.parentCookies
    const user = props.parentUser
    const currentLocation = props.parentCurrentLocation

    const handleSubmit = () => {
        addList(cookies.token, newList)
        .then(res => {
            if (res.ok){
                setNLShowSuccess(true)
            }
            else{
                setNLShowError(true)
            }
        })
        
        resetNewList()
      }

    const handleADLocationList = (list) => {
        addDeleteLocationList(cookies.token, list, currentLocation)
        .then(res => {
            if (res.ok){
                setSLShowSuccess(true)
            }
            else{
                setSLShowError(true)
            }
        })
    }

    const list_dropDown = () => {
    if (list.lists){
        return(
        <DropdownButton id="dropdown-basic-button" title="Add to list" onSelect={(eventKey) => handleADLocationList(eventKey)}>
            {list.lists.map((list, index) => (
                <div className = "Location_Boxes">
                    <Dropdown.Item eventKey={list} >{list}</Dropdown.Item>
                </div>
            ))}
            <div className = "Location_Boxes">
                <Dropdown.Item onClick = {() => setNLShow(true)}>Add new list</Dropdown.Item>
            </div>
            </DropdownButton>
        )
    }
    else {
        return (
        <DropdownButton id="dropdown-basic-button" title="Choose your location">
            <Dropdown.Item onClick = {() => setNLShow(true)} >Add new list</Dropdown.Item>
        </DropdownButton>
        )
    }
    }

    useEffect(() => {
        if (cookies.token && !user.logged_in){
            getList(cookies.token)
            .then(response => response.json())
            .then(data =>{
            if (!data.detail){
                setList({lists: (data.map(({id, name}) => name))})
                }
            })
        }
    }, [])

    const handleClose = () => setNLShow(false);

    return (
        <div>
            {list_dropDown()}
            <Alert show={showSaveLocationE} variant="danger" onClose={() => setSLShowError(false)} dismissible>
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>
                    Error, Location already in list.
                    </p>
                </Alert>                   
                
                <Alert show={showSaveLocationS} variant="success" onClose={() => setSLShowSuccess(false)} dismissible>
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>
                    Location has been added to selected list.
                    </p>
                </Alert>

            <Modal show={showNewList} onHide={handleClose}>
                    <Alert show={showNewListE} variant="danger" onClose={() => setNLShowError(false)} dismissible>
                            <Alert.Heading>Error!</Alert.Heading>
                            <p>
                            List name exists, please enter a different name.
                            </p>
                        </Alert>                   
                        
                        <Alert show={showNewListS} variant="success" onClose={() => setNLShowSuccess(false)} dismissible>
                            <Alert.Heading>Success!</Alert.Heading>
                            <p>
                            List has been added to your profile.
                            </p>
                        </Alert>
                <Modal.Header closeButton>
                <Modal.Title>New list adder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>
                    Enter the name of new list
                    <input type="text" {...newListBind} />
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
        </div>
    )
}

export default SaveLocationToList