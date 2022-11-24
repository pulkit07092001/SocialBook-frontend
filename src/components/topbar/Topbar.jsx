import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const [search, setSearch] = useState("");
  const history = useHistory();
  const handleRedirect = (e) => {
    e.preventDefault();
    history.push("/profile/" + search);
  };
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SocialBook</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <form onSubmit={(e) => handleRedirect(e)}>
            <input
              placeholder="Search for a friend"
              className="searchInput"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                console.log(search);
              }}
            />
          </form>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <Link
            to={`/profile/${user.username}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <span className="topbarLink">Timeline</span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
          <div className="topbarIconItem">
            <Chat />
            {/* <span className="topbarIconBadge">2</span> */}
          </div>
          <div className="topbarIconItem">
            <Notifications />
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
