import React from "react";
import { createTheme } from '@mui/material/styles';
import { teal, green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { Routes, Route, NavLink, HashRouter } from 'react-router-dom';
import Home from "./Home";
import ResultsTvShow from "./results/ResultsTvShow";
import DetailsTvShow from "./details/DetailsTvShow";
import ShowImg from "./details/ShowImg";
import DetailsActor from "./details/DetailsActor";
import ResultsTvActors from "./results/ResultsTvActors";
import MainSearch from "./search/MainSearch";
import TvShowOnClick from "./details/TvShowOnClick";
import MovieYts from "./movies/MovieYts";
import MovieDetails from "./movies/MovieDetails";
import MovieDetails2 from "./movies/MovieDetails2";
import MovieRes from "./movies/MovieRes";
import MovieYtsCateg from "./movies/MovieYtsCateg";
import MovieRating from "./movies/MovieRating";
import MovieYear from "./movies/MovieYear";
import FreeMoviesImg from "./movies/FreeMoviesImg";
import Quotes from "./details/Quotes";
import ResultsOnClickTvShow from "./results/ResultsOnClickTvShow";

const theme = createTheme({
  palette: {
    primary: green,
    secondary: teal,
  },
});

const Navigation = () => {

  var today = new Date
  var year = today.getFullYear();

  return (
    <>
      <HashRouter
        basename="/">
        <div className="provider">
          <div className="fixed">
            <NavLink to="/">
              <Button variant="contained" sx={{ ml: 2 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                TV Show</Button >
            </NavLink>
            <NavLink to="/movie">
              <Button variant="contained" sx={{ ml: 2 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                EZTV </Button>
            </NavLink>
            <NavLink to="/search">
              <Button variant="contained" sx={{ ml: 2 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Search</Button>
            </NavLink>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<MainSearch />} />
          <Route path="/tvShow" element={<ResultsTvShow />} />
          <Route path="/showDetails/:showId" element={<DetailsTvShow />} />
          <Route path="/imgShow/:images" element={<ShowImg />} />
          <Route path="/actorDetails/:actorId" element={<DetailsActor />} />
          <Route path="/showClick/:showId" element={<TvShowOnClick />} />
          <Route path="/movie" element={<MovieYts />} />
          <Route path="/movieDetails/:numId" element={<MovieDetails />} />
          <Route path="/seriesDetails/:showName" element={<ResultsOnClickTvShow />} />
          <Route path="/movieDetails2/:numId" element={<MovieDetails2 />} />
          <Route path="/movies" element={<MovieRes />} />
          <Route path="/categ/:genre" element={<MovieYtsCateg />} />
          <Route path="/rating" element={<MovieRating />} />
          <Route path="/year" element={<MovieYear />} />
          <Route path="/moviePicture/:images" element={<FreeMoviesImg />} />
          <Route path="/quotes" element={<Quotes />} />
        </Routes>
      </HashRouter>

      <div className="footer">
        <hr></hr>
        <p>Data base from TvMaze, OMDb, FreeMovies and EZTV</p>
        InTerVal &copy;{year}
      </div>
    </>
  )
}
export default Navigation;