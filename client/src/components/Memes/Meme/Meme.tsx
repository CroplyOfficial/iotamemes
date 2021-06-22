import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../Card/Card";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Meme.css";
import { RootState } from "../../../store";
import IotaButton from "../../IotaButton/IotaButton";

const Meme = ({ id, imgURL, memeAuthor, memeTags, upvotes, onClick }: any) => {
  const [user, setUser] = useState({
    avatar: "",
    username: "",
  });

  const [likes, setLikes] = useState(upvotes);

  let userInfo: any;

  const userLogin: any = useSelector((state: RootState) => state.userLogin);
  try {
    userInfo = userLogin.userInfo;
  } catch (error) {
    userInfo = null;
  }

  const likedMemesMeta: any = useSelector(
    (state: RootState) => state.getLikedMemes
  );
  const { loading, error, likedMemes }: any = likedMemesMeta;
  const [isLiked, setIsLiked] = useState(
    likedMemes ? likedMemes.includes(id) : false
  );

  useEffect(() => {
    const getUser = async (userId: string) => {
      const { data }: any = await axios.get(`/api/users/${userId}`);
      setUser(data);
    };

    setIsLiked(likedMemes ? likedMemes.includes(id) : false);

    getUser(memeAuthor);
  }, [memeAuthor, likedMemes]);

  const likeHandler = async () => {
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
      const likesNew: any = memeData.data.upvotes;
      console.log(memeData.data);
      setIsLiked(memeData.data.likedMemes.includes(id));
      setLikes(likesNew);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickHandler = () => {
    onClick({ id, imgURL, memeAuthor, memeTags, upvotes, user });
  };

  return (
    <div className="meme">
      <Card>
        <div className="memeAuthor" onClick={onClickHandler}>
          <img src={user.avatar} className="avatar" />
          <Link to={`/user/${memeAuthor}`}>
            <h1 className="username">{user.username}</h1>
          </Link>
        </div>
        {/*<Link to={`/meme/${id}`}>*/}
        <div onClick={onClickHandler}>
          <div className="meme-img">
            <img src={imgURL} />
          </div>
        </div>
        {/*</Link>*/}
        <div className="meta">
          <div className="tags" onClick={onClickHandler}>
            {memeTags.length > 0 &&
              memeTags.map((tag: string) => <span key={tag}>#{tag}</span>)}
          </div>
          <div className="bottom">
            <nav className="level is-mobile">
              <div className="level-left">
                <div className="level-item">
                  <div className="likes">{likes} LIKOTAS</div>
                </div>
              </div>
              <div></div>
              <div className="level-right">
                <img
                  src={isLiked ? "/images/liked.svg" : "/images/like.svg"}
                  onClick={likeHandler}
                  className="like"
                />
              </div>
            </nav>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Meme;
