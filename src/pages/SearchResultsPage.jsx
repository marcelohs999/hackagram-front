import React, { useEffect, useState } from "react";
import { searchImageService } from "../services";
import { useSearchParams } from "react-router-dom";
import { PostList } from "../component/PostList";
import "./styles/SearchResultsPage.css";

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const initialSearch =
    searchParams.get("post_text") || searchParams.get("username") || "";
  const [search, setSearch] = useState(initialSearch);
  const [filterBy, setFilterBy] = useState(
    searchParams.get("username") && !searchParams.get("post_text")
      ? "users"
      : "posts"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUrlSearchParams = {};
    if (filterBy === "posts") {
      currentUrlSearchParams.post_text = search;
    } else {
      currentUrlSearchParams.username = search;
    }
    setSearchParams(new URLSearchParams(currentUrlSearchParams));
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  console.log(searchParams.get("post_text"));
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (filterBy === "posts") {
          if (!searchParams.get("post_text")) {
            setResults([]);
            return;
          }

          const searchResults = await searchImageService({
            post_text: searchParams.get("post_text"),
          });
          setResults(searchResults);
        } else {
          if (!searchParams.get("username")) {
            setResults([]);
            return;
          }
          // const searchResults = await searchUserService({
          //   username: searchParams.get("username"),
          // });
          // setResults(searchResults);
        }
      } catch (error) {
        setResults([]);
        console.error(error);
      }
    };
    fetchSearchResults();
  }, [searchParams]);
  console.log(results);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">¿Qué quieres buscar?</label>
        <input
          value={search}
          type="search"
          id="search"
          name="search"
          onChange={handleChange}
        />
        <button>Filtrar</button>
      </form>
      <button
        className={filterBy === "posts" ? "btnActive" : ""}
        onClick={() => setFilterBy("posts")}
      >
        Posts
      </button>
      <button
        className={filterBy === "users" ? "btnActive" : ""}
        onClick={() => setFilterBy("users")}
      >
        Usuarios
      </button>
      <h2>Resultados de búsqueda</h2>
      <PostList posts={results} />
      {/* {filterBy === "posts" ? <PostList posts={results} /> : UserList CREAR} */}
    </div>
  );
};

export default SearchResultsPage;
