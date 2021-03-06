import { useEffect, useState } from "react";
import InputTags from "react-tagsinput";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import "./MemePage.css";
import {
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
} from "react-share";
import {
  faFacebook,
  faReddit,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faFlag, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelector } from "react-redux";
import Modal from "../../components/Modal/Modal";
import IotaButton from "../../components/IotaButton/IotaButton";

import { FacebookIcon, RedditIcon, TwitterIcon } from "react-share";
import { RootState } from "../../store";

const MemePage = ({ match }: any) => {
  const [loading, setLoading] = useState(true);
  const [meme, setMeme]: any = useState({});
  const [artist, setArtist]: any = useState();
  const [visible, setVisible]: any = useState(false);
  const [message, setMessage]: any = useState("flagging meme");
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [user, setUser] = useState<Record<string, any>>({});

  /*
	const likedMemesMeta: any = useSelector(
		(state: RootState) => state.getLikedMemes,
	);
	console.log("likedMemesMeta:", likedMemesMeta);
  */

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log("paramsId", match.params.id);

  const getMeme = async () => {
    const meme_received: any = await axios.get(
      `/api/memes/${match.params.id}`,
      config
    );
    setMeme(meme_received.data);
    const user_received = await axios.get(
      `/api/users/${meme_received.data.memeAuthor}`,
      config
    );
    setArtist(user_received.data);
    setLoading(false);
  };

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userLogin ? userLogin : null;

  /* -------------------- flagging stuff -------------------- */

  const flagMeme = async () => {
    if (userInfo) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      try {
        const flag = await axios.post(
          "/api/flags",
          { memeId: match.params.id },
          config
        );
        setVisible(true);
        setMessage("Reported meme successfully :)");
      } catch (error) {
        setVisible(true);
        setMessage(
          "unable to create new report for this meme, this probably means that you have already reported this meme"
        );
      }
    } else {
      setVisible(true);
      setMessage("You need to log in to report a meme");
    }
  };

  /* ------------------ end flagging stuff ------------------ */

  useEffect(() => {
    getMeme();
  }, []);

  useEffect(() => {
    const getUser = async (userId: string) => {
      const { data }: any = await axios.get(`/api/users/${userId}`);
      setUser(data);
    };
    getUser(meme?.memeAuthor);
  }, [meme]);

  useEffect(() => {
    console.log("user:", user);
    setIsLiked(user?.likedMemes?.includes(match.params.id));
  }, [user]);

  const likeHandler = async () => {
    const id = match.params.id;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const memeData: any = await axios.get(
        `/api/memes/toggleLike/${id}`,
        config
      );
      setIsLiked(memeData.data.likedMemes.includes(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="memePage">
      {loading ? (
        <Loader />
      ) : meme && artist ? (
        <>
          <div className="artist">
            <img src={artist.avatar} alt={artist.username} />
            <div className="username">{artist.username}</div>
          </div>
          <img src={meme.imgURL} className="meme-img" />
          <div className="tags">
            {meme &&
              meme.memeTags.map((tag: string) => (
                <span className="tag">#{tag} </span>
              ))}
          </div>
          <div className="iotaButton" style={{ marginLeft: "30px" }}>
            {artist.wallet && <IotaButton address={artist.wallet} />}
          </div>
          <div className="my__bottomMeme is-mobile" style={{ padding: "15px" }}>
            <div
              className="level-right"
              style={{ transform: "translateY(7px)" }}
            >
              <div className="level-item" style={{ paddingRight: "35px" }}>
                <FontAwesomeIcon
                  color="#cacaca"
                  icon={faFlag}
                  className="icon is-medium hover-grey"
                  style={{
                    marginBottom: "0.25rem",
                    cursor: "pointer",
                    transform: "translateY(-75px) translateX(210px)",
                    height: "20px",
                  }}
                  onClick={flagMeme}
                />
              </div>
              <a className="level-item">
                {isLiked ? (
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ fontSize: "30px", color: "cacaca" }}
                    onClick={likeHandler}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{
                      fontSize: "30px",
                      color: "rgba(0,0,0,0)",
                      stroke: "black",
                      strokeWidth: "30px",
                    }}
                    onClick={likeHandler}
                  />
                )}
              </a>
              <a className="level-item">
                <span>
                  <FacebookShareButton
                    url={`${window.location.href}meme/${meme.id}`}
                  >
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="icon is-medium hover-grey "
                      style={{
                        color: "cacaca",
                      }}
                    />
                  </FacebookShareButton>
                </span>
              </a>
              <a className="level-item">
                <span>
                  <TwitterShareButton
                    url={`${window.location.href}meme/${meme.id}`}
                  >
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className="icon is-medium icon is-medium hover-grey"
                      style={{
                        color: "cacaca",
                      }}
                    />
                  </TwitterShareButton>
                </span>
              </a>
              <a className="level-item">
                <span>
                  <RedditShareButton
                    url={`${window.location.href}meme/${meme.id}`}
                  >
                    <FontAwesomeIcon
                      icon={faReddit}
                      className="icon is-medium"
                      style={{
                        color: "cacaca",
                      }}
                    />
                  </RedditShareButton>
                </span>
              </a>
            </div>
          </div>
        </>
      ) : (
        <div className="message">Unable to load meme </div>
      )}
    </div>
  );
};

export default MemePage;
