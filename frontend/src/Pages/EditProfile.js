import { useCookies } from 'react-cookie';
import { changeBackground, changeVisited, changeName, changeProfileLocation } from '../apis/profiles';
import { useState, useEffect } from "react";
import NotLoggedIn from '../components/NotLoggedIn';
import { useTextInput } from '../hooks/text-input';
import { Button } from 'react-bootstrap';
function EditProfile(props) {

  const user = props.parentUser
  const setUser = props.parentSetUser
  const [cookies, setCookie] = useCookies(['token']);
  const existsCookie = typeof cookies.token != "undefined"

  const { value: nameInfo, bind: nameBind, reset: resetNameBind } = useTextInput('')
  const { value: locationInfo, bind: locationBind, reset: resetLocationBind } = useTextInput('')
  const { value: backgroundInfo, bind: backgroundInfoBind, reset: resetBackgroundInfo } = useTextInput('')
  const { value: recommendInfo, bind: recommendInfoBind, reset: resetRecommendInfo } = useTextInput('')

  const handleBackground = (e) => {
    e.preventDefault()
    changeBackground(cookies.token, backgroundInfo)
    setUser(prevState => ({ ...prevState, background: backgroundInfo }))
  }

  const handleRecommended = (e) => {
    e.preventDefault()
    changeVisited(cookies.token, recommendInfo)
    setUser(prevState => ({ ...prevState, visited: recommendInfo }))
  }

  const handleName = (e) => {
    e.preventDefault()
    changeName(cookies.token, nameInfo)
    setUser(prevState => ({ ...prevState, displayName: nameInfo }))
  }

  const handleLocation = (e) => {
    e.preventDefault()
    changeProfileLocation(cookies.token, locationInfo)
    setUser(prevState => ({ ...prevState, profileLocation: locationInfo }))
  }

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
      res = [<p style = {{display: 'inline-block', margin: '0px', padding: '0px'}}>{user.from_location}</p>]
    }else {
      res = [<p style = {{display:'inline-block', margin: '0px', padding: '0px'}}>{user.profileLocation}</p>]
    }
    return(res)
  }


  const returnEditMode = () => {
    return (
      <div>
        <h1 style={{ textAlign: 'center', color: (214, 122, 127) }}>Edit Your Profile</h1>
        <br />
        <a href='/my-profile'><Button id="editButton" variant="outline-dark"><h1 id="buttonText">Done Editing</h1></Button></a>

        <div style = {{border: 'solid', borderRadius: '10px', width: '900px', margin: 'auto', paddingTop: '20px', backgroundColor: '#084298', color: 'white'}}>

        <h5 style={{ textAlign: 'center' }}> About Me</h5>
        <div style={{ textAlign: 'center' }}>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            <li style = {{fontSize: '25'}}>Name: {returnName()}</li>
            <li>Email: {user.email} </li>
            <li>Location: {returnLocation()}</li>
          </ul>
        </div>


        <h5 style={{ textAlign: 'center' , color: 'white'}}>Current Name</h5>
        <h5 style={{ textAlign: 'center', color: 'rgb(23, 23, 68)' , textDecoration: 'bold', color: 'white'}}>"{returnName()}"</h5>

        <form onSubmit={(e) => handleName(e)} style={{ textAlign: 'center' }}>
          <label>
            <p style={{textAlign: 'left', marginLeft: 'auto'}}>New Name: <input type="text" {...nameBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>



        <h5 style={{ textAlign: 'center' , color: 'white'}}>Current Location</h5>
        <h5 style={{ textAlign: 'center', color: 'rgb(23, 23, 68)', textDecoration: 'bold' , color: 'white'}}>"{returnLocation()}"</h5>

        <form onSubmit={(e) => handleLocation(e)} style={{ textAlign: 'center' }}>
          <label>
            <p style={{textAlign: 'left', margin: 'auto'}}>New Location: <input type="text" {...locationBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>


        <h5 style={{ textAlign: 'center', marginLeft:'300px', marginRight: '300px', marginTop: '0px'}}>Background and Interests</h5>
        <h5 style={{ textAlign: 'center', marginLeft:'300px', marginRight: '300px' ,color:'rgb(23, 23, 68)', textDecoration: 'bold', color: 'white'}}>{user.background}</h5>
        <form onSubmit={(e) => handleBackground(e)} style={{ textAlign: 'center' }}>
          <label>
            <p style={{textAlign: 'left', marginLeft: 'auto'}}>New Background: <input type="text" {...backgroundInfoBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>


        <h5 style={{textAlign: 'center', marginLeft:'300px', marginRight: '300px', marginTop: '0px'}}>Recommendations</h5>
        <h5 style={{ textAlign: 'center', marginLeft:'300px', marginRight: '300px' ,color:'rgb(23, 23, 68)', textDecoration: 'bold', color: 'white'}}>{user.visited}</h5>
        <form onSubmit={(b) => handleRecommended(b)} style={{ textAlign: 'center' }}>
          <label>
            {/*<h5 style={{ textAlign: 'center' }}>My Recommendations for Favorite Locations</h5>*/}
            <p style={{textAlign: 'left', marginLeft: 'auto'}}>New Recommendations: <input type="text" {...recommendInfoBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>

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
        {returnEditMode()}
      </div>

    )
  } return <NotLoggedIn />
}
export default EditProfile;