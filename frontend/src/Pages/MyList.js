import { useCookies } from 'react-cookie';
import { getProfile, getListData , addLocationList, addList, deleteList, deleteLocationList, getSetShareableLink } from '../apis/profiles';
import { getLocation } from '../apis/locations'
import {useState,useEffect} from "react"
import NotLoggedIn from '../components/NotLoggedIn';
import ShareList from '../components/ShareList';
import './MyList.css'
import { DropdownButton, Dropdown, Button, Alert } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import TopMyList from '../components/TopMyList';
import BottomMyList from '../components/BottomMyList';

function MyList(props){

    const user = props.parentUser
    const setUser = props.parentSetUser 
    const [cookies,setCookie] = useCookies(['token']);
    const [dataList,setList] = useState()
    const [selectedList, selectList] = useState()
    const [allLocation, setAllLocation] = useState()
    const [showSaveListError, setSaveListError] = useState(false)
    const [showSaveListSuccess, setSaveListSuccess] = useState(false)
    const existsCookie = typeof cookies.token != "undefined"
    const parentData = useLocation()
    const [showShareList, setShareListModal] = useState(false)
    const [shareLink, setShareLink] = useState("")
    
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
    
    function MyListRender(){
            if (existsCookie) {
                return (
                    <div id = "myListWrapper">

                        <div>
                            <TopMyList cookies = {cookies} setList = {setList} dataList = {dataList} allLocation = {allLocation} selectList = {selectList} selectedList = {selectedList} shareLink = {shareLink} setShareLink = {setShareLink} showShareList = {showShareList} setShareListModal = {setShareListModal} shareList = {shareList}/>
                        </div>
                        <div>
                            <BottomMyList cookies = {cookies} setList = {setList} dataList = {dataList} allLocation = {allLocation} selectList = {selectList} selectedList = {selectedList} shareLink = {shareLink} setShareLink = {setShareLink} showShareList = {showShareList} setShareListModal = {setShareListModal} shareList = {shareList}/>
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