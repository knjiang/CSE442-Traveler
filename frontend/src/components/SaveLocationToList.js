
import React, {useState, useEffect} from 'react';
import { changeList, getList } from '../apis/profiles';
import { useCookies } from 'react-cookie';
import { useTextInput} from '../hooks/text-input';
import { DropdownButton, Dropdown, Button, Modal } from 'react-bootstrap'

function SaveLocationToList(props){

    const [list,setList] = useState({
        lists: null
      })
    const {value:newList,bind:newListBind,reset:resetNewList } = useTextInput('')
    const [show, setShow] = useState(false);

    const cookies = props.parentCookies
    const user = props.parentUser

    const handleSubmit = () => {
        console.log(newList)
        //changeList(cookies.token)
      }

    const list_dropDown = () => {
    if (list.lists){
        console.log(list)
        return(
        <DropdownButton id="dropdown-basic-button" title="Choose your location">
            {list.lists.map((locations, index) => (
                <div className = "Location_Boxes">
                    <Dropdown.Item >{locations}</Dropdown.Item>
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
                setList({lists: (data.map(({id, name}) => [name]))})
                }
            })
        }
    }, [])

    const handleClose = () => setShow(false);

    return (
        <div>
            {list_dropDown()}
            <Modal show={show} onHide={handleClose}>
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