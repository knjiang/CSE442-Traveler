import {Link} from 'react-router-dom';
import {NavBar, Nav, NavbarBrand, Container} from "react-bootstrap";
import ForumContent from '../components/ForumContent'

function Forum(){

    return(
        <div>
        <div style={{maxWidth: "30rem", margin: "4rem auto"}}>
            <div id="Posts">
            <NavbarBrand bg="dark" variant="dark">
                <Container>
                    <NavbarBrand id="title1" href="/forum">Traveler Forum</NavbarBrand>
                    <Nav>
                            <Link className="btn btn-success" to="/post" >New Post</Link>
                    </Nav>
                </Container>

            </NavbarBrand>
        </div>
        <ForumContent></ForumContent>
        </div>
        </div>
    )
}

export default Forum;