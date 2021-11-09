import React from "react";
import { Routes, Route } from "react-router-dom";
import Movies from "./components/Movies";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/NavBar";

function App() {
  return (
    <main>
      <Nav  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies" element={<Movies />} />
      </Routes>
    </main>
  );
}

export default App;
