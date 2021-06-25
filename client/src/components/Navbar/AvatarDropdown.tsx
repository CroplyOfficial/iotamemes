import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";

interface Props {
  user: Record<string, any>;
}
export const AvatarDropdown = (props: Props) => {
  const { user } = props;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <a className="navbar-link">
        <img src={user.avatar} alt="user-image" className="image" />
      </a>
      <div className="navbar-dropdown">
        <div className="navbar-item">
          <Link to="/newmeme">New Meme</Link>
        </div>
        <div className="navbar-item">
          <Link to="/settings">Settings</Link>
        </div>
        <div className="navbar-item">
          <Link to="/about">About</Link>
        </div>
        <div className="navbar-item">
          <Link to="/terms">Terms</Link>
        </div>
        <div className="navbar-item">
          <Link to="/privacy">Privacy</Link>
        </div>
        <div className="navbar-item" onClick={logoutHandler}>
          Logout
        </div>
      </div>
    </div>
  );
};
