import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";
import "./Header.css";

interface Props {
	user: any;
}
export const AvatarDropdown = (props: Props) => {
	const { user } = props;

	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<div className="navbar-item has-dropdown is-hoverable ">
			<a className="navbar-link ">
				<img src={user.avatar} alt="user-image" className="image" />
			</a>
			<div className="navbar-dropdown my__navbar ">
				<div className="navbar-item">
					<a href="/newmeme">New Meme</a>
				</div>
				<div className="navbar-item">
					<a href={`/user/${user.id}`}>Profile</a>
				</div>
				<div className="navbar-item">
					<a href="/settings">Settings</a>
				</div>
				<div className="navbar-item">
					<a href="/about">About</a>
				</div>
				<div className="navbar-item">
					<a href="/terms">Terms</a>
				</div>
				<div className="navbar-item">
					<a href="/privacy">Privacy</a>
				</div>
				<div
					className="navbar-item"
					style={{ cursor: "pointer" }}
					onClick={logoutHandler}
				>
					Logout
				</div>
			</div>
		</div>
	);
};
