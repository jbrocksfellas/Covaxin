import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './MyComponents/Header'
import { InputDetail } from './MyComponents/InputDetail'
import { Alerts } from './MyComponents/Alerts'
import states from './MyComponents/state_data.json'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const state_data = states['states']

  return (
    <Router>
      <Header />
      <switch>
        <Route exact path="/" render={() => {
          return (
            <Alerts states={state_data}/>
          )
        }}>
        </Route>
        <Route exact path="/details">
          <InputDetail states={state_data} />
        </Route>

      </switch>
    </Router>
  );
}

export default App;
