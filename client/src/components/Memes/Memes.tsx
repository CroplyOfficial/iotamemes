import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
// import Meme from "./Meme/Meme";
import "./Memes.css";
import { SearchBar } from "./SearchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
//@ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getMemes } from "../../actions/memeActions";
import Container80 from "../Container80/Container80";
import { RootState } from "../../store";
import Loader from "../Loader/Loader";
import { MemeModal } from "./Modal/Modal";
import { MemeModal2 } from "./Modal/Modal2";
import { useReducer } from "react";
const Meme = lazy(() => import("./Meme/Meme"));

const Memes = () => {
  const dispatch = useDispatch();

  const memesState = useSelector((state: RootState) => state.getMemes);
  const { error, loading, memes }: any = memesState;

  const [filteredMemes, setFilteredMemes]: any = useState(memes);
  const [activeModal, setActiveModal] = useState<Record<string, any>>({
    user: {},
  });

  const handleOnClick = (meme: Record<string, any>) => {
    setActiveModal(meme);
  };
  const resetActiveModal = () => {
    setActiveModal({ memeTags: [], user: {} });
  };

  useEffect(() => {
    dispatch(getMemes());
  }, []);

  useEffect(() => {
    setFilteredMemes(memes);
  }, [memes]);

  return (
    <div className="container is-widescreen mt-5">
      <SearchBar memes={memes} setMemes={setFilteredMemes} />
      {loading ? (
        <Loader />
      ) : filteredMemes ? (
        <>
          {
            <MemeModal2
              meme={activeModal}
              isActive={activeModal.id ? true : false}
              exitHandler={resetActiveModal}
            />
          }
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
                    onClick={handleOnClick}
                  />
                </Suspense>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </>
      ) : (
        <h1>{error}</h1>
      )}
    </div>
  );
};

export default Memes;
