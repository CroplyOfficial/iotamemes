import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Meme from './Meme/Meme';
import Container80 from '../Container80/Container80';
import './Memes.css';

const Memes = () => {
  const [memes, setMemes] = useState([]);

  const getMemes = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get('/api/memes', config);
    setMemes(data);
  };

  useEffect(() => {
    getMemes();
  }, []);

  return (
    <Container80>
      <div className='memes'>
        {memes.map((meme: any) => (
          <Meme
            key={meme._id}
            memeAuthor={meme.memeAuthor}
            imgURL={meme.imgURL}
            upvotes={meme.upvotes}
            memeTags={meme.memeTags}
          />
        ))}
      </div>
    </Container80>
  );
};

export default Memes;
