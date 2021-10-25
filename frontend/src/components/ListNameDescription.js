import { useEffect,useState } from "react";
import { useCookies } from "react-cookie";
import {Button,Popover,OverlayTrigger} from "react-bootstrap"
import { getDescription } from "../apis/profiles";

function ListNameDescription(props){
    const user = props.parentUser
    const setUser = props.parentSetUser
    const dataList = props.dataList
    const selectedList = props.selectedList
    const selectList = props.selectList
    const shareList = props.shareList
    const refreshList = props.refreshList
    const cookies = props.cookies

    const[usePopover,setPopover] = useState()
    
    const displayDescription = (name) => {
        getDescription(cookies.token, name)
        .then(res => res)
        .then(data => {
            console.log(data)
        })
        
    }
    
    
    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                text
            </Popover.Body>
        </Popover>
    );

    const returnListName = () => {
        let res = [<div style = {{"borderBottom": "2px solid gray", "display":"flex"}}><h1 style = {{"fontSize": "4vh", "paddingBottom": "1vh", "paddingTop": "1vh", "marginLeft": "auto", "marginRight": "auto"}}>Your Lists </h1></div>]
        for (let name of Object.keys(dataList)){
            if (name == selectedList){
                let returned = (
                    <div>
                        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                            <Button variant="success" onClick={() => displayDescription(name)}>Click me to see ListDescription</Button>
                        </OverlayTrigger>
                        <h1 id = "nameTextSelected" onClick = {() => (selectList(name), refreshList())}>{name} <Button variant="secondary" style={{"float":"right", "margin-right" : "1rem"}} onClick = {(evt) => (evt.stopPropagation(),shareList(name))}> Share </Button> </h1>
                    </div>
                )
                res.push(returned)
            }
            else {
                res.push(<h1 id = "nameText" onClick = {() => (selectList(name), refreshList())}>{name} <Button variant="secondary" style={{"float":"right", "margin-right" : "1rem"}} onClick = {(evt) => (evt.stopPropagation(),shareList(name))}> Share </Button></h1>)
            }

        }
        return(res)
    }
    return(
        <div>
            {returnListName()}
        </div>
    )
}
export default ListNameDescription;