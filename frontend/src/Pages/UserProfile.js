import './UserProfile.css'
import traveler from './images/traveler.jpg';
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react"
import { useCookies } from 'react-cookie';
import { getProfile } from '../apis/profiles';

function UserProfile () {


  const [cookies, setCookie, removeCookie] = useCookies(['token']);


  const [user,setUser] = useState({
    logged_in : false,
    name: "None",
    email: "None",
    from_location: "",
    search_query: '',
  })


  useEffect(() => {
    if (cookies.token && !user.logged_in){
      getProfile(cookies.token)
      .then(response => response.json())
      .then(data => {
        if (!data.detail){
          setUser({
            logged_in: true,
            name: data.first_name,
            email: data.email,
            from_location: data.from_location
          })
        }
      })
    }
  })

  return (
      <div>
        <NavBar parentUser = {user} parentSetUser = {setUser}/>
      <h1>My Profile</h1>
      <div>
        <img src={traveler} alt="Traveler Pic"></img>
      </div>
      <div>
        <h3>Background Information</h3>
        <p>Hello, my name is John Doe and I have been traveling the world for a 
          few years now and I absolutely love it. My goal is to vist 20 different 
          countries in the upcoming few years of my life.
        </p>
      </div>
      <div>
        <h3>Interests and Hobbies</h3>
        <p>I am a big outdoors person. I love hiking, camping, and fishing. I want to
          be able to try different foods and learn new customs. I love learning new 
          languages as well so I can communicate with more people along the way
        </p>
      </div>
      <div>
        <h3>About Me</h3>
        <p>
          Name: John Doe <br/>
          Age: 24 <br/>
          Email: jdoe@gamil.com <br/>
          Languages: English, French, Spanish
        </p>
      </div>
    </div>
  );
}

export default UserProfile