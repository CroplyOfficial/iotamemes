import React, { useEffect } from 'react';
import Container80 from '../../components/Container80/Container80';
import Memes from '../../components/Memes/Memes';
import { useDispatch } from 'react-redux';
import { getLikedMemes } from '../../actions/userActions';

const MemesPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLikedMemes());
  }, [dispatch]);

  return <Memes />;
};

export default MemesPage;
