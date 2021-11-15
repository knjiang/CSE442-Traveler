import {useState,useEffect} from "react"
import {getShareableContents} from "../apis/locations"
import {getDescription} from "../apis/profiles"
import { useCookies } from "react-cookie"

function SharedListPage(){
    const [title, setTitle] = useState(false)
    const [author, setAuthor] = useState("")
    const [dataList,setDataList] = useState([])
    const [descriptions,setDescriptions] = useState(false)
    const [cookies,setCookie] = useCookies(['token']);


    useEffect(() => {
        const pathname = window.location.pathname.substr(7)
        
        getShareableContents(pathname)
        .then(response => response.json())
        .then(data => {
            setTitle(data.title)
            setAuthor(data.created_by)
            setDataList(data.locations)
        })

      }, [])

      useEffect(() => {
        if(title){
            getDescription(cookies.token,title)
        
        .then(res => res.json())
        .then(data => {
            if (data["listDescriptions"].length < 1){
                setDescriptions("User has not written a description for this list")
            }
            else {

                setDescriptions(data["listDescriptions"])
            }
        })
        }
      })

    

    const returnLocations = () => {
        let res = [<div style = {{"borderBottom": "2px solid gray", "display":"flex"}}><h2 style = {{"fontSize": "4vh", "paddingBottom": "1vh", "paddingTop": "1vh", "marginLeft": "auto", "marginRight": "auto"}}>Locations in this list </h2></div>]
        for (let name of Object.values(dataList)){
            res.push(<p>{name}</p>)
        }
        return(res)
    }
    return(
        <div>
        <h1> {title} </h1>
        <h1 style = {{fontSize: "3vh"}}>Created by: {author} </h1>
        <h1 style={{"fontWeight":"500", "fontSize":"3vh"}}> Description: {descriptions} </h1>
        <h1 style = {{fontSize: "3vh"}}> Comments: </h1>
        {returnLocations()}
        
        </div>
    )
}

export default SharedListPage;