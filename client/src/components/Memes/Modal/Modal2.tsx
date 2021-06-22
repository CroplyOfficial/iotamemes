import { Media } from "./Media";

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
