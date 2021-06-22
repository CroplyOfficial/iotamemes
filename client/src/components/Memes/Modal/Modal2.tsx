import { Media } from "./Media";
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

interface Props {
  meme: Record<string, any>;
  isActive: boolean;
  exitHandler: () => void;
}
export const MemeModal2 = (props: Props) => {
  const { meme, isActive, exitHandler } = props;
  const { imgURL, memeAuthor, memeTags, upvotes, id, user } = meme;

  const src = imgURL || "https://bulma.io/images/placeholders/1280x960.png";
  const classNames = isActive ? "is-active" : "";
  return (
    <div className={"modal " + classNames}>
      <div className="modal-background" onClick={exitHandler}></div>
      <div className="modal-content">
        <p className="image" style={{ background: "white" }}>
          <img src={src} alt="" />
        </p>
        <div className="modal-card-foot">
          <Media user={user} meme={meme} />
          <nav
            className="level is-mobile"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              padding: "15px",
            }}
          >
            <div className="level-right">
              <a className="level-item">
                <span>
                  <FacebookShareButton
                    url={`${window.location.href}meme/${id}`}
                  >
                    {/* <FacebookIcon size={32} round={true} /> */}
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="icon is-medium"
                    />
                  </FacebookShareButton>
                </span>
              </a>
              <a className="level-item">
                <span>
                  <TwitterShareButton url={`${window.location.href}meme/${id}`}>
                    {/* <TwitterIcon size={32} round={true} /> */}
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className="icon is-medium"
                    />
                  </TwitterShareButton>
                </span>
              </a>
              <a className="level-item">
                <span>
                  <RedditShareButton url={`${window.location.href}meme/${id}`}>
                    {/* <RedditIcon size={32} round={true} /> */}
                    <FontAwesomeIcon
                      icon={faReddit}
                      className="icon is-medium"
                    />
                  </RedditShareButton>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={exitHandler}
      ></button>
    </div>
  );
};
