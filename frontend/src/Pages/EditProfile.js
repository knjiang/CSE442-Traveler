import { useCookies } from 'react-cookie';
import { changeBackground, changeName, changeVisited } from '../apis/profiles';
import { getProfile, getListData, addLocationList, addList, deleteList, deleteLocationList, getSetShareableLink, changeUserName, changeEmail } from '../apis/profiles';
import { useState, useEffect } from "react"
import NotLoggedIn from '../components/NotLoggedIn';
import { useTextInput } from '../hooks/text-input';
import { getShareableContents } from "../apis/locations"
import { getLocation } from '../apis/locations'
import { useLocation } from 'react-router-dom';
import { DropdownButton, Dropdown, Button, Alert } from 'react-bootstrap'
import BottomVisited from '../components/BottomVisited';

function EditProfile(props) {

  const user = props.parentUser
  const setUser = props.parentSetUser
  const [cookies, setCookie] = useCookies(['token']);
  const [dataList, setList] = useState()
  const existsCookie = typeof cookies.token != "undefined"
  const parentData = useLocation()
  const [selectedList, selectList] = useState()
  const [allLocation, setAllLocation] = useState()
  const [showShareList, setShareListModal] = useState(false)
  const [shareLink, setShareLink] = useState("")

  const [isInEditMode, setIsInEditMode] = useState(false)

  useEffect(() => {
    if (existsCookie) {
      getListData(cookies.token)
        .then(response => response.json())
        .then(data => {
          setList(data["lists"])
        });
      getLocation()
        .then(response => response.json())
        .then(data => {
          if (data) {
            setAllLocation(data.map(({ id, name }) => name))
          }
        })
    }
  }, [])

  useEffect(() => {
    if (parentData.state && dataList) {
      selectList(parentData.state)
      parentData.state = false
    }
  }, [dataList])

  const callbackShareList = () => {
    setShareListModal(false)
  }

  const shareList = (name) => {
    getSetShareableLink(cookies.token, name)
      .then(response => response.json())
      .then(data => {
        setShareLink(data.url)
        setShareListModal(true)
      });
  }


  const returnListName = () => {
    if (typeof dataList != 'undefined') {
      let res = [<div style={{ "borderBottom": "2px solid gray", "display": "flex" }}><h1 style={{ "fontSize": "4vh", "paddingBottom": "1vh", "paddingTop": "1vh", "marginLeft": "auto", "marginRight": "auto" }}>Your Lists </h1></div>]
      for (let name of Object.keys(dataList)) {
        if (name == selectedList) {
          res.push(<h1 id="nameTextSelected" onClick={() => (selectList(name))}>{name} <Button variant="secondary" id="shareBTN" onClick={(evt) => (evt.stopPropagation(), shareList(name))}> Share </Button> </h1>)
        }
        else {
          res.push(<h1 id="nameText" onClick={() => (selectList(name))}>{name} <Button variant="secondary" id="shareBTN" onClick={(evt) => (evt.stopPropagation(), shareList(name))}> Share </Button></h1>)
        }

      }
      return (res)
    }
  }


  const { value: nameInfo, bind: nameBind, reset: resetNameBind } = useTextInput('')
  const { value: emailInfo, bind: emailBind, reset: resetEmailBind } = useTextInput('')
  const { value: backgroundInfo, bind: backgroundInfoBind, reset: resetBackgroundInfo } = useTextInput('')
  const { value: visitedInfo, bind: visitedInfoBind, reset: resetVisitedInfo } = useTextInput('')

  const handleSubmit = (e) => {
    e.preventDefault()
    changeBackground(cookies.token, backgroundInfo)
    setUser(prevState => ({ ...prevState, background: backgroundInfo }))
  }

  const handleSubmit2 = (b) => {
    b.preventDefault()
    changeVisited(cookies.token, visitedInfo)
    setUser(prevState => ({ ...prevState, visited: visitedInfo }))
  }

  const handleName = (c) => {
    c.preventDefault()
    changeName(cookies.token, nameInfo)
    setUser(prevState => ({ ...prevState, displayName: nameInfo }))
  }

  const handleEmail = (d) => {
    d.preventDefault()
    changeEmail(cookies.token, emailInfo)
    setUser(prevState => ({ ...prevState, email: emailInfo }))
  }




  const returnEditMode = () => {
    return (
      <div>
        <h1 style={{ textAlign: 'center', color: (214, 122, 127) }}>Edit Your Profile</h1>
        <br />

        <a href='/my-profile'><Button id="navButtonOn" variant="outline-dark"><h1 id="buttonText">Done Editing</h1></Button></a>

        <h5 style={{ textAlign: 'center', textDecoration: 'underline' }}> About Me</h5>
        <div style={{ textAlign: 'center' }}>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            <li>Email: {user.email} </li>
            <li>Location: {user.from_location}</li>
          </ul>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} style={{ textAlign: 'center' }}>
          <h5 style={{ textAlign: 'center', textDecoration: 'underline' }}>Name</h5>
          <p style={{ textAlign: 'center' }}>{user.displayName}</p>
        </form>


        <form onSubmit={(e) => handleName(e)} style={{ textAlign: 'center' }}>
          <label>
            <br />
            <p>Change Name: <input type="text" {...nameBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>


        <form onSubmit={(e) => handleEmail(e)} style={{ textAlign: 'center' }}>
          <label>
            <br />
            <p>Change Email: <input type="text" {...emailBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>


        <form onSubmit={(e) => handleSubmit(e)} style={{ textAlign: 'center' }}>
          <h5 style={{ textAlign: 'center', textDecoration: 'underline' }}>Background and Interests</h5>
          <p style={{ textAlign: 'center' }}>{user.background}</p>
        </form>

        <form onSubmit={(e) => handleSubmit(e)} style={{ textAlign: 'center' }}>
          <label>
            <p>Change Background: <input type="text" {...backgroundInfoBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>

        <p style={{ textAlign: 'center' }}>{backgroundInfo}</p>
        <h5 style={{ textAlign: 'center' }}>Recommendations based on Favorites</h5>
        <p style={{ textAlign: 'center' }}>{user.visited}</p>

        <form onSubmit={(b) => handleSubmit2(b)} style={{ textAlign: 'center' }}>
          <label>
            {/*<h5 style={{ textAlign: 'center' }}>My Recommendations for Favorite Locations</h5>*/}
            <p>Recommendations: <input type="text" {...visitedInfoBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>

        <p style={{ textAlign: 'center' }}>{visitedInfo}</p>
      </div>
    )
  }

  return (
    <div>
      {returnEditMode()}
    </div>
  )

}
export default EditProfile;