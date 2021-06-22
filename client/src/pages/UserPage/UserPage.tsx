import Container80 from '../../components/Container80/Container80';
import axios from 'axios';
import { useState, useEffect } from 'react'
import Loader from '../../components/Loader/Loader';
import Meme from '../../components/Memes/Meme/Meme';
import StackGrid from 'react-stack-grid';

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
    setMemeLoading(false)
  };

  const getUserData = async () => {
    const { data } = await axios.get(`/api/users/${match.params.id}`, config);
    setUser(data)
  }

  useEffect(() => {
    getUserMemes();
  }, []);

  return (
    <Container80>
      {memeLoading ? (
        <Loader />
        ) : (
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
      )} 
    </Container80>
  ); 
};

export default UserPage;
