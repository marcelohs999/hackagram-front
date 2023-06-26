import React, { useState } from "react";
import { Header } from "./component/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Footer } from "./component/Footer";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { PostPage } from "./pages/PostsPage";
import { NotFound } from "./pages/NotFound";
import { RegisterPage } from "./pages/RegisterPage";
import { SinglePage } from "./pages/SinglePage";
import Sidebar from "./component/Sidebar";
import "./App.css";
import { searchImageService } from "./services";
import SearchResultsPage from "./pages/SearchResultsPage";
import { NewPostPage } from "./pages/NewPostPage";

function App() {
  //TEST-INICIAL
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  //FIN
  //TEST-SIGUE
  const handleSearch = async (postText) => {
    try {
      const searchData = await searchImageService({ post_text: postText });
      setSearchResults(searchData);
      navigate("/image");
    } catch (error) {
      console.error(error);
    }
  };
  //FIN
  return (
    <>
      <main>
        <Header onSearch={handleSearch} />
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/image" element={<NewPostPage />} />
          <Route path="/user" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user/:username" element={<PostPage />} />
          <Route path="/p/:post_image" element={<SinglePage />} />
          <Route path="/search/:post_text" element={<SearchResultsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </main>
    </>
  );
}

export default App;
