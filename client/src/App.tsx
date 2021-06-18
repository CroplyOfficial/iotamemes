import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthSuccess from "./pages/AuthSuccess/AuthSuccess";
import NewMeme from "./pages/NewMeme/NewMeme";
import Navbar from "./components/Navbar/Navbar";
import Memes from "./components/Memes/Memes";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { DiscordLoginButton } from "./components/Navbar/DiscordLoginButton";

function App() {
  const userLogin: any = useSelector((state: RootState) => state.userLogin);
  const isLoggedIn = userLogin.userInfo !== null;

  return (
    <>
      <Router>
        <Navbar
          extraLink={
            isLoggedIn ? <div> Logged In </div> : <DiscordLoginButton />
          }
        />
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
          <Route exact path="/memes" component={Memes} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
