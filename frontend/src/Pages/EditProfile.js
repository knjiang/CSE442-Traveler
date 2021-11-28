import { useCookies } from 'react-cookie';
import { changeBackground, changeVisited, changeName, changeEmail } from '../apis/profiles';
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
  const { value: emailInfo, bind: emailBind, reset: resetEmailBind } = useTextInput('')
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
    setUser(prevState => ({ ...prevState, name: nameInfo }))
  }

  const handleEmail = (e) => {
    e.preventDefault()
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
            <li>Name: {user.name}</li>
            <li>Email: {user.email} </li>
            <li>Location: {user.from_location}</li>
          </ul>
        </div>


        <h5 style={{ textAlign: 'center' }}>Name: {user.name}</h5>
        <form onSubmit={(e) => handleName(e)} style={{ textAlign: 'center' }}>
          <label>
            <p>Change Name: <input type="text" {...nameBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <br />



        <h5 style={{ textAlign: 'center' }}>Email: {user.email} </h5>
        <form onSubmit={(e) => handleEmail(e)} style={{ textAlign: 'center' }}>
          <label>
            <p>Change Email: <input type="text" {...emailBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <br />


        <h5 style={{ textAlign: 'center' }}>Background and Interests: {user.background}</h5>
        <form onSubmit={(e) => handleBackground(e)} style={{ textAlign: 'center' }}>
          <label>
            <p>Change Background: <input type="text" {...backgroundInfoBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>


        <h5 style={{ textAlign: 'center' }}>Recommendations based on Favorites: {user.visited}</h5>
        <form onSubmit={(b) => handleRecommended(b)} style={{ textAlign: 'center' }}>
          <label>
            {/*<h5 style={{ textAlign: 'center' }}>My Recommendations for Favorite Locations</h5>*/}
            <p>Recommendations: <input type="text" {...recommendInfoBind} /></p>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p style={{ textAlign: 'center' }}>{recommendInfo}</p>
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