import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

interface IProps {
  meme: any;
  isActive: boolean;
 exitHandler: () => void;
}
export const MemeModal = ({ meme, isActive, exitHandler }: IProps) => {
  const classNames = isActive ? "is-active" : "";
  const { imgURL, memeAuthor, memeTags, upvotes, id, user } = meme;
  console.log(user);

  // Populate if you need it
  const fetchAuthor = (_id: string) => {
    return {};
  };
  console.log(window.location.href);

  return (
    <div className={"modal " + classNames}>
      <div className="modal-background" onClick={exitHandler}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <div className="image is-64x64">
            <img
              src={
                user.avatar ||
                "https://bulma.io/images/placeholders/128x128.png"
              }
            />
          </div>
          <p className="modal-card-title">{user.username}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={exitHandler}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="image ">
            <img src={imgURL} />
          </div>
          {/* <!-- Content ... --> */}
        </section>
        <footer className="modal-card-foot">
          {(memeTags as string[])?.map((t) => `#${t}`).join(", ")}
          <div className="level is-mobile">
            <div className="level-item mr-1">
              <div className="meme-share-icon">
                <FacebookShareButton url={`${window.location.href}meme/${id}`}>
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
              </div>
            </div>
            <div className="level-item mr-1">
              <div className="meme-share-icon">
                <TwitterShareButton url={`${window.location.href}meme/${id}`}>
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
              </div>
            </div>
            <div className="level-item mr-1">
              <div className="meme-share-icon">
                <RedditShareButton url={`${window.location.href}meme/${id}`}>
                  <RedditIcon size={32} round={true} />
                </RedditShareButton>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
