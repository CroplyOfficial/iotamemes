import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthSuccess from "./pages/AuthSuccess/AuthSuccess";
import NewMeme from "./pages/NewMeme/NewMeme";
import { HomePage } from "./pages/Home/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/authorize"
          component={() => {
            window.location.href =
              "https://discord.com/api/oauth2/authorize?client_id=854235929329795072&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauthenticate%2Fsuccess&response_type=code&scope=identify";
            return null;
          }}
        />
        <Route exact path="/authenticate/success" component={AuthSuccess} />
        <Route exact path="/newmeme" component={NewMeme} />
        <Route exact path="/" render={() => <HomePage />} />
      </Switch>
    </Router>
  );
}

export default App;
