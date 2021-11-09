import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
      <div>
        Home! <br />
        <Link to="/movies">Movies</Link>
      </div>
    );
}

export default Home
