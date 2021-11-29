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

    var i = 0
    var limit = 0

    useEffect (() => {
        if (descriptions == undefined && selectedList) {
            getDescription(cookies.token, selectedList)
            .then(res => res.json())
            .then(data => {
                if (data["listDescriptions"].length < 1){
                    setShowDescriptions(true)
                }
                else {
                    setShowDescriptions(true)
                    setDescriptions(data["listDescriptions"])
                    
                }
            })
        }
    }, [descriptions, showDescriptions])


    const returnListName = () => {
        if (typeof dataList != 'undefined'){
            let res = [<div style = {{"borderBottom": "2px solid gray"}}></div>]
            for (let name of Object.keys(dataList)){


                if (name == "Favorite Countries" && limit < 4){
                    res.push(<h5 id = "favoriteClicked" style={{textAlign: 'center'}} onClick={() => (selectList(name))}>{name}</h5>)
                    i = 1
                    limit = limit + 1
                }



            }
            if(i == 0){
                res = [<div style = {{"borderBottom": "2px solid gray"}}>User has no "Favorite Countries" list in 'My Lists'</div>]
            }
            return(res)
        }
    }


    const returnListData = () => {
        let res = []
        for (let n of dataList[selectedList]){
            res.push(
            <div>
                <a id = "actualLocations" href = {'/locations/' + n.replace(/ /g, '-')}>
                    <h1 style={{ fontSize: 30,}} href = {'/locations/' + n.replace(/ /g, '-')}>{n}</h1>
                    </a>

            </div>)
        }
        return(<div>{res}</div>)
    }


    const showDescriptionTrue = () => {
        return (
            <div>
                <h3 style = {{fontSize: "2vh", textAlign: 'center'}}>{descriptions}</h3>
            </div>
    
        )
    }

    return (
        <div id="finalDisplay">

            <div id="LocationsButton">
                {returnListName()}
            </div>

            <div id="actualLocations">
                <div>
                {selectedList && returnListData()}
                </div>
                <div>
                {descriptions}
                </div>
            </div>

        </div>
    )
}
export default BottomMyList;