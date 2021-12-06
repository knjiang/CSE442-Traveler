import { useEffect,useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { addList, getListData, addLocationList } from '../apis/profiles'
import { Button, Dropdown } from 'react-bootstrap'

function TopMyList(props){
    const user = props.parentUser
    const setUser = props.parentSetUser
    const dataList = props.dataList
    const selectedList = props.selectedList
    const selectList = props.selectList
    const cookies = props.cookies
    const setList = props.setList
    const allLocation = props.allLocation

    const handleSubmitList = (e) => {
        let inputList = document.getElementById('nameInput').value
        document.getElementById('nameInput').value = ""
        //Adding new list name
        e.preventDefault()
        if (inputList.length > 0){
            addList(cookies.token, inputList)
            .then(res => {
                if (res.ok){
                    getListData(cookies.token)
                    .then(response => response.json())
                    .then(data => {
                        setList(data["lists"])
                    });
                }
                else{
                    document.getElementById('nameInput').classList.replace("normal", "red");
                    setTimeout(function() {
                        document.getElementById('nameInput').classList.replace("red", "normal");
                    }, 1000);
                }
            })
        }
        else {
            document.getElementById('nameInput').classList.replace("normal", "red");
            setTimeout(function() {
                document.getElementById('nameInput').classList.replace("red", "normal");
            }, 1000);
        }
      }

    const inputname = () => {
        return (
            <div>
            <form onSubmit = {(e) => handleSubmitList(e)} key = "nameForm" style = {{"fontSize": "1.2rem", "marginTop":"auto", "marginBottom": "auto"}}>
                Add a new list:      
                <input placeholder="Type the new list name here" type="text" id = "nameInput" className = "normal" style = {{"height":"2rem", "width":"20rem", "marginLeft": "0.2rem"}}/>
                <Button style = {{"height":"2rem", "marginTop": "auto"}} onClick = {(e) => handleSubmitList(e)}>
                <h1 style = {{"fontSize": "0.8rem", marginTop: "auto", marginBottom: "auto"}}>Submit</h1>
                </Button>
            </form>
            </div>

        )
    }

    const addLocalDrop = () => {
        let res = []
        if (typeof selectList != undefined && allLocation && typeof dataList != undefined) {
            for (let i of allLocation.sort()){
                if (!dataList[selectedList].includes(i))
                res.push(<Dropdown.Item id = "dropLocationItem" onClick={() => handleAddLocationList(i)}><h1 id = "dropLocationItemText">{i}</h1></Dropdown.Item>)
            }
            if (res.length) {
                return (res)
            }
            else {
                return (<Dropdown.Item><h1 style = {{"color": "red"}} id = "dropLocationItemText">All locations added</h1></Dropdown.Item>)
            }
        }
    }

    const handleAddLocationList = (local) => {
        //Adding location to a preexisting list
        if (selectedList && selectedList.length > 0){
            addLocationList(cookies.token, selectedList, local) //listname, locationname
            .then(res => {
                if (res.ok){
                    getListData(cookies.token)
                    .then(response => response.json())
                    .then(data => {
                        setList(data["lists"])
                    });
                }
                else{
                }
            })
        }
    }

    const returnTop = () => {
        return (
            <div id = "topListWrapper">
                <div style = {{"textAlign":"center"}}>
                        {inputname()}
                    </div>
                {selectedList && <Dropdown drop = "down" id = "addLocalBTN">
                    <Dropdown.Toggle id = "addLocalBTN">
                    Add Location
                    </Dropdown.Toggle>
                    <Dropdown.Menu style = {{maxHeight: "30rem", overflow: "scroll"}}>{addLocalDrop()}</Dropdown.Menu></Dropdown>}
                {!selectedList && <Button drop = "down" id = "addLocalBTN" id = "addLocalBTNOff" title = "Select a list">Select a list</Button>}
            </div>
        )
    }

    return(
        <div>
            {returnTop()}
        </div>
    )
}
export default TopMyList;