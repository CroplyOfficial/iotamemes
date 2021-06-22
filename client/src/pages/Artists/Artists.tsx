import React, { useState, useEffect } from 'react';
import Container80 from '../../components/Container80/Container80';
import Artist from './Artist/Artist';
import axios from 'axios';
import StackGrid from 'react-stack-grid';

const Artists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const getArtists = async () => {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.get('/api/users', config);
      setArtists(data);
    };

    getArtists();
  }, []);
  return (
    <Container80>
      <StackGrid columnWidth={300} monitorImagesLoaded={true}>
        {artists.map((artist: any) => (
          <Artist
            username={artist.username}
            upvotes={artist.upvotes}
            bio={artist.bio}
            avatar={artist.avatar}
            key={artist.id}
            totalMemes={artist.totalMemes}
          />
        ))}
      </StackGrid>
    </Container80>
  );
};

export default Artists;
