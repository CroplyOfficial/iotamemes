import {faShare} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  meme: any;
  isActive: boolean;
  exitHandler: () => void;
}
export const MemeModal = ({ meme, isActive, exitHandler }: IProps) => {
  const classNames = isActive ? "is-active" : "";
  const {imgURL, memeAuthor,memeTags, upvotes, _id} = meme;

  // Populate if you need it
  const fetchAuthor = (_id: string) => {
    return {};
  }



  return (
    <div className={"modal " + classNames}>
      <div className="modal-background" onClick={exitHandler}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{memeAuthor}</p>
          <button className="delete" aria-label="close" onClick={exitHandler}></button>
        </header>
        <section className="modal-card-body">
          <div className="image " >
            <img src={imgURL} />
          </div>
          {/* <!-- Content ... --> */}
        </section>
        <footer className="modal-card-foot">
          <FontAwesomeIcon icon={faShare} />
        </footer>
      </div>
    </div>
  );
};
