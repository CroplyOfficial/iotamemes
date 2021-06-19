import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Meme from './Meme/Meme';
import './Memes.css';
import { SearchBar } from './SearchBar/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import StackGrid from 'react-stack-grid';
import { getMemes } from '../../actions/memeActions';
import Container80 from '../Container80/Container80';
import { RootState } from '../../store';
import Loader from '../Loader/Loader';

const Memes = () => {
  const dispatch = useDispatch();

  const memesState = useSelector((state: RootState) => state.getMemes);
  const { error, loading, memes }: any = memesState;

  const [filteredMemes, setFilteredMemes]: any = useState(memes);

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
          <StackGrid columnWidth={300}>
            {filteredMemes.map((meme: any) => (
              <Meme
                key={meme._id}
                id={meme._id}
                memeAuthor={meme.memeAuthor}
                imgURL={meme.imgURL}
                upvotes={meme.upvotes}
                memeTags={meme.memeTags}
              />
            ))}
          </StackGrid>
        ) : (
          <h1>{error}</h1>
        )}
      </Container80>
    </div>
  );
};

export default Memes;
