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
import { useSelector } from 'react-redux';
import Modal from '../../components/Modal/Modal';
import IotaButton from '../../components/IotaButton/IotaButton';

import { FacebookIcon, RedditIcon, TwitterIcon } from 'react-share';
import { RootState } from '../../store';

const MemePage = ({ match }: any) => {
  const [loading, setLoading] = useState(true);
  const [meme, setMeme]: any = useState();
  const [artist, setArtist]: any = useState();
  const [visible, setVisible]: any = useState(false);
  const [message, setMessage]: any = useState('flagging meme');

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

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userLogin ? userLogin : null;

  /* -------------------- flagging stuff -------------------- */

  const flagMeme = async () => {
    if (userInfo) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInfo.token}`
        }
      }
      try {
        const flag = await axios.post('/api/flags', { memeId: match.params.id }, config)
        setVisible(true);
        setMessage('Reported meme successfully :)')
      } catch (error) {
        setVisible(true)
        setMessage("unable to create new report for this meme, this probably means that you have already reported this meme") 
      }
    } else {
      setVisible(true);
      setMessage('You need to log in to report a meme');
    }
  }

  /* ------------------ end flagging stuff ------------------ */

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

            <Modal visible={visible} setVisible={setVisible}>
              {message}
            </Modal>

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
            <div className='iotaButton'>
              <IotaButton address={artist.wallet} />
            </div>
            <div className="bottomMeme">
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
                <img
                  src="/images/flag.svg" 
                  onClick={flagMeme} 
                  style={{height: '30px', marginLeft: '30px'}}
                />
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
