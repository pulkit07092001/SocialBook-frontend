import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
// import { useHistory } from "react-router";
export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?username=${username}`);

        if (res.status !== 200) throw new Error("my error");
        setError(false);
        setUser(res.data);
      } catch (err) {
        setError(true);
      }
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          {error ? (
            <h1
              style={{
                fontSize: "4rem",
                display: "flex",
                justifyContent: "center",
                marginTop: "250px",
                alignItems: "center",
              }}
            >
              Error: User Not Found ❌
            </h1>
          ) : (
            <>
              <div className="profileRightTop">
                <div className="profileCover">
                  <img
                    className="profileCoverImg"
                    src={
                      user.coverPicture
                        ? PF + user.coverPicture
                        : PF + "person/noCover.png"
                    }
                    alt=""
                  />
                  <img
                    className="profileUserImg"
                    src={
                      user.profilePicture
                        ? PF + user.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                  />
                </div>

                <div className="profileInfo">
                  <h4 className="profileInfoName">{user.username}</h4>
                  <span className="profileInfoDesc">{user.desc}</span>
                </div>
              </div>
              <div className="profileRightBottom">
                <Feed username={username} />
                <Rightbar user={user} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
