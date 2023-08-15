import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';//
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";

import DataTable from './Components/DataTable';


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
        </Switch>
      
      </div> 
      
    </div>
 
  </Router>
  );

}

export default App;


