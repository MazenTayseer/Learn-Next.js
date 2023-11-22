"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [posts, setPosts] = useState([]);

  const filterPostsByTag = (searchTag) => {
    const filteredResults = posts.filter((post) =>
      post.tag.toLowerCase().includes(searchTag.toLowerCase())
    );

    return filteredResults;
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    setTimeout(() => {
      const searchResults = filterPostsByTag(e.target.value);
      setSearchedResults(searchResults);
    }, 300);
  };

  const handleTagClick = (tagName) => {
    tagName = String(tagName).substring(1);
    setSearchText(tagName);

    const searchResults = filterPostsByTag(tagName);
    setSearchedResults(searchResults);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
