import { Component } from "react"
import './Homepage.css'
import { Link , BrowserRouter as Router } from 'react-router-dom';

class Browse_Locations extends Component {

  constructor(props) {

    /*The locations state is currently containing placeholders until database is set up*/
    super(props);
    this.state = {
      locations: ['location_1', 'location_2']
    }; 
  }

  render(){
    return (
      <div>
          <h1>Welcome to the Locations Page</h1>
          <div>
            <Router>
            <h1>Locations</h1>
              <div id = "For_All_Location">
                {this.state.locations.map((locations, index) => (
                    <div className = "Location_Boxes">
                      <Link className = "Location_Click" to = {'/location/' + locations}>{locations}</Link>
                    </div>
                ))}
              </div>
              </Router>
          </div>
      </div>
    );
  }
}

export default Browse_Locations