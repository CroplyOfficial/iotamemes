import { useState, useEffect } from "react";
// import Meme from "./Meme/Meme";
import "./Memes.css";
import { SearchBar } from "./SearchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
//@ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getMemes } from "../../actions/memeActions";
import { RootState } from "../../store";
import Loader from "../Loader/Loader";
import { MemeModal2 } from "./Modal/Modal2";
import Meme from "./Meme/Meme";
import Pagination from "../Pagination/Pagination";

const Memes = () => {
  const dispatch = useDispatch();

  const memesState = useSelector((state: RootState) => state.getMemes);
  const { error, loading, memes }: any = memesState;

  const [filteredMemes, setFilteredMemes]: any = useState(memes);
  const [activeModal, setActiveModal] = useState<Record<string, any>>({
    user: {},
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [memesPerPage, setMemesPerPage] = useState<number>(20);
  const [memesOnPage, setMemesOnPage] = useState<any>();

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
    const indexOfLastMeme = currentPage * memesPerPage;
    const indexOfFirstMeme = indexOfLastMeme - memesPerPage;

    setMemesOnPage(memes ? memes.slice(indexOfFirstMeme, indexOfLastMeme) : []);
  }, [memes, filteredMemes]);

  const paginate = (number: number) => {
    setCurrentPage(number);
    setFilteredMemes([]);
    const indexOfLastMeme = currentPage * memesPerPage;
    const indexOfFirstMeme = indexOfLastMeme - memesPerPage;

    setMemesOnPage(memes.slice(indexOfFirstMeme, indexOfLastMeme));
    console.log(
      memes.slice(indexOfFirstMeme, indexOfLastMeme),
      indexOfLastMeme,
      indexOfFirstMeme
    );
    window.scrollTo(0, 0);
  };

  return (
    <div className="container is-widescreen mt-5">
      <SearchBar memes={memes} setMemes={setFilteredMemes} />
      {loading ? (
        <Loader />
      ) : memesOnPage ? (
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
              {memesOnPage.map((meme: any) => (
                <Meme
                  id={meme._id}
                  memeAuthor={meme.memeAuthor}
                  imgURL={meme.imgURL}
                  upvotes={meme.upvotes}
                  memeTags={meme.memeTags}
                  onClick={handleOnClick}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
          <Pagination
            totalMemes={memes.length}
            memesPerPage={memesPerPage}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      ) : (
        <h1>{error}</h1>
      )}
    </div>
  );
};

export default Memes;
