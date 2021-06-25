import {
  faFacebook,
  faReddit,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faHeart, faReply, faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { Link } from 'react-router-dom';

interface Props {
  user: any;
  meme: any;
}
export const Media = (props: Props) => {
  const { user, meme } = props;
  const { avatar, username } = user;
  const { imgURL, memeAuthor, memeTags, upvotes, id } = meme;

  const avatarURL =
    avatar || "https://bulma.io/images/placeholders/128x128.png";

  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={avatarURL} />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p style={{width: '80%'}}>
              <Link to={`/user/${memeAuthor}`}><strong>{username}</strong></Link>
            <br />
            {(memeTags as string[])?.map((t) => `#${t}`).join(", ")}
          </p>
        </div>
      </div>
    </article>
  );
};
