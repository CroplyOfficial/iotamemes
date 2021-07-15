import Card from "../../../components/Card/Card";
import { Link } from "react-router-dom";
import "./Artist.css";

const Artist = ({ id, username, avatar, bio, upvotes, totalMemes }: any) => {
	return (
		<div className="artist">
			<Card>
				<img src={avatar} className="avatar" />
				<Link to={`/user/${id}`}>
					<div className="username my__artist">{username}</div>
				</Link>
				<div className="userMeta">
					{upvotes} Likotas - {totalMemes} Memes
				</div>
				<p className="bio">{bio}</p>
			</Card>
		</div>
	);
};

export default Artist;
