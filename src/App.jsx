import React, { useContext, useState } from "react";
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
import SearchResultsPage from "./pages/SearchResultsPage";
import { NewPostPage } from "./pages/NewPostPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AuthContext } from "../context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div id="content-app">
      <Header />
      <main>
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {user ? <Route path="/image" element={<NewPostPage />} /> : null}
          <Route path="/user" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user/:username" element={<PostPage />} />
          <Route path="/p/:post_image" element={<SinglePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          {user ? <Route path="/profile" element={<ProfilePage />} /> : null}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
