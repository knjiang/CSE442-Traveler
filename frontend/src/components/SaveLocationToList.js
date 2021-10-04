
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
    const [show, setShow] = useState(false); //For modal
    const [showE, setShowError] = useState(false); // For error alert
    const [showS, setShowSuccess] = useState(false); // For success alert

    const cookies = props.parentCookies
    const user = props.parentUser
    const currentLocation = props.parentCurrentLocation

    const handleSubmit = () => {
        console.log(newList)
        addList(cookies.token, newList)
        .then(res => {
            if (res.ok){
                setShowSuccess(true)
            }
            else{
                setShowError(true)
            }
        })
        
        resetNewList()
      }

    const handleADLocationList = () => {
        addDeleteLocationList(cookies.token, list, currentLocation, true)
        .then(res => {
            if (res.ok){
                alert("NICE")
            }
            else{
                alert("NO")
            }
        })
    }

    const list_dropDown = () => {
    if (list.lists){
        console.log(list)
        return(
        <DropdownButton id="dropdown-basic-button" title="Add to list">
            {list.lists.map((list, index) => (
                <div className = "Location_Boxes">
                    <Dropdown.Item onClick = {() => handleADLocationList()}>{list}</Dropdown.Item>
                </div>
            ))}
            <div className = "Location_Boxes">
                <Dropdown.Item onClick = {() => setShow(true)}>Add new list</Dropdown.Item>
            </div>
            </DropdownButton>
        )
    }
    else {
        return (
        <DropdownButton id="dropdown-basic-button" title="Choose your location">
            <Dropdown.Item onClick = {() => setShow(true)} >Add new list</Dropdown.Item>
        </DropdownButton>
        )
    }
    }

    useEffect(() => {
        if (cookies.token && !user.logged_in){
            getList(cookies.token)
            .then(response => response.json())
            .then(data =>{
            console.log(data)
            if (!data.detail){
                setList({lists: (data.map(({id, name}) => name))})
                }
            })
        }
    }, [])

    const handleClose = () => setShow(false);

    return (
        <div>
            {list_dropDown()}
            <Modal show={show} onHide={handleClose}>
                    <Alert show={showE} variant="danger" onClose={() => setShowError(false)} dismissible>
                            <Alert.Heading>Error!</Alert.Heading>
                            <p>
                            List name exists, please enter a different name.
                            </p>
                        </Alert>                   
                        
                        <Alert show={showS} variant="success" onClose={() => setShowSuccess(false)} dismissible>
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