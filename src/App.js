import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar";
import ExpenseChart from "./Components/ExpenseChart";
import Dashboard from './Components/Dashboard';
import SignIn from "./Pages/SignIn";

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
           <Route path="/dashboard">         
              <Dashboard />
          </Route> 
            <Route path="/signin">          
              <SignIn />
          </Route>
          <Route path="/analytics">          
              <ExpenseChart />
          </Route>
        </Switch>
      
      </div> 
      
    </div>
 
  </Router>
  );

}

export default App;


