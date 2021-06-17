import React, { useState, useEffect } from 'react';
import Card from '../../Card/Card';
import axios from 'axios';
import './Meme.css';

const Meme = ({ imgURL, memeAuthor, memeTags, upvotes }: any) => {
  const [user, setUser] = useState({
    avatar: '',
    username: '',
  });

  useEffect(() => {
    const getUser = async (userId: string) => {
      const { data }: any = await axios.get(`/api/users/${userId}`);
      setUser(data);
    };

    getUser(memeAuthor);
  }, [memeAuthor]);

  return (
    <div className='meme'>
      <Card>
        <div className='memeAuthor'>
          <img src={user.avatar} className='avatar' />
          <h1 className='username'>{user.username}</h1>
        </div>
        <div className='meme-img'>
          <img src={imgURL} />
        </div>
        <div className='meta'>
          <div className='tags'>
            {memeTags.length > 0 &&
              memeTags.map((tag: string) => <p key={tag}>#{tag}</p>)}
          </div>
          <div className='bottom'>
            <div className='likes'>{upvotes} LIKOTAS</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Meme;
