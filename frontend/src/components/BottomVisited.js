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

    const returnList = () => {
        let res = [<p></p>]

        let list = selectList("Favorite Countries")        

        limit = 5
        return(res)
    }


    const returnListName = () => {
        if (typeof dataList != 'undefined'){
            let res = [<div style = {{"borderBottom": "2px solid gray"}}></div>]


            //iterate through my list
            for (let name of Object.keys(dataList)){

                res.push(<p></p>)
                if (name == "Favorite Countries" && limit < 4){
                    res.push(<h5 id = "favoriteClicked" style={{textAlign: 'center'}} 
                    
                    onClick={() => (
                        returnList()
                        
                        )}>{"My Favorites"}</h5>)
                    i = 1
                }



            }
            if(i == 0){
                res = [<div style = {{"borderBottom": "2px solid gray"}}>User has no "Favorite Countries" list in 'My Lists'</div>]
            }
            return(res)
        }
    }


    const returnListData = () => {
        let res = [<ul style={{borderStyle: 'solid'}}></ul>]
        for (let n of dataList[selectedList]){

            if(limit < 5){

            res.push(
                <li style = {{textAlign: 'left', marginLeft: '35%', marginRight: '35%', borderStyle: 'outset', display: 'flex'}}>
                <a id = "actualLocations" href = {'/locations/' + n.replace(/ /g, '-')} style={{textAlign: 'left'}}>
                    <h1 style={{ fontSize: 25, display: 'inline', textAlign: 'right'}} href = {'/locations/' + n.replace(/ /g, '-')}>{n}</h1>
                    </a>
                </li>)

            ++limit
        }
        }
        return(<div>{res}</div>)
    }


    return (
        <div>

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