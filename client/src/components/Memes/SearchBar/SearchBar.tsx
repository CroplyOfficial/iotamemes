import { useState, useEffect } from 'react';
import {
  faArrowDown,
  faArrowUp,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Link } from 'react-router-dom';
import './SearchBar.css';
import IotaButton from '../../IotaButton/IotaButton';

export const SearchBar = ({ memes, setMemes, showMeme, children }: any) => {
  const [sortMethod, setSortMethod]: any = useState();
  const [searchTag, setSearchTag]: any = useState();

  const userLogin: any = useSelector((state: RootState) => state.userLogin);
  const isLoggedIn = userLogin && userLogin.userInfo;


  const filterByTag = async (e: any) => {
    setSearchTag(e.target.value);
    const filtered = await memes.filter((meme: any) =>
      JSON.stringify(meme.memeTags).includes(e.target.value)
    );
    setMemes(filtered);
  };

  // sort by oldest
  const sortByOldest = async () => {
    let memesToFilter = memes;
    await memesToFilter.sort((a: any, b: any) => { return new Date(a.uploaded).valueOf() - new Date(b.uploaded).valueOf(); })
    memesToFilter = memesToFilter.length > 1 ? memesToFilter.slice(0, memesToFilter.length - 1) : memesToFilter;
    setMemes(memesToFilter);
  }

  // sort by newest
  const sortByNewest = async () => {
    let memesToFilter = memes;
    await memesToFilter.sort((a: any, b: any) => { return new Date(b.uploaded).valueOf() - new Date(a.uploaded).valueOf(); })
    memesToFilter = memesToFilter.length > 1 ? memesToFilter.slice(0, memesToFilter.length - 1) : memesToFilter;
    setMemes(memesToFilter);
  }

  // sort by most popular
  const sortByUpvotes = async () => {
    let memesToFilter = memes;
      await memesToFilter.sort((a: any, b: any) => { return b.upvotes - a.upvotes })
    memesToFilter = memesToFilter.length > 1 ? memesToFilter.slice(0, memesToFilter.length - 1) : memesToFilter;
    setMemes(memesToFilter);
  }

  useEffect(() => {
    switch (sortMethod) {
      case 'newest':
        sortByNewest();
        return;
      case 'oldest':
        sortByOldest();
        return;
      case 'upvoted':
        sortByUpvotes();
        return;
    }
  }, [sortMethod])

  return (
    <nav className='search-container'>
      {isLoggedIn ? (
        <>
        {showMeme ? (
        <Link to="/newmeme">
          <button className="uploadMeme">+ NEW MEME</button>
        </Link>) : (
            {children}
        )}
        </>
      ) : (
        <Link to="/about">
            <IotaButton address="iota1qplr8pw4tu24jdagkleqvp28rwsdfhx9cgcuaxvjaz5zd9gx9u50vg2v7md" text='Donate to IOTA Memes' style={{borderRadius: '25px'}} />
        </Link>
      )}
      <div className='control has-icons-right'>
        <input
          type='text'
          className='input is-rounded meme-search'
          placeholder='Search for memes'
          onKeyUp={filterByTag}
        />
        <span className='icon is-small is-right'>
          <FontAwesomeIcon icon={faSearch} />
          {/* <i className="fas fa-envolope"></i> */}
        </span>
      </div>
      <select className="meme-select" onChange={(e: any) => { setSortMethod(e.target.value) }} defaultValue="newest">
        <option value='newest'>Newest</option>
        <option value='oldest'>Oldest</option>
        <option value='upvoted'>Most Popular</option>
      </select>
    </nav>
  );
};

SearchBar.defaultProps = {
    showMeme: true
}
