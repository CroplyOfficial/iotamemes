interface Props {
  user: Record<string, any>;
}
export const AvatarDropdown = (props: Props) => {
  const { user } = props;

  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <a className="navbar-link">
        <img src={user.avatar} alt="user-image" className="image" />
      </a>
      <div className="navbar-dropdown">
        <a className="navbar-item" href="/settings">
          User Settings
        </a>
        <a className="navbar-item" href="/terms">
          Terms Of Service
        </a>
        <a className="navbar-item" href="/privacy">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};
