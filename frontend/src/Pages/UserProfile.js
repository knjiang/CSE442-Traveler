import { useCookies } from 'react-cookie';
import { changeBackground, changeVisited, getListData, getSetShareableLink } from '../apis/profiles';
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


  const returnName = () => {
    let res = [<p></p>]
    if (user.displayName == "") {
      res = [<p style={{ display: 'inline-block', margin: '0px', padding: '0px' }}>{user.name}</p>]
    } else {
      res = [<p style={{ display: 'inline-block', margin: '0px', padding: '0px' }}>{user.displayName}</p>]
    }
    return (res)
  }

  const returnLocation = () => {
    let res = [<p></p>]
    if (user.profileLocation == "") {
      res = [<p style={{ display: 'inline-block' }}>{user.from_location}</p>]
    } else {
      res = [<p style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>{user.profileLocation}</p>]
    }
    return (res)
  }


  const returnNormal = () => {
    return (
      <div>
        <h1 style={{ textAlign: 'center', color: 'rgb(23, 23, 68)', textDecoration: 'bold' }}>Welcome, {returnName()}</h1>
        <br />

        <a href='/edit-profile'><Button id="editButton" variant="outline-dark"><h1 id="buttonText"> Edit Profile </h1></Button></a>
        <br/>
        <br/>
        <a href='/my-tags'><Button id="editButton" variant="outline-dark"><h1 id="buttonText"> My Tags </h1></Button></a>

        <p style={{
          textAlign: 'center', fontStyle: 'italic', fontSize: '2vh', border: 'dotted', justifyContent: 'center',
          alignItems: 'center', width: '400px', marginLeft: '27%', borderRadius: '5px', display: 'inline'
        }}>To edit profile please click "Edit Profile"</p>

        <div style={{ border: 'solid', borderRadius: '10px', width: '800px', margin: 'auto', paddingTop: '20px', backgroundColor: 'rgb(23, 23, 68)', color: 'white' }}>






          <h3 id="heading"> About Me</h3>

          <div style={{ textAlign: 'center' }}>
            <ul style={{ textAlign: 'left', display: 'inline-block', whiteSpace: 'nowrap', fontSize: '2.2vh', listStyle: 'none' }}>

              <li style={{ fontWeight: 'bold', display: 'inline' }}>Name: </li>
              <p style={{ display: 'inline' }}>{returnName()}</p>
              <br />
              <li style={{ fontWeight: 'bold', display: 'inline' }}>Email: </li>
              <p style={{ display: 'inline' }}>{user.email}</p>
              <br />
              <li style={{ fontWeight: 'bold', display: 'inline' }}>Location: </li>
              <p style={{ display: 'inline' }}>{returnLocation()}</p>


            </ul>
          </div>


          <h3 id="heading">Background/Interests</h3>
          <p id="description" style={{ color: 'white' }}>{user.background}</p>

          <h3 id="heading">Travel Recommendations</h3>
          <p id="description">{user.visited}</p>

          <br />

        </div>

        <br />



        <div style={{ textAlign: 'center' }}>
          <BottomVisited cookies={cookies} setList={setList} dataList={dataList} allLocation={allLocation} selectList={selectList}
            selectedList={selectedList} setShareListModal={setShareListModal} />
        </div>
        <br />
        <br />
        <br />

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