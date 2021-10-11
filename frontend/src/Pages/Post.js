import React from 'react'
import {Button, Form, FormControl, FormGroup, InputGroup} from "react-bootstrap";

const Post = () =>{
        return(
        <Form>
            <FormGroup>
                <h1 for="adding posts">Add Post</h1>
                <InputGroup size="lg">
                    <InputGroup.Text id="inputGroup-sizing-lg" >Post Title</InputGroup.Text>
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
                <InputGroup>
                <InputGroup.Text>Body</InputGroup.Text>
                <FormControl as="textarea" aria-label="With textarea" />
                </InputGroup>
            </FormGroup>
            <Button variant="primary" href="/forum">Submit</Button>
            <Button variant="danger" type='reset'> Clear Text</Button>
        </Form>
    )

}

export default Post;