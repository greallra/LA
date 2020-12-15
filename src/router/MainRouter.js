import React from "react";
import App from '../screens/App'
// import MapScreen from '../screens/MapScreen';
//  import Chat from '../screens/ChatScreen'
// import Join from '../screens/JoinScreen'
// import NavBar from '../components/Navbar';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function MainRouter() {
    // const params = useParams();
 
    return (
        <Router>  
           {/* <NavBar /> */}
           <Switch>
                <Route 
                    path="/:username" 
                    component={App}
            
                />    
                <Route 
                    path="/" 
                    component={App}
            
                />    
                
            </Switch>
        </Router>
    )
}

