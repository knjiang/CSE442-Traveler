import React, {useContext} from "react";
import{ListGroup,ListGroupItem,Button} from "react-bootstrap";
import{ForumContext} from "./ForumState";

const ForumContent = () =>{
    const{ users, removePost} = useContext(ForumContext);
    console.log(users)
    return(
        <ListGroup className="mt-4">
            {users.map(user => (
                <ListGroupItem className="d-flex" variant="primary">
                <strong>{user.name}</strong>
                <div className="m-lg-auto">
                    <Button onClick={() => removePost(user.id)} variant="danger">Delete</Button>
                </div>
            </ListGroupItem>
            ))}
        </ListGroup>
    )


}

export default ForumContent;