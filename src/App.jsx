// import { useState } from "react";
import React from "react";
import { Header } from "./component/Header";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Footer } from "./component/Footer";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { PostPage } from "./pages/PostsPage";
import { NotFound } from "./pages/NotFound";
import { RegisterPage } from "./pages/RegisterPage";
import { SinglePage } from "./pages/SinglePage";
// import usePosts from "./hooks/usePosts";

function App() {
  // const { addPost } = usePosts();

  return (
    <>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user/:username" element={<PostPage />} />
          <Route path="/p/:post_image" element={<SinglePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </main>
    </>
  );
}

export default App;
