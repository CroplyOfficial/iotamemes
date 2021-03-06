import Container80 from "../../components/Container80/Container80";
import axios from "axios";
import { useState, useEffect, Suspense, lazy } from "react";
import Loader from "../../components/Loader/Loader";
//@ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import StackGrid from "react-stack-grid";
import "./UserPage.css";
import { MemeModal2 } from "../../components/Memes/Modal/Modal2";
import {
  faArrowDown,
  faArrowUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import IotaButton from "../../components/IotaButton/IotaButton";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
const Meme = lazy(() => import("../../components/Memes/Meme/Meme"));

const UserPage = ({ match }: any) => {
  const [memeLoading, setMemeLoading]: any = useState(true);
  const [userLoading, setUserLoading]: any = useState(true);
  const [filteredMemes, setFilteredMemes]: any = useState([]);

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userLogin ? userLogin : false;

  const [activeModal, setActiveModal]: any = useState({
    user: {},
    memeTags: [],
  });
  const [memes, setMemes]: any = useState(null);
  const [user, setUser]: any = useState(null);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getUserMemes = async () => {
    const { data } = await axios.get(
      `/api/users/${match.params.id}/memes`,
      config
    );
    setMemes(data);
    setFilteredMemes(data);
    setMemeLoading(false);
  };

  const filterMemes = async (e: any) => {
    const filtMemes = memes.filter((meme: any) =>
      JSON.stringify(meme.memeTags).includes(e.target.value)
    );
    setFilteredMemes(filtMemes);
  };

  const getUserData = async () => {
    const { data } = await axios.get(`/api/users/${match.params.id}`, config);
    setUser(data);
    setUserLoading(false);
  };

  useEffect(() => {
    getUserMemes();
    getUserData();
  }, []);

  const resetActiveModal = () => setActiveModal({ user: {}, memeTags: [] });
  const onClickHandler = (meme: any) => {
    setActiveModal(meme);
  };
  return (
    <Container80>
      {memeLoading ? (
        <Loader />
      ) : (
        <>
          {userLoading ? (
            <Loader />
          ) : (
            <div className="user-info-container">
              <div className="user-info">
                <div className="user-data">
                  <img src={user.avatar} />
                  <div>
                    <h2>{user.username}</h2>
                    <div className="user-meta">{user.upvotes} Likotas</div>
                  </div>
                </div>
                <p className="user-bio">{user.bio}</p>
              </div>
            </div>
          )}
          {
            <MemeModal2
              meme={activeModal}
              isActive={activeModal.id ? true : false}
              exitHandler={resetActiveModal}
            />
          }
          <div
            className="search-container"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            {!userLoading && userInfo && userInfo.id === match.params.id ? (
              <Link to="/newmeme" style={{ marginRight: "15px" }}>
                <button className="uploadMeme">+ NEW MEME</button>
              </Link>
            ) : (
              <>
                {!userLoading && user.wallet && (
                  <IotaButton
                    address={user.wallet}
                    style={{
                      fontSize: "1rem",
                      height: "40px",
                      marginRight: "20px",
                      display: "block !important",
                    }}
                  />
                )}
              </>
            )}
            <div className="control has-icons-right">
              <input
                type="text"
                className="input is-rounded meme-search"
                placeholder="Search Artists"
                style={{ width: "35vw" }}
                onKeyUp={filterMemes}
              />
              <span className="icon is-small is-right">
                <FontAwesomeIcon icon={faSearch} />
                {/* <i className="fas fa-envolope"></i> */}
              </span>
            </div>
          </div>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1080: 4 }}
          >
            <Masonry>
              {filteredMemes.map((meme: any) => (
                <Suspense key={meme._id} fallback={<div>loading...</div>}>
                  <Meme
                    id={meme._id}
                    memeAuthor={meme.memeAuthor}
                    imgURL={meme.imgURL}
                    upvotes={meme.upvotes}
                    memeTags={meme.memeTags}
                    onClick={onClickHandler}
                  />
                </Suspense>
              ))}
            </Masonry>
          </ResponsiveMasonry>

          {/* <StackGrid columnWidth={300} monitorImagesLoaded={true}>
            {filteredMemes.map((meme: any) => (
              <Meme
                id={meme._id}
                key={meme._id}
                memeAuthor={meme.memeAuthor}
                imgURL={meme.imgURL}
                upvotes={meme.upvotes}
                memeTags={meme.memeTags}
                onClick={onClickHandler}
              />
            ))}
          </StackGrid> */}
        </>
      )}
    </Container80>
  );
};

export default UserPage;
