
import React, {useState, useEffect} from 'react';
import { addList, getList, addLocationList } from '../apis/profiles';
import { useTextInput } from '../hooks/text-input';
import { DropdownButton, Dropdown, Button, Modal, Alert } from 'react-bootstrap'
import '../Pages/Specific_Location.css'

function SaveLocationToList(props){

    const [list,setList] = useState({
        lists: null
      })
    const {value:newList,bind:newListBind,reset:resetNewList } = useTextInput('')
    const [showNewList, setNLShow] = useState(false); //For list add modal
    const [showNewListE, setNLShowError] = useState(false); // For list add error alert
    const [showNewListS, setNLShowSuccess] = useState(false); // For list add success alert

    const [showSaveLocationE, setSLShowError] = useState(false); // For error alert
    const [showSaveLocationS, setSLShowSuccess] = useState(false); // For success alert

    const cookies = props.parentCookies
    const user = props.parentUser
    const currentLocation = props.parentCurrentLocation

    const handleSubmitList = () => {
        //Adding new list name
        if (newList.length > 0){
            addList(cookies.token, newList)
            .then(res => {
                if (res.ok){
                    setSLShowError(false)
                    setNLShowSuccess(false)
                    setNLShowSuccess(true)
                    getList(cookies.token)
                    .then(response => response.json())
                    .then(data =>{
                    if (!data.detail){
                        data = data["lists"]
                        setList({lists: data})
                        }
                    })
                }
                else{
                    setSLShowError(false)
                    setNLShowSuccess(false)
                    setNLShowError(true)
                }
            })
        }
        resetNewList()
        
      }

    const handleADLocationList = (list) => {
        //Adding location to a preexisting list
        if (list){
            addLocationList(cookies.token, list, currentLocation)
            .then(res => {
                if (res.ok){
                    setSLShowError(false)
                    setNLShowSuccess(false)
                    setSLShowSuccess(true)
                }
                else{
                    setSLShowError(false)
                    setNLShowSuccess(false)
                    setSLShowError(true)
                }
            })
        }
    }

    const list_dropDown = () => {
    if (list.lists){
        return(
        <DropdownButton id="dropdown-basic-button" title="Add to list" onSelect={(eventKey) => handleADLocationList(eventKey)}>
            {list.lists.map((list, index) => (
                <div>
                    <Dropdown.Item id = "dropdown-item" eventKey={list}>{list}</Dropdown.Item>
                </div>
            ))}
            <div>
                <Dropdown.Item id = "dropdown-item" onClick = {() => setNLShow(true)}>Create new list</Dropdown.Item>
            </div>
            </DropdownButton>
        )
    }
    else {
        return (
        <DropdownButton id="dropdown-basic-button" title="Choose your location">
            <Dropdown.Item id = "dropdown-item" onClick = {() => setNLShow(true)} >Create new list</Dropdown.Item>
        </DropdownButton>
        )
    }
    }

    useEffect(() => {
        if (cookies.token && user.logged_in){
            getList(cookies.token)
            .then(response => response.json())
            .then(data =>{
            if (!data.detail){
                data = data["lists"]
                setList({lists: data})
                }
            })
        }
    }, [])

    const handleClose = () => setNLShow(false);

    return (
        <div >
            <div style = {{ "textAlign": "right", "display": "flex", "justifyContent": "end"}}>
                {list_dropDown()}
            </div>

            <Alert show={showSaveLocationE} style = {{position: "fixed", right: "10vw"}} variant="danger" onClose={() => setSLShowError(false)} dismissible>
                    Error, location already in selected list.
                </Alert>                   
                
                <Alert show={showSaveLocationS} variant="success" style = {{position: "fixed", right: "10vw"}} onClose={() => setSLShowSuccess(false)} dismissible>
                    Success, location added to selected list.
                </Alert>

            <Modal show={showNewList}  onHide={handleClose}>
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
                        Enter new list name     :                     
                        <input type="text" {...newListBind} />
                        </label>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitList}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SaveLocationToList