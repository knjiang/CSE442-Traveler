import { Component } from "react"
import './Homepage.css'
import { Link , BrowserRouter as Router } from 'react-router-dom';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap'

class Homepage extends Component {

  constructor(props) {

    /*The locations state is currently containing placeholders until database is set up*/
    super(props);
    this.state = {
      local_locations: ['location_1', 'location_2'],
      backend_locations: [],
      typed_location: ''
    }; 

    this.location_submit = this.location_submit.bind(this)
  }
  
  componentDidMount() {
    
    fetch("http://localhost:8000/locations/")
    .then(response => response.json())
    .then(data => this.setState({backend_locations: JSON.stringify(data.map(value => value.name))}))
    
  } 

  location_submit(e) {
    e.preventDefault()
    //alert(this.state.typed_location)
    
    fetch("http://localhost:8000/locations/",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          "name": this.state.typed_location,
          "profile": 1
      })
    })
    .then(alert('Successfully added new location, please refresh page to see changes'))
    .catch(alert('Error, payload did not arrive'))
  }
  
  render(){
    return (
      <div>
          <h1>Welcome to the Traveler Homepage</h1>
          <div>
            <h1>Locations</h1>
            {/* 
              <div id = "For_All_Location">
                {this.state.locations.map((locations, index) => (
                    <div className = "Location_Boxes">
                      <Link className = "Location_Click" to = {'/locations/' + locations}>{locations}</Link>
                    </div>
                ))}
              </div>
            */}
              <div>
              <DropdownButton id="dropdown-basic-button" title="Choose your location (Temp)">
                {this.state.local_locations.map((locations, index) => (
                    <div className = "Location_Boxes">
                      <Dropdown.Item href = {'/locations/' + locations}>{locations}</Dropdown.Item>
                    </div>
                ))}
              </DropdownButton>
              </div>
            <button id="forumButton" title="forum button">Forum Button
            </button>
          </div>
          <h1>Locations from backend fetch: {(this.state.backend_locations)}</h1>
          <h1>Add new location</h1>
          <form>
            <label>
              Name:
              <input type="text" name="name" onChange = {(e) => this.setState({typed_location: e.target.value})}/>
            </label>
            <input type="submit" value="Submit" onClick = {(e) => this.location_submit(e)}/>
          </form>
      </div>
    );
  }
}

export default Homepage;