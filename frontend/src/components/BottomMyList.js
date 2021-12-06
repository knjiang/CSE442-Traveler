import { useEffect,useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { getListData, deleteList, deleteLocationList, getDescription, addDescription, editDescription, delDescription} from '../apis/profiles'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap'
import ShareList from '../components/ShareList';


function BottomMyList(props){
    const user = props.parentUser
    const setUser = props.parentSetUser
    const dataList = props.dataList
    const selectedList = props.selectedList
    const selectList = props.selectList
    const cookies = props.cookies
    const setList = props.setList
    const allLocation = props.allLocation
    const shareLink = props.shareLink
    const setShareLink = props.setShareLink
    const showShareList = props.showShareList
    const setShareListModal = props.setShareListModal
    const shareList = props.shareList

    const[showDescriptions,setShowDescriptions] = useState()
    const[descriptions,setDescriptions] = useState()

    useEffect (() => {
        if (descriptions == undefined && selectedList) {
            getDescription(cookies.token, selectedList)
            .then(res => res.json())
            .then(data => {
                if (data["listDescriptions"].length < 1){
                    setShowDescriptions(false)
                }
                else {
                    setShowDescriptions(true)
                    setDescriptions(data["listDescriptions"])
                    
                }
            })
        }
    }, [descriptions, showDescriptions])

    const refreshList = () => {
        getListData(cookies.token)
        .then(response => response.json())
        .then(data => {
            setList(data["lists"])
        });
    }

    const returnListName = () => {
        if (typeof dataList != 'undefined'){
            let res = [<div style = {{"borderBottom": "2px solid gray", "display":"flex"}}><h1 style = {{fontSize: "1.4rem", "paddingBottom": "1vh", "paddingTop": "1vh", "marginLeft": "auto", "marginRight": "auto"}}>Your Lists </h1></div>]
            for (let name of Object.keys(dataList)){
                if (name == selectedList){
                    res.push(<h1 id = "nameTextSelected" onClick = {() => (selectList(name))}> <h1>{name}</h1> <Button id = "shareBTN" onClick = {(evt) => (evt.stopPropagation(),shareList(name))}> Share </Button> </h1>)
                }
                else {
                    res.push(<h1 id = "nameText" onClick = {() => (selectList(name))}> <h1>{name}</h1> <Button id = "shareBTN" onClick = {(evt) => (evt.stopPropagation(),shareList(name))}> Share </Button></h1>)
                }
    
            }
            return(res)
        }
    }

    const deleteDescription = () => {
        delDescription(cookies.token, descriptions, selectedList)
        .then(response => response)
        .then(data => {
            setDescriptions(false)
            setShowDescriptions(false)
        })
    }
    
    const changedDescription = () => {
        
        let newDescription = document.getElementById("textArea").value
        editDescription(cookies.token, descriptions, selectedList, newDescription)
        .then(response => response)
        .then(data => { // use as confirmation
            setDescriptions(newDescription)
            setShowDescriptions(true)
        })
    }

    const deleteListSubmit = () => {
        selectList()
        deleteList(cookies.token, selectedList)
        .then(response => response.json())
        .then(data => {
            setList(data["lists"])
        })
    }

    const returnListData = () => {
        let res = []
        for (let n of dataList[selectedList]){
            res.push(
            <div id = "dataTextDiv">
                <Button id = "delLocationBTN" onClick = {() => deleteLocationFromList(n)}><h1>Delete {n}</h1></Button>
                <a id = "dataText" href = {'/locations/' + n.replace(/ /g, '-')}>
                    <h1 id = "dataTextInside" href = {'/locations/' + n.replace(/ /g, '-')}>{n}</h1>
                    </a>

            </div>)
        }
        return(<div id = "listDataWrapper">{res}</div>)
    }

    const deleteLocationFromList = (e) => {
        deleteLocationList(cookies.token, selectedList, e)
        .then(response => response.json())
        .then(data => {
            setList(data["lists"])
        })
    }

    const descriptionAdder = () => {
        let input = document.getElementById("textArea").value.trim()
        document.getElementById("textArea").value = ""
        if (input.length > 0){
            addDescription(cookies.token, input, selectedList)
            .then (data => {
                setShowDescriptions(true)
                setDescriptions(input)
            })
        }
    }

    const showDescriptionFalse = () => {
        if (!descriptions) {
            return (
                <div id = "descriptionDiv">
                    <form style = {{fontSize: "1rem"}}>
                        No description for {selectedList}
                        <br/>
                        <textarea placeholder="Enter a new description for the selected list" id = "textArea" type="text">
                            </textarea>
                        <Button onClick = {() => descriptionAdder()} style = {{fontSize: "0.8rem", "height":"2rem", "marginTop": "-2.5vh"}}>Submit</Button>
                    </form>
                </div>
            )
        }

    }

    const showDescriptionTrue = () => {
        return (
            <div id = "descriptionDiv">
                <div style = {{"display": "flex"}}>
                    <h3 style = {{fontSize: "1rem"}}>Description for {selectedList}:</h3>
                    <Button style = {{"marginBottom":"auto", "marginTop":"auto", "height": "1.4rem", "marginRight": "0.5vw", "marginLeft": "0.5vw"}} onClick = {() => setShowDescriptions("edit")}><h3 style = {{fontSize: "0.8rem", "marginBottom": "auto", marginTop: "auto"}}>Edit</h3></Button>
                    <Button onClick = {() => deleteDescription()}style = {{"marginBottom":"auto", "marginTop":"auto", "height": "1.4rem", "backgroundColor": "rgb(255, 198, 198)", "color":"black"}} ><h3 style = {{fontSize: "0.8rem", "marginBottom": "auto", marginTop: "auto"}}>Delete</h3></Button>
                </div>

                <h3 style = {{fontSize: "1rem"}}>{descriptions}</h3>
            </div>
    
        )
    }

    const showDescriptionEdit = () => {
        return (
            <div id = "descriptionDiv">
                <h3 style = {{fontSize: "1rem"}}>Editing the description for the {selectedList}:</h3>
                <textarea defaultValue = {descriptions} placeholder="Enter a new description for the selected list" id = "textArea" type="text">
                        </textarea>
                <div style = {{"display": "flex"}}>
                <Button onClick = {() => changedDescription()} style = {{"marginRight": "1vw", fontSize: "0.8rem", "height":"2rem"}}>Submit</Button>
                <Button onClick = {() => setShowDescriptions(true)} style = {{fontSize: "0.8rem", "height":"2rem"}}>Cancel</Button>
                </div>

            </div>
    
        )
    }

    const returnBottomLeft = () => {
        return (
            <div id = "bottomLeftListWrapper">
                <div id = "bottomLeftListNameWrapper">
                    {returnListName()}
                </div>
                <div id = "optButtonDiv"><Button id = "delListBTN" onClick = {() => deleteListSubmit()}>Delete List</Button></div>
            </div>
        )
    }

    const returnBottomRight = () => {
        return (
            <div id = "bottomRightListWrapper">
                {selectedList && (showDescriptions == "edit") && showDescriptionEdit()}
                {selectedList && (showDescriptions == true) && showDescriptionTrue()}
                {selectedList && (showDescriptions == false) && showDescriptionFalse()}
                {selectedList && returnListData()}
            </div>
        )
    }

    return(
        <div id = "bottomListWrapper">
            {returnBottomLeft()}
            {returnBottomRight()}
        </div>
    )
}
export default BottomMyList;