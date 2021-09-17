import { Component } from "react"

/*This is the page that shows the location the user clicked*/

class Specific_Location extends Component {
    constructor(props) {
    super(props)
    this.state={
      current_location: null,
      saved: 'False'
    }
  }
  
  componentDidMount() {
    /*Leave this for database fetching*/
    let pathname = this.props.location.pathname.substr(11)
    this.setState({current_location: pathname})
  }
  
  render (){
    let check_location = this.props.location.pathname.slice(0, 10);
    if (check_location == '/locations'){
        return(
            <div>
                <h1>Welcome to {this.state.current_location}</h1>
                <button onClick = {() => this.setState({saved: 'True'})}>Save to list</button>
                <h1>Location saved: {this.state.saved}</h1>
            </div>
        );
    }
    else {
        return(<h1>The following page does not exist, please check your spelling</h1>)
    }
    }   
}

export default Specific_Location 