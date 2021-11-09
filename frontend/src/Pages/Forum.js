import {Link} from 'react-router-dom';
import {NavBar, Nav, NavbarBrand, Container} from "react-bootstrap";
import ForumContent from '../components/ForumContent'

function Forum(){

    return(
        <div style = {{display: "flex", justifyContent: "center", marginTop: "5vh"}}>
            <div>
            <ForumContent></ForumContent>
            </div>

        </div>
    )
}

export default Forum;