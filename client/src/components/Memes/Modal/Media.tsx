import {
  faFacebook,
  faReddit,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faHeart, faReply, faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useState, useEffect } from "react";
import TagsInput from "react-tagsinput";
import axios from "axios";

interface Props {
  user: any;
  meme: any;
}
export const Media = (props: Props) => {
  const { user, meme } = props;
  const { avatar, username } = user;
  const { imgURL, memeAuthor, memeTags, upvotes, id } = meme;

  const [tags, setTags] = useState<string[]>([]);

  const userInfoMeta = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userInfoMeta;

  const saveMeme = async () => {
    const { data } = await axios.patch(
      `/api/memes/${id}`,
      { memeTags: tags },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    window.location.href = `/meme/${data._id}`;
  };

  const deleteMeme = async () => {
    const { data } = await axios.delete(`/api/memes/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    window.location.href = `/`;
  };

  useEffect(() => {
    if (memeTags) {
      setTags((tags) => [...memeTags]);
    }
  }, [memeTags]);

  const avatarURL =
    avatar || "https://bulma.io/images/placeholders/128x128.png";

  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={avatarURL} />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p style={{ width: "80%" }}>
            <Link to={`/user/${memeAuthor}`}>
              <strong>{username}</strong>
            </Link>
            <br />
            {userInfo && memeAuthor === userInfo.id ? (
              <TagsInput
                onChange={(tags) => setTags(tags)}
                value={tags}
              ></TagsInput>
            ) : (
              (memeTags as string[])?.map((t) => `#${t}`).join(", ")
            )}
            {userInfo && memeAuthor === userInfo.id && (
              <>
                <button className="save" onClick={saveMeme}>
                  Save
                </button>
                <button onClick={deleteMeme} className="delete-meme">
                  Delete
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </article>
  );
};
