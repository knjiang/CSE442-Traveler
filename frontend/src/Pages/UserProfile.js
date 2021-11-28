import { useCookies } from 'react-cookie';
import { changeBackground, changeVisited } from '../apis/profiles';
import { useState, useEffect } from "react"
import NotLoggedIn from '../components/NotLoggedIn';
import { useTextInput } from '../hooks/text-input';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import BottomVisited from '../components/BottomVisited';

function UserProfile(props) {

  const user = props.parentUser
  const setUser = props.parentSetUser
  const [cookies, setCookie] = useCookies(['token']);
  const [dataList, setList] = useState()
  const existsCookie = typeof cookies.token != "undefined"
  const parentData = useLocation()
  const [selectedList, selectList] = useState()
  const [allLocation, setAllLocation] = useState()
  const [showShareList, setShareListModal] = useState(false)

  const [isInEditMode, setIsInEditMode] = useState(false)

  const returnNormal = () => {
    return (
      <div>
        <h1 style={{ textAlign: 'center', color: (214, 122, 127) }}>Welcome {user.name} </h1>
        <br />
        <a href = '/edit-profile'><Button id = "navButtonOn" variant="outline-dark"><h1 id = "buttonText"> Edit Profile </h1></Button></a>

        <br />

        <h5 style={{ textAlign: 'center', textDecoration: 'underline' }}> About Me</h5>
        <div style={{ textAlign: 'center' }}>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            <li>Name: {user.name}</li>
            <li>Email: {user.email} </li>
            <li>Location: {user.from_location}</li>
          </ul>
        </div>

        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>To edit profile please click "Edit Profile"</p>

        <h5 style={{ textAlign: 'center', textDecoration: 'underline' }}>Background and Interests</h5>
        <p style={{ textAlign: 'center' }}>{user.background}</p>

        <h5 style={{ textAlign: 'center', textDecoration: 'underline' }}>Recommendations based on Favorites</h5>
        <p style={{ textAlign: 'center' }}>{user.visited}</p>

        <h5 style={{ textAlign: 'center', textDecoration: 'underline' }}>Some of my favorite places: </h5>

      </div>
    )
  }


  if (existsCookie) {
    return (
      <div>
          {returnNormal()}
      </div>

    )
  } return <NotLoggedIn />
}
export default UserProfile;