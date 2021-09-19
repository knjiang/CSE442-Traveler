import { Component } from "react"
import './Homepage.css'
import { Link , BrowserRouter as Router } from 'react-router-dom';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap'

class Homepage extends Component {

  constructor(props) {

    /*The locations state is currently containing placeholders until database is set up*/
    super(props);
    this.state = {
      locations: ['location_1', 'location_2'],
      users: null
    }; 
  }
  
  componentDidMount() {
    /*
    fetch("http://localhost:8000/users/", 
    {
      method: "GET",
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'http://localhost:8000'
      }
    })
    .then(
      (result) => {
        alert("Fetching Successful")
        this.setState({
          users: result
        });
      },
      (error) => {
        alert(error)
      }
    )
    */
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
              <DropdownButton id="dropdown-basic-button" title="Choose your location">
                {this.state.locations.map((locations, index) => (
                    <div className = "Location_Boxes">
                      <Dropdown.Item href = {'/locations/' + locations}>{locations}</Dropdown.Item>
                    </div>
                ))}
              </DropdownButton>
              </div>
            <button id="forumButton" title="forum button">Forum Button
            </button>
          </div>
          <h1>users from fetch: {this.state.users}</h1>
      </div>
    );
  }
}

export default Homepage;