import { useEffect, useState } from "react";
import { moviesApi } from "../../api/movies.api";
import type { Movie } from "../../types/Movies";
import Loader from "../../ui/Loader/Loader";
import "./TopMovies.scss";
import FilmCard from "../../ui/FilmCard/FilmCard";

const TopMovies = () => {
  const [topFilms, setTopFilms] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTopMovies = async () => {
    setIsLoading(true);
    try {
      const response = await moviesApi.getTopMovies();
      setTopFilms(response);
    } catch (error) {
      throw new Error(`Failed to fetch movies: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopMovies();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <section className="top-movies">
      <div className="container">
        <h2 className="top-movies__title">Top 10 films</h2>
        <div className="top-movies__wrapper">
          <ul className="top-movies__list">
            {topFilms.map((film, index) => (
              <li className="top-movies__item" key={film.id}>
                <FilmCard film={film} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TopMovies;
