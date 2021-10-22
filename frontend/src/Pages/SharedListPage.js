import {useState,useEffect} from "react"
import {getShareableContents} from "../apis/locations"

function SharedListPage(){
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [dataList,setDataList] = useState([])

    useEffect(() => {
        const pathname = window.location.pathname.substr(7)
        console.log(pathname)
        getShareableContents(pathname)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setTitle(data.title)
            setAuthor(data.created_by)
            setDataList(data.locations)
        })
      }, [])

    const returnLocations = () => {
        let res = [<div style = {{"borderBottom": "2px solid gray", "display":"flex"}}><h2 style = {{"fontSize": "4vh", "paddingBottom": "1vh", "paddingTop": "1vh", "marginLeft": "auto", "marginRight": "auto"}}>Your Locations </h2></div>]
        for (let name of Object.values(dataList)){
            res.push(<p>{name}</p>)
        }
        return(res)
    }
    return(
        <div>
        <h1> {title} - by {author} </h1>
        {returnLocations()}
        </div>
    )
}

export default SharedListPage;