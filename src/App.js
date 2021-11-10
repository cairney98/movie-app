import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/NavBar";
import Movie from "./components/Movie";
import Person from "./components/Person";

function App() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<Movie />} />
        <Route path="/people/:personId" element={<Person />} />
      </Routes>
    </main>
  );
}

export default App;
