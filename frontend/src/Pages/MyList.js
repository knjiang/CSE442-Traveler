import { useCookies } from 'react-cookie';
import { getProfile, getListData , addLocationList, addList, deleteList, deleteLocationList, getSetShareableLink } from '../apis/profiles';
import { getLocation } from '../apis/locations'
import {useState,useEffect} from "react"
import NotLoggedIn from '../components/NotLoggedIn';
import ShareList from '../components/ShareList';
import './MyList.css'
import { DropdownButton, Dropdown, Button, Alert } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

function MyList(props){

    const user = props.parentUser
    const setUser = props.parentSetUser 
    const [cookies,setCookie] = useCookies(['token']);
    const [dataList,setList] = useState()
    const [selectedList, selectList] = useState()
    const [allLocation, setAllLocation] = useState()
    const [showSaveListError, setSaveListError] = useState(false)
    const [showSaveListSuccess, setSaveListSuccess] = useState(false)
    const [showShareList, setShareListModal] = useState(false)
    const [shareLink, setShareLink] = useState("")
    const existsCookie = typeof cookies.token != "undefined"
    const parentData = useLocation()
    
    useEffect(() => {
        if (existsCookie){
            getListData(cookies.token)
            .then(response => response.json())
            .then(data => {
                setList(data["lists"])
            });
            getLocation()
            .then(response => response.json())
            .then(data => {
              if (data){
                setAllLocation(data.map(({id, name}) => name))
              }
            })
        }
    }, [])

    useEffect(() => {
        if (parentData.state && dataList){
            selectList(parentData.state)
            parentData.state = false
        }
    }, [dataList])

    const refreshList = () => {
        getListData(cookies.token)
        .then(response => response.json())
        .then(data => {
            setList(data["lists"])
        });
    }

    const callbackShareList = () => {
        setShareListModal(false)
    }

    const shareList = (name) => {
        getSetShareableLink(cookies.token,name)
        .then(response => response.json())
        .then(data => {
            setShareLink(data.url)
            setShareListModal(true)
        });
    }

    const returnListName = () => {
        let res = [<div style = {{"borderBottom": "2px solid gray", "display":"flex"}}><h1 style = {{"fontSize": "4vh", "paddingBottom": "1vh", "paddingTop": "1vh", "marginLeft": "auto", "marginRight": "auto"}}>Your Lists </h1></div>]
        for (let name of Object.keys(dataList)){
            if (name == selectedList){
                res.push(<h1 id = "nameTextSelected" onClick = {() => (selectList(name), refreshList())}>{name} <Button variant="secondary" style={{"float":"right", "margin-right" : "1rem"}} onClick = {(evt) => (evt.stopPropagation(),shareList(name))}> Share </Button> </h1>)
            }
            else {
                res.push(<h1 id = "nameText" onClick = {() => (selectList(name), refreshList())}>{name} <Button variant="secondary" style={{"float":"right", "margin-right" : "1rem"}} onClick = {(evt) => (evt.stopPropagation(),shareList(name))}> Share </Button></h1>)
            }

        }
        return(res)
    }

    const deleteLocationFromList = (e) => {
        deleteLocationList(cookies.token, selectedList, e)
        .then(response => response.json())
        .then(data => {
            setList(data["lists"])
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
        let res = [<div style = {{"borderBottom": "2px solid gray", "display":"flex"}}><h1 style = {{"fontSize": "4vh", "paddingBottom": "1vh", "paddingTop": "1vh", "marginLeft": "auto", "marginRight": "auto"}}> Locations in the selected list </h1></div>]
        for (let n of dataList[selectedList]){
            res.push(<div id = "dataTextDiv"><a id = "dataText" href = {'/locations/' + n}><h1 id = "dataTextInside" href = {'/locations/' + n}>{n}</h1></a><Button id = "delLocationBTN" onClick = {() => deleteLocationFromList(n)}>Delete {n}</Button></div>)
        }
        return(res)
    }

    const addLocalDrop = () => {
        let res = []
        for (let i of allLocation){
            if (!dataList[selectedList].includes(i))
            res.push(<Dropdown.Item id = "dropLocationItem" onClick={() => handleADLocationList(i)}><h1 id = "dropLocationItemText">{i}</h1></Dropdown.Item>)
        }
        if (res.length) {
            return (res)
        }
        else {
            return (<Dropdown.Item><h1 style = {{"color": "red"}} id = "dropLocationItemText">All locations added</h1></Dropdown.Item>)
        }
    }

    const handleADLocationList = (local) => {
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
                    setSaveListSuccess(true)
                }
                else{
                    setSaveListError(true)
                }
            })
        }
    }

    const showModal = () => {
        if (showSaveListError) {
            return (
                <Alert style = {{"height": "8vh", "width": "80%", "textAlign":"center", "marginLeft": "auto", "marginRight": "auto"}} show={showSaveListError} variant="danger" onClose={() => setSaveListError(false)} dismissible>
                                <Alert.Heading>Error adding list!</Alert.Heading>
                    </Alert>    
            )
        }
        else if (showSaveListSuccess) {
            return (
                <Alert style = {{"height": "8vh", "width": "80%", "textAlign":"center", "marginLeft": "auto", "marginRight": "auto"}} show={showSaveListError} variant="success" onClose={() => setSaveListError(false)} dismissible>
                                <Alert.Heading>Successfully added list!</Alert.Heading>
                    </Alert>    
            )
        }
    }

    const modalReplace = () => {
        return (
            <Alert style = {{"height": "8vh", "width": "80%", "textAlign":"center", "marginLeft": "auto", "marginRight": "auto", "opacity":"0%"}} show={true} variant="danger" dismissible>
                            {// Fake modal for spacing}
                            }
                </Alert>    
        )
    }

    const handleSubmitList = (e) => {
        //Adding new list name
        e.preventDefault()
        if (document.getElementById('nameInput').value){
            addList(cookies.token, document.getElementById('nameInput').value)
            .then(res => {
                if (res.ok){
                    getListData(cookies.token)
                    .then(response => response.json())
                    .then(data => {
                        setList(data["lists"])
                    });
                }
                else{
                    setSaveListError(true)
                }
            })
        }
      }

    const inputname = () => {
        return (
            <div>
            <form onSubmit = {(e) => handleSubmitList(e)} key = "nameForm">
                New list name:                     
                <input type="text" id = "nameInput" style = {{"height":"4vh", "width":"15vw"}}/>
                <Button style = {{"height":"4vh", "marginTop": "-0.5vh"}} onClick = {(e) => handleSubmitList(e)}>
                <h1 style = {{"fontSize": "2vh"}}>Submit</h1>
                </Button>
            </form>
            </div>

        )
    }
    
    function MyListRender(){
        if (existsCookie){
            return(
            <div>
                {showSaveListError && showModal()}
                {!showSaveListError && modalReplace()}
                <div id = "lists">
                    <div id = "leftList">
                        <div id = "listScroller">
                            {dataList && returnListName()}
                        </div>
                    <div style = {{"textAlign":"center"}}>
                        <h1 style = {{"fontSize": "3vh"}}>Add new list</h1>
                        {inputname()}
                    </div>

                    </div>
                    <div id = "rightList">
                        <div id = "listScroller">
                        {selectedList && returnListData()}
                        </div>
                        {selectedList && (<div id = "optButtonDiv"><Button id = "delListBTN" onClick = {() => deleteListSubmit()}>Delete List</Button>  <DropdownButton drop = "up" id = "addLocalBTN" title = "Add Location">{addLocalDrop()}</DropdownButton> </div>)}
                    </div>
                </div> 
                <ShareList show = {showShareList} link = {shareLink} callback = {callbackShareList}/>

            </div>
            )
        }
        return <NotLoggedIn/>
    }

    return(<MyListRender/>)
}
export default MyList;