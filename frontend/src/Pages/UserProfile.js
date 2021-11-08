import { useCookies } from 'react-cookie';
import { changeBackground, changeVisited } from '../apis/profiles';
import { getProfile, getListData , addLocationList, addList, deleteList, deleteLocationList, getSetShareableLink } from '../apis/profiles';
import { useState, useEffect } from "react"
import NotLoggedIn from '../components/NotLoggedIn';
import { useTextInput } from '../hooks/text-input';
import { getShareableContents } from "../apis/locations"
import { getLocation } from '../apis/locations'
import { useLocation } from 'react-router-dom';
import { DropdownButton, Dropdown, Button, Alert } from 'react-bootstrap'
import BottomVisted from '../components/BottomVisited';
import ShareList from '../components/ShareList';

function UserProfile(props) {

  const user = props.parentUser
  const setUser = props.parentSetUser 
  const [cookies,setCookie] = useCookies(['token']);
  const [dataList,setList] = useState()
  const existsCookie = typeof cookies.token != "undefined"
  const parentData = useLocation()
  const [selectedList, selectList] = useState()
  const [allLocation, setAllLocation] = useState()
  const [showSaveListError, setSaveListError] = useState(false)
  const [showSaveListSuccess, setSaveListSuccess] = useState(false)
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


const returnListName = () => {
    if (typeof dataList != 'undefined'){
        let res = [<div style = {{"borderBottom": "2px solid gray", "display":"flex"}}><h1 style = {{"fontSize": "4vh", "paddingBottom": "1vh", "paddingTop": "1vh", "marginLeft": "auto", "marginRight": "auto"}}>Your Lists </h1></div>]
        for (let name of Object.keys(dataList)){
            if (name == selectedList){
                res.push(<h1 id = "nameTextSelected" onClick = {() => (selectList(name))}>{name} <Button variant="secondary" id = "shareBTN" onClick = {(evt) => (evt.stopPropagation(),shareList(name))}> Share </Button> </h1>)
            }
            else {
                res.push(<h1 id = "nameText" onClick = {() => (selectList(name))}>{name} <Button variant="secondary" id = "shareBTN" onClick = {(evt) => (evt.stopPropagation(),shareList(name))}> Share </Button></h1>)
            }

        }
        return(res)
    }
}


  // const [cookies, setCookie] = useCookies(['token']);

  /*const [dataList, setList] = useState({
    lists: []
  })*/
  // const [countryList, setCountryList] = useState("")
  const [visitedCounttries, setVisitedCountries] = useState("")

  const { value: backgroundInfo, bind: backgroundInfoBind, reset: resetBackgroundInfo } = useTextInput('')
  const { value: visitedInfo, bind: visitedInfoBind, reset: resetVisitedInfo } = useTextInput('')


  // const user = props.parentUser
  // const setUser = props.parentSetUser 
  //  const existsCookie = typeof cookies.token != "undefined"

<<<<<<< HEAD
  useEffect(() => {
    if (existsCookie) {
      getProfile(cookies.token)
        .then(response => response.json())
        .then(data => {
          if (!data.detail) {
            setUser({
              logged_in: true,
              name: data.first_name,
              email: data.email,
              from_location: data.from_location,
              background: data.background,
              visited: data.visited
            });
          }
        });
    }
  }, [])

=======
>>>>>>> 7b4278112ef7964e319c25cc66f3b11801cd726f
  const handleSubmit = (e) => {
    e.preventDefault()
    changeBackground(cookies.token, backgroundInfo)
    e.background = backgroundInfo // does not work
    user.background = backgroundInfo // does not work
    // window.location.reload()
  }

  const handleSubmit2 = (b) => {
    b.preventDefault()
    changeVisited(cookies.token, visitedInfo)
    // window.location.reload()
  }

  useEffect(() => {
    const pathname = window.location.pathname.substr(7)
    console.log(pathname)
    getShareableContents(pathname)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // setDataList(data.locations)
        setVisitedCountries(data.visitedCounttries)
      })
  }, [])


  if (existsCookie) {
    return (
      <div>
        <h1 style={{ textAlign: 'center', color: (214, 122, 127) }}>Welcome {user.name} </h1>
        <br />

        <h5 style={{ textAlign: 'center', textDecoration: 'underline'}}> About Me</h5>
        <div style = {{ textAlign: 'center'}}>
        <ul style = {{ textAlign: 'left', display: 'inline-block'}}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email} </li>
          <li>Location: {user.from_location}</li>
        </ul>
        </div>

        <p style={{textAlign: 'center' , fontStyle: 'italic'}}>For the following text fields, please enter the information you want to display and press Submit <br />
        "Refresh Browser to see changes applied"</p>
      
        {/* This is for background */}
        <h5 style={{ textAlign: 'center', textDecoration: 'underline'}}>Background and Interests</h5>
        <p style={{ textAlign: 'center' }}>{user.background}</p>
        <form onSubmit={(e) => handleSubmit(e)} style={{ textAlign: 'center' }}>
          <label>
            <br />
            <p>Change Background: <input type="text" {...backgroundInfoBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p style={{ textAlign: 'center' }}>{backgroundInfo}</p>

        {/* This is for Recommendations for favorite countries */}
        <h5 style={{ textAlign: 'center', textDecoration: 'underline' }}>Recommendations based on Favorites</h5>
        <p style={{ textAlign: 'center' }}>{user.visited}</p>

        <form onSubmit={(b) => handleSubmit2(b)} style={{ textAlign: 'center' }}>
          <label>
            {/*<h5 style={{ textAlign: 'center' }}>My Recommendations for Favorite Locations</h5>*/}
            <p>Recommendations: <input type="text" {...visitedInfoBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>

        <p style={{ textAlign: 'center' }}>{visitedInfo}</p>

        {/* Display the visited countries*/}

        <h5 style = {{ textAlign: 'center', textDecoration: 'underline'}}>Some of my favorite places: </h5>
        <div style = {{textAlign: 'center'}}>
          <BottomVisted cookies={cookies} setList={setList} dataList={dataList} allLocation={allLocation} selectList={selectList}
           selectedList={selectedList} shareLink={shareLink} setShareLink={setShareLink} showShareList={showShareList}
            setShareListModal={setShareListModal} shareList={shareList} />

        </div>
        <ShareList show={showShareList} link={shareLink} callback={callbackShareList} />
      </div>
    )
  }
  return <NotLoggedIn />
}
export default UserProfile;