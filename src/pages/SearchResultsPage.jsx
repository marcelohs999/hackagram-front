import { useEffect, useState } from "react";
import { searchImageService, searchUserService } from "../services";
import { useSearchParams } from "react-router-dom";
import { PostList } from "../component/PostList";
import { UserList } from "../component/UserList";

import "./styles/SearchResultsPage.css";
import { SearchPostList } from "../component/SearchPostList";

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

  const handleFilterClick = (filter) => {
    setSearch("");
    setFilterBy(filter);
    setSearchParams("");
  };

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
          const searchResults = await searchUserService({
            username: searchParams.get("username"),
          });
          setResults(searchResults);
        }
      } catch (error) {
        setResults([]);
        console.error(error);
      }
    };
    fetchSearchResults();
  }, [searchParams]);

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">¿Qué quieres buscar?</label>
        <input
          value={search}
          type="search"
          id="search"
          name="search"
          onChange={handleChange}
        />
        <button className="filter">Filtrar</button>
      </form>
      <button
        className={filterBy === "posts" ? "btnActive" : ""}
        onClick={() => handleFilterClick("posts")}
      >
        Posts
      </button>
      <button
        className={filterBy === "users" ? "btnActive" : ""}
        onClick={() => handleFilterClick("users")}
      >
        Usuarios
      </button>
      <h2>
        Resultados de búsqueda:{" "}
        {filterBy === "posts" && searchParams.get("post_text") && (
          <span className="search-params">{searchParams.get("post_text")}</span>
        )}
        {filterBy === "users" && searchParams.get("username") && (
          <span>{searchParams.get("username")}</span>
        )}
      </h2>
      {filterBy === "posts" ? (
        <SearchPostList posts={results} />
      ) : (
        <UserList username={results} />
      )}
    </div>
  );
};

export default SearchResultsPage;
