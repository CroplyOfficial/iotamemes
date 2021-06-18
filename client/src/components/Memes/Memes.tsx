import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Meme from './Meme/Meme';
import './Memes.css';
import { SearchBar } from './SearchBar/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import StackGrid from '../StackGrid/StackGrid';
import { getMemes } from '../../actions/memeActions';
import Container80 from '../Container80/Container80';
import { RootState } from '../../store';
import Loader from '../Loader/Loader';

const Memes = () => {
  const dispatch = useDispatch();

  const memesState = useSelector((state: RootState) => state.getMemes);
  console.log(memesState);
  const { error, loading, memes }: any = memesState;

  useEffect(() => {
    dispatch(getMemes());
  }, []);

  return (
    <div className='container is-widescreen mt-5'>
      <SearchBar />
      <Container80>
        <StackGrid>
          {loading ? (
            <Loader />
          ) : memes ? (
            <>
              {memes.map((meme: any) => (
                <Meme
                  key={meme._id}
                  id={meme._id}
                  memeAuthor={meme.memeAuthor}
                  imgURL={meme.imgURL}
                  upvotes={meme.upvotes}
                  memeTags={meme.memeTags}
                />
              ))}
            </>
          ) : (
            <h1>{error}</h1>
          )}
        </StackGrid>
      </Container80>
    </div>
  );
};

export default Memes;
