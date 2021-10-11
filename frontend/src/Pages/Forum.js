import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import {NavBar as boostrapNav, Nav, NavbarBrand, Container} from "react-bootstrap";
import NavBar from '../components/NavBar'
import ForumContent from "./ForumContent";
import { useCookies } from 'react-cookie';
import { getProfile } from '../apis/profiles';

function Forum(){

    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const [user,setUser] = useState({
      logged_in : false,
      name: "None",
      email: "None",
      from_location: "",
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

    return(
        <div>
        <NavBar parentUser = {user} parentSetUser = {setUser}/>
        <div style={{maxWidth: "30rem", margin: "4rem auto"}}>
            <div id="Posts">
            <bootstrapNav bg="dark" variant="dark">
                <Container>
                    <bootstrapNavBrand id="title1" href="/forum">Traveler Forum</bootstrapNavBrand>
                    <Nav>
                            <Link className="btn btn-success" to="/post" >New Post</Link>
                    </Nav>
                </Container>

            </bootstrapNav>
        </div>
            <button id="home" ><a href = "/"> Return to HomePage </a></button>
            <ForumContent></ForumContent>
        </div>
        </div>
    )
}

export default Forum;