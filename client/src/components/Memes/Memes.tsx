import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Meme from './Meme/Meme';
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
  );
};

export default Memes;
