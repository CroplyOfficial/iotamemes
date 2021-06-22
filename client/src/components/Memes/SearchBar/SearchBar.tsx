import { useState } from 'react';
import {
  faArrowDown,
  faArrowUp,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SearchBar = ({ memes, setMemes }: any) => {
  const [searchTag, setSearchTag]: any = useState();

  const handleClickDown = async () => {
    console.log('asdf');
    let memesToFilter = memes;
    await memesToFilter.sort((a: any, b: any) => a.upvotes - b.upvotes);
    memesToFilter =
      memesToFilter.length > 0
        ? memesToFilter.slice(0, memesToFilter.length - 1)
        : memesToFilter;
    setMemes(memesToFilter);
  };
  const handleClickUp = async () => {
    console.log('asdf');
    let memesToFilter = memes;
    await memesToFilter.sort((a: any, b: any) => b.upvotes - a.upvotes);
    memesToFilter =
      memesToFilter.length > 0
        ? memesToFilter.slice(0, memesToFilter.length - 1)
        : memesToFilter;
    setMemes(memesToFilter);
  };

  const filterByTag = async (e: any) => {
    setSearchTag(e.target.value);
    const filtered = await memes.filter((meme: any) =>
      JSON.stringify(meme.memeTags).includes(e.target.value)
    );
    setMemes(filtered);
  };

  return (
    <nav className='level is-mobile'>
      <p className='level-item has-text-centered'>
        <a className='link is-info'></a>
      </p>
      <p className='level-item has-text-centered'>
        <div className='field'>
          <div className='control has-icons-right'>
            <input
              type='text'
              className='input is-rounded'
              placeholder='Search for memes'
              onKeyUp={filterByTag}
            />
            <span className='icon is-small is-right'>
              <FontAwesomeIcon icon={faSearch} />
              {/* <i className="fas fa-envolope"></i> */}
            </span>
          </div>
        </div>
      </p>
      <p className='level-item has-text-centered'>
        <span className='has-text-white mr-5'>order by </span>
        <FontAwesomeIcon
          icon={faArrowUp}
          className='mr-1'
          onClick={handleClickUp}
        />
        <FontAwesomeIcon icon={faArrowDown} onClick={handleClickDown} />
      </p>
    </nav>
  );
};
