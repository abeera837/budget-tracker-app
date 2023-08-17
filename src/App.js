import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from "./Components/Register";
import Navbar from "./Components/Navbar";
import ExpenseChart from "./Components/ExpenseChart";
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
             <Register />
          </Route>
           <Route path="/dashboard">           {/*to do create new names  */}
              <DataTable />
          </Route> 
        
           <Route path="/signin">           {/*to do create new names  */}
              <SignIn />
          </Route>

          <Route path="/analytics">           {/*to do create new names  */}
              <ExpenseChart />
          </Route>
        </Switch>
      
      </div> 
      
    </div>
 
  </Router>
  );

}

export default App;


