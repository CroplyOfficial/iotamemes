import { useEffect, useState } from 'react';
import Container80 from '../../components/Container80/Container80';
import Card from '../../components/Card/Card';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import './MemePage.css';
import {
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'react-share';

import { FacebookIcon, RedditIcon, TwitterIcon } from 'react-share';

const MemePage = ({ match }: any) => {
  const [loading, setLoading] = useState(true);
  const [meme, setMeme]: any = useState();
  const [artist, setArtist]: any = useState();

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const getMeme = async () => {
    const meme_received: any = await axios.get(
      `/api/memes/${match.params.id}`,
      config
    );
    setMeme(meme_received.data);
    const user_received = await axios.get(
      `/api/users/${meme_received.data.memeAuthor}`,
      config
    );
    setArtist(user_received.data);
    setLoading(false);
  };

  useEffect(() => {
    getMeme();
  }, []);

  return (
    <Container80>
      <Card>
        {loading ? (
          <Loader />
        ) : meme && artist ? (
          <div className='memePage'>
            <div className='artist'>
              <img src={artist.avatar} alt={artist.username} />
              <div className='username'>{artist.username}</div>
            </div>
            <img src={meme.imgURL} className='meme-img' />
            <div className='tags'>
              {meme &&
                meme.memeTags.map((tag: string) => (
                  <span className='tag'>#{tag} </span>
                ))}
            </div>
            <div className='share'>
              <div className='meme-share-icon'>
                <FacebookShareButton url={window.location.href}>
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
              </div>
              <div className='meme-share-icon'>
                <TwitterShareButton url={window.location.href}>
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
              </div>
              <div className='meme-share-icon'>
                <RedditShareButton url={window.location.href}>
                  <RedditIcon size={32} round={true} />
                </RedditShareButton>
              </div>
            </div>
          </div>
        ) : (
          <div className='message'>Unable to load meme </div>
        )}
      </Card>
    </Container80>
  );
};

export default MemePage;
