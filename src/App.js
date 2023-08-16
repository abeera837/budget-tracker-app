import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';//
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Reporting from "./Components/Reporting";
import DataTable from './Components/DataTable';
import SignIn from "./Components/SignIn";

function App() {
  return (
   <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Switch>
          <Route exact path="/">
             <Home />
          </Route>
           <Route path="/dashboard">           {/*to do create new names  */}
              <DataTable />
          </Route> 
        
           <Route path="/signin">           {/*to do create new names  */}
              <SignIn />
          </Route>

          <Route path="/analytics">           {/*to do create new names  */}
              <Reporting />
          </Route>
        </Switch>
      
      </div> 
      
    </div>
 
  </Router>
  );

}

export default App;


