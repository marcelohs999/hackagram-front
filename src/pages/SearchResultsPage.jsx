import React, { useEffect, useState } from "react";
import { useParams } from "react";
import { searchImageService } from "../services";

const SearchResultsPage = () => {
  const { searchText } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const searchResults = await searchImageService({
          post_text: searchText,
        });
        setResults(searchResults);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSearchResults();
  }, [searchText]);

  return (
    <div>
      <h2>Resultados de búsqueda: {searchText}</h2>
      {results.map((result) => (
        <div key={result.id}>
          <img src={result.imageURL} alt={result.title} />
          <p>{result.title}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsPage;
