import React, { useState, useEffect, Suspense, lazy } from "react";
import Container80 from "../../components/Container80/Container80";
import axios from "axios";
import StackGrid from "react-stack-grid";
import {
  faArrowDown,
  faArrowUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//@ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
const Artist = lazy(() => import("./Artist/Artist"));

const Artists = () => {
  const [filtered, setFiltered] = useState([]);
  const [artists, setArtists] = useState([]);

  const filterArtists = async (e: any) => {
    setFiltered(
      artists.filter((artist: any) => artist.username.includes(e.target.value))
    );
  };

  useEffect(() => {
    const getArtists = async () => {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.get("/api/users", config);
      setFiltered(data);
      setArtists(data);
    };
    getArtists();
  }, []);
  return (
    <>
      <div
        className="search-container"
        style={{ justifyContent: "center", marginTop: "15px" }}
      >
        <div className="control has-icons-right">
          <input
            type="text"
            className="input is-rounded meme-search"
            placeholder="Search Artists"
            style={{ width: "65vw" }}
            onKeyUp={filterArtists}
          />
          <span className="icon is-small is-right">
            <FontAwesomeIcon icon={faSearch} />
            {/* <i className="fas fa-envolope"></i> */}
          </span>
        </div>
      </div>

      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1080: 4 }}
      >
        <Masonry>
          {filtered.map((artist: any) => (
            <Suspense key={artist.id} fallback={<div>loading...</div>}>
              <Artist
                username={artist.username}
                upvotes={artist.upvotes}
                bio={artist.bio}
                avatar={artist.avatar}
                // key={artist.id}
                totalMemes={artist.totalMemes}
                id={artist.id}
              />
            </Suspense>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {/* <StackGrid columnWidth={290} monitorImagesLoaded={true}>
          {filtered.map((artist: any) => (
            <Artist
              username={artist.username}
              upvotes={artist.upvotes}
              bio={artist.bio}
              avatar={artist.avatar}
              key={artist.id}
              totalMemes={artist.totalMemes}
              id={artist.id}
            />
          ))}
        </StackGrid> */}
    </>
  );
};

export default Artists;
