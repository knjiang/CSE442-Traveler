import {useState,useEffect} from "react"
import {getShareableContents} from "../apis/locations"
import {getDescription, addListComment, getListComment} from "../apis/profiles"
import { useCookies } from "react-cookie"

function SharedListPage(props){
    const [title, setTitle] = useState(false)
    const [author, setAuthor] = useState("")
    const [dataList,setDataList] = useState([])
    const [descriptions,setDescriptions] = useState(false)
    const [cookies,setCookie] = useCookies(['token']);
    const [text,setText] = useState('')
    const [comments, setComments] = useState([])
    const primary_user = props.parentUser
    const setPrimaryUser = props.parentSetUser 

    useEffect(() => {
        const pathname = window.location.pathname.substr(7)

        getListComment(pathname)
            .then(response => response.json())
            .then(data => {
                setComments(data.list_comments)
            })
        
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

    const handleSubmit = (e) => {
            e.preventDefault()
            const pathname = window.location.pathname.substr(7)
            addListComment(cookies.token, text, pathname)
    }

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

        <div>
        <form onSubmit={handleSubmit}>
            <input
              method="post"
              type='text'
              placeholder="Add a comment"
              maxLength='100'
              onChange={e => setText(e.target.value)}
            />
            <button type='submit'>Post comment</button>
          </form>
        </div>

        <h1 style = {{fontSize: "3vh"}}> Comments: </h1>
        <ul>
                    {comments.map((c) => 
                        <li>
                            {c[0]} - {c[1]}
                        </li>
                    )}
        </ul>
        <br/>
        {returnLocations()}
        
        </div>
    )
}

export default SharedListPage;