import React, { useState, useEffect } from "react";
import axios from "axios";
import Meme from "./Meme/Meme";
import "./Memes.css";
import { SearchBar } from "./SearchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import StackGrid from "react-stack-grid";
import { getMemes } from "../../actions/memeActions";
import Container80 from "../Container80/Container80";
import { RootState } from "../../store";
import Loader from "../Loader/Loader";
import { MemeModal } from "./Modal/Modal";

const Memes = () => {
  const dispatch = useDispatch();

  const memesState = useSelector((state: RootState) => state.getMemes);
  const { error, loading, memes }: any = memesState;

  const [filteredMemes, setFilteredMemes]: any = useState(memes);
  const [activeModal, setActiveModal] = useState<Record<string, any>>({});

  const handleOnClick = (meme: Record<string, any>) => {
    setActiveModal(meme);
  };
  const resetActiveModal = () => {
    setActiveModal({});
  };

  useEffect(() => {
    dispatch(getMemes());
  }, []);

  useEffect(() => {
    setFilteredMemes(memes);
  }, [memes]);

  return (
    <div className='container is-widescreen mt-5'>
      <SearchBar memes={memes} setMemes={setFilteredMemes} />
      <Container80>
        {loading ? (
          <Loader />
        ) : filteredMemes ? (
          <>
            {
              <MemeModal
                meme={activeModal}
                isActive={activeModal.id ? true : false}
                exitHandler={resetActiveModal}

              />
            }
            <StackGrid columnWidth={300}  monitorImagesLoaded={true}>
              {filteredMemes.map((meme: any) => (
                <Meme
                  key={meme._id}
                  id={meme._id}
                  memeAuthor={meme.memeAuthor}
                  imgURL={meme.imgURL}
                  upvotes={meme.upvotes}
                  memeTags={meme.memeTags}
                  onClick={handleOnClick}
                />
              ))}
            </StackGrid>
          </>
        ) : (
          <h1>{error}</h1>
        )}
      </Container80>
    </div>
  );
};

export default Memes;
