interface IProps {
  meme: any;
  isActive: boolean;
  exitHandler: () => void;
}
export const MemeModal = ({ meme, isActive, exitHandler }: IProps) => {
  const classNames = isActive ? "is-active" : "";
  return (
    <div className={"modal " + classNames}>
      <div className="modal-background" onClick={exitHandler}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close" onClick={exitHandler}></button>
        </header>
        <section className="modal-card-body">
          {/* <!-- Content ... --> */}
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save changes</button>
          <button className="button">Cancel</button>
        </footer>
      </div>
    </div>
  );
};
