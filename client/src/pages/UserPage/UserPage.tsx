import Container80 from '../../components/Container80/Container80';
import axios from 'axios';
import { useState, useEffect } from 'react'
import Loader from '../../components/Loader/Loader';
import Meme from '../../components/Memes/Meme/Meme';
import StackGrid from 'react-stack-grid';
import './UserPage.css'

const UserPage = ({ match }: any) => {
  const [memeLoading, setMemeLoading]: any = useState(true);
  const [userLoading, setUserLoading]: any = useState(true);
  const [memes, setMemes]: any = useState(null);
  const [user, setUser]: any = useState(null);

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const getUserMemes = async () => {
    const { data } = await axios.get(`/api/users/${match.params.id}/memes`, config);
    setMemes(data);
    setMemeLoading(false);
  };

  const getUserData = async () => {
    const { data } = await axios.get(`/api/users/${match.params.id}`, config);
    setUser(data);
    setUserLoading(false);
  }

  useEffect(() => {
    getUserMemes();
    getUserData();
  }, []);

  return (
    <Container80>
      {memeLoading ? (
        <Loader />
        ) : (
        <>
          { userLoading ? (
              <Loader />
            ) : (
              <div className="user-center">
                <div className="userData">
                  <img src={user.avatar} />
                  <div className="userInfo">
                    <h2>{user.username}</h2>
                    <div className="userMeta">{user.upvotes} Likotas - {user.totalMemes} Total Memes</div>
                    <p>{user.bio}</p>
                  </div>
                </div>
              </div>
            )}
          <StackGrid columnWidth={300} monitorImagesLoaded={true}>
            {memes.map((meme: any) => (
              <Meme
                id={meme._id}
                key={meme._id}
                memeAuthor={meme.memeAuthor}
                imgURL={meme.imgURL}
                upvotes={meme.upvotes}
                memeTags={meme.memeTags}
              />
            ))}
          </StackGrid>
        </>
      )} 
    </Container80>
  ); 
};

export default UserPage;
