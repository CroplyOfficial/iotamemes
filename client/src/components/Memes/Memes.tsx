import React, { useState, useEffect } from "react";
import axios from "axios";
import Meme from "./Meme/Meme";
import Container80 from "../Container80/Container80";
import StackGrid from "react-stack-grid";
import "./Memes.css";
import { SearchBar } from "./SearchBar/SearchBar";

const Memes = () => {
  const [memes, setMemes] = useState([]);

  const getMemes = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/memes", config);
    setMemes(data);
  };

  useEffect(() => {
    getMemes();
  }, []);

  return (
    <div className="container is-widescreen mt-5">
      <SearchBar />
      <StackGrid gutterWidth={25} gutterHeight={25} columnWidth={315}>
        {memes.map((meme: any) => (
          <Meme
            key={meme._id}
            memeAuthor={meme.memeAuthor}
            imgURL={meme.imgURL}
            upvotes={meme.upvotes}
            memeTags={meme.memeTags}
          />
        ))}
      </StackGrid>
    </div>
  );
};

export default Memes;
