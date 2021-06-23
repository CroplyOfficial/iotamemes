import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const DiscordLoginButton = () => {
  return (
    <Link to="/authorize">
      <button className="button is-rounded is-link" style={{marginTop: '12.5px'}}>
        <FontAwesomeIcon icon={faDiscord} className="mr-1" />
        Login with Discord
      </button>
    </Link>
  );
};
