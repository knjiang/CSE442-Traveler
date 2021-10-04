import React from "react";
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const AddPost = () => {
    return(
        <Form>
            <button id="forumButton" title="forum button"><a href = "/forum"> Forum Button </a></button>
            <FormGroup>
                <Label for="adding posts">AddPost</Label>
                <Input type="text" placeholder="Enter Post Title"/>
            </FormGroup>
            <Button type ="Submit">Submit</Button>
        </Form>
        // i plan to change this to hooks as i have not yet learned hooks at the time this is just
        // a temporary way of creating a post -frank yang
    )
}

export default AddPost;