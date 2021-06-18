import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faCog,
  faEnvelope,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
export const SearchBar = () => {
  const handleClickDown = () => null;
  const handleClickUp = () => null;

  return (
    <nav className="level is-mobile">
      <p className="level-item has-text-centered">
        <a className="link is-info"></a>
      </p>
      <p className="level-item has-text-centered">
        <div className="field">
          <div className="control has-icons-right">
            <input
              type="text"
              className="input is-rounded"
              placeholder="Search for memes"
            />
            <span className="icon is-small is-right">
              <FontAwesomeIcon icon={faSearch} />
              {/* <i className="fas fa-envolope"></i> */}
            </span>
          </div>
        </div>
      </p>
      <p className="level-item has-text-centered">
        <span className="has-text-white mr-5">order by </span>
        <FontAwesomeIcon
          icon={faArrowUp}
          className="mr-1"
          onClick={handleClickUp}
        />
        <FontAwesomeIcon icon={faArrowDown} onClick={handleClickDown} />
      </p>
    </nav>
  );
};
