import React, {useState, useEffect} from 'react'
import {Button, Form, FormControl, FormGroup, InputGroup, DropdownButton, Dropdown, Alert} from "react-bootstrap";
import {useHistory, useLocation} from "react-router";
import {getLocation} from "../apis/locations"
import {AddPost} from "../apis/forums"
import { useCookies } from 'react-cookie';
import { getProfile } from '../apis/profiles';

const ForumPost = () =>{
        const[title, setTitle] = useState('')
        const history = useHistory();
        const [cookies,setCookie] = useCookies(['token']);
        const onChange = (e) => {
            setTitle(e.target.value)
        }

        const [allLists, setList] = useState()

        const [selectedLocation, setSelectedLocation] = useState('Select your location')
        const [showAlertE, setAlertError] = useState(false); // For error alert

        const [country,setCountry] = useState(false)
        let a = useLocation()
    

        const SubmitPost = event =>{ //submit post need to pass in post details
            event.preventDefault()         
            if(//selectedLocation != "Select your location" && 
                document.getElementById('titleText').value != ""
            && document.getElementById('bodyText').value != ""){
                AddPost(cookies.token, document.getElementById('titleText').value ,
                document.getElementById('bodyText').value, country)
                history.push('/forum/' + country)
            }
            else{setAlertError(true)}
        }

        const [user,setUser] = useState({
            logged_in : false,
            name: "None",
            email: "None",
            from_location: "",
          })

        useEffect (() => {
            if(a.state){
                setCountry(a.state.country)
            }
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
            // getLocation()
            // .then(response => response.json())
            // .then(data => {
            //   if(data){
            //     setList(data.map(({id, name}) => name))
            //   }
            // })
        }, []) // if its empty it only renders once

        const listDropdown = () => {
            if (allLists) {
                return (
                    <DropdownButton title= {selectedLocation} style = {{marginRight: "auto"}}>
                        <div style = {{maxHeight: "40vh", overflow: "auto"}}>
                        {allLists.map((locations, index) => (
                            <Dropdown.Item onClick = {() => setSelectedLocation(locations)}>{locations}</Dropdown.Item>
                        ))}
                        </div>

                    </DropdownButton>
                )
            }
            else {
                return (
                    <DropdownButton title="Choose your location">
                    </DropdownButton>
                )
            }
        }


        return(
        <Form onSubmit = {SubmitPost}>
            <FormGroup>
                <h1 for="adding posts">Add Post for {country}</h1>

                <InputGroup size="lg">
                    <InputGroup.Text id="inputGroup-sizing-lg" value={title} onChange={onChange}>Post Title</InputGroup.Text>
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" id = "titleText"/>
                </InputGroup>

                <InputGroup>
                <InputGroup.Text>Body</InputGroup.Text>
                <FormControl  as="textarea" aria-label="With textarea" id = "bodyText"/>
                </InputGroup>
                <div style = {{display: "flex", justifyContent: "end", marginTop: "2vh"}}>
                    {/* {listDropdown()} */}
                    <Button type= "submit" variant="primary" onClick = {() => SubmitPost}>Submit</Button>
                    <Button variant="danger" type='reset'> Clear Text</Button>
                </div>

            </FormGroup>


            <Alert show={showAlertE} variant="danger" onClose={() => setAlertError(false)} dismissible>
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>
                    Please fill in the blanks and choose a location
                    </p>
                </Alert>
        </Form>
    )
}

export default ForumPost;