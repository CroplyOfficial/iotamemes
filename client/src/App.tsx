import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthSuccess from './pages/AuthSuccess/AuthSuccess';
import NewMeme from './pages/NewMeme/NewMeme';
import Navbar from './components/Navbar/Navbar';
import MemesPage from './pages/MemesPage/MemesPage';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './actions/userActions'
import { RootState } from './store';
import Artists from './pages/Artists/Artists';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import MemePage from './pages/MemePage/MemePage';
import UserPage from './pages/UserPage/UserPage';
import TermsPage from './pages/TermsPage/TermsPage';
import PrivacyPage from './pages/PrivacyPage/PrivacyPage';
import ReportsPage from './pages/ReportsPage/ReportsPage';
import AboutPage from './pages/AboutPage/AboutPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  const userLogin: any = useSelector((state: RootState) => state.userLogin);
  const isLoggedIn = userLogin.userInfo || null;

  const dispatch = useDispatch();
  const [banned, setBanned] = useState(false);

  const checkBanned = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${isLoggedIn.token}`
      }
    }
    try {
      const { data } = await axios.get('/api/users/@me/isBanned', config);
      const { isBanned } = data;
      console.log(isBanned)
      setBanned(isBanned);
    } catch (error) {
      dispatch(logout());
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      checkBanned();
    }
  }, [isLoggedIn]);

  return (
    <>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} />
        <Switch>
          <Route
            exact
            path='/authorize'
            component={() => {
              window.location.href =
                'https://discord.com/api/oauth2/authorize?client_id=854235929329795072&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauthenticate%2Fsuccess&response_type=code&scope=identify';
              return null;
            }}
          />
          <Route exact path='/authenticate/success' component={AuthSuccess} />
          <PrivateRoute exact path='/newmeme' component={NewMeme} />
          <Route exact path='/' component={MemesPage} />
          <Route exact path='/artists' component={Artists} />
          <Route exact path='/terms' component={TermsPage} />
          <Route exact path='/privacy' component={PrivacyPage} />
          <Route exact path ='/flags' component={ReportsPage} />
          <Route exact path='/settings' component={SettingsPage} />
          <Route path='/meme/:id' component={MemePage} />
          <Route path='/user/:id' component={UserPage} />
          <Route exact path='/about' component={AboutPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
