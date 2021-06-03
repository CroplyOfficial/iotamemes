import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import Header from './components/Header/Header';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import SettingsScreen from './screens/SettingsScreen/SettingsScreen';

function App() {
  return (
    <Router>
      <Header />
      <Route path='/' component={HomeScreen} />
      <Route path='/register' component={RegisterScreen} />
      <Route path='/login' component={LoginScreen} />
      <PrivateRoute path='/settings' component={SettingsScreen} />
    </Router>
  );
}

export default App;
