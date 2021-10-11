import React, {useContext, useState} from 'react'
import{ForumContext} from "./ForumState";
import {Button, Form, FormControl, FormGroup, InputGroup} from "react-bootstrap";
import {useHistory} from "react-router";

const ForumPost = () =>{
        const[title, setTitle] = useState('')
        const{ addPost } = useContext(ForumContext);
        const history = useHistory();

        const SubmitPost = event =>{
            history.push('/forum');
            const newPost = {
                id : 4,
                names: 'Post 4'
            }
            //addPost(newPost);
        }

        const onChange = (e) => {
            setTitle(e.target.value)
        }

        return(
        <Form onSubmit = {SubmitPost}>
            <FormGroup>
                <h1 for="adding posts">Add Post</h1>

                <InputGroup size="lg">
                    <InputGroup.Text id="inputGroup-sizing-lg" value={title} onChange={onChange}>Post Title</InputGroup.Text>
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>

                <InputGroup>
                <InputGroup.Text>Body</InputGroup.Text>
                <FormControl as="textarea" aria-label="With textarea" />
                </InputGroup>

            </FormGroup>
            <Button type= "submit" variant="primary" >Submit</Button>
            <Button variant="danger" type='reset'> Clear Text</Button>
        </Form>
    )
}

export default ForumPost;