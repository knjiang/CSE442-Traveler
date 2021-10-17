import {Link} from 'react-router-dom';
import {NavBar as bootstrapNav, Nav, NavbarBrand, Container} from "react-bootstrap";
import NavBar from '../components/NavBar'
import ForumContent from "./ForumContent";


function Forum(){

    return(
        <div>
        <div style={{maxWidth: "30rem", margin: "4rem auto"}}>
            <div id="Posts">
            <bootstrapNav bg="dark" variant="dark">
                <Container>
                    <bootstrapNav id="title1" href="/forum">Traveler Forum</bootstrapNav>
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