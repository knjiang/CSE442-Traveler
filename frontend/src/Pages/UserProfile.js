import { useCookies } from 'react-cookie';
import { changeBackground, changeVisited, getListData, getSetShareableLink} from '../apis/profiles';
import { getLocation } from '../apis/locations'
import { useState, useEffect } from "react"
import NotLoggedIn from '../components/NotLoggedIn';
import { useTextInput } from '../hooks/text-input';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import BottomVisited from '../components/BottomVisited';
import { getShareableContents } from "../apis/locations"
import './UserProfile.css'


function UserProfile(props) {

  const user = props.parentUser
  const setUser = props.parentSetUser
  const [cookies, setCookie] = useCookies(['token']);
  const existsCookie = typeof cookies.token != "undefined"



  const [dataList, setList] = useState()
  const parentData = useLocation()
  const [selectedList, selectList] = useState()
  const [showShareList, setShareListModal] = useState(false)

  const [allLocation, setAllLocation] = useState()


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
    if(parentData.state && dataList){
      selectList(parentData.state)
      parentData.state = false
    }
  }, [dataList])


  const returnName = () => {
    let res = [<p></p>]
    if(user.displayName == ""){
      res = [<p style = {{display: 'inline-block', margin: '0px', padding: '0px'}}>{user.name}</p>]
    }else {
      res = [<p style = {{display: 'inline-block', margin: '0px', padding: '0px'}}>{user.displayName}</p>]
    }
    return(res)
  }

  const returnLocation = () => {
    let res = [<p></p>]
    if(user.profileLocation == ""){
      res = [<p style = {{display: 'inline-block'}}>{user.from_location}</p>]
    }else {
      res = [<p style = {{display:'inline-block', whiteSpace: 'nowrap'}}>{user.profileLocation}</p>]
    }
    return(res)
  }
  

  const returnNormal = () => {
    return (
      <div>
        <h1 style={{ textAlign: 'center', color: (214, 122, 127) }}>Welcome, {returnName()}</h1>

        <br />
        <a href = '/edit-profile'><Button id = "navButtonOn" variant="outline-dark"><h1 id = "buttonText"> Edit Profile </h1></Button></a>

        <br />

        <h5 style={{ textAlign: 'center', textDecoration: 'underline' }}> About Me</h5>
        <div style={{ textAlign: 'center', whiteSpace: 'nowrap'}}>
          <ul style={{ textAlign: 'left', display: 'inline-block', whiteSpace: 'nowrap' }}>
            <li>Name: {returnName()}</li>

            <li>Email: {user.email} </li>
            <li>Location: {returnLocation()}</li>
          </ul>
        </div>

        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>To edit profile please click "Edit Profile"</p>

        <h5 style={{ textAlign: 'center', textDecoration: 'underline' }}>Background and Interests</h5>
        <p style={{ textAlign: 'center' }}>{user.background}</p>

        <h5 style={{ textAlign: 'center', textDecoration: 'underline' }}>Recommendations based on Favorites</h5>
        <p style={{ textAlign: 'center' }}>{user.visited}</p>

        <h5 style={{ textAlign: 'center' }}>Click "Favorite Locations" to show favorite countries</h5>

        <div style={{textAlign: 'center'}}>
        <BottomVisited cookies={cookies} setList={setList} dataList={dataList} allLocation={allLocation} selectList={selectList}
           selectedList={selectedList} setShareListModal={setShareListModal} />

        </div>


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