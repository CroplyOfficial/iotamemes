import Card from '../../../components/Card/Card';
import './Artist.css';

const Artist = ({ username, avatar, bio, upvotes, totalMemes }: any) => {
  return (
    <div className='artist'>
      <Card>
        <img src={avatar} className='avatar' />
        <div className='username'>{username}</div>
        <div className='userMeta'>
          {upvotes} Likotas - {totalMemes} Memes
        </div>
        <p className='bio'>{bio}</p>
      </Card>
    </div>
  );
};

export default Artist;
