import { useEffect, useState } from "react";
import { moviesApi } from "../../api/movies.api";
import type { Movie } from "../../types/Movies";
import Loader from "../../ui/Loader/Loader";
import "./TopMovies.scss";
import { useNavigate } from "react-router-dom";

const TopMovies = () => {
  const [topFilms, setTopFilms] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleMovieClick = async (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  useEffect(() => {
    fetchTopMovies();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <section className="top-movies">
      <div className="container">
        <h2 className="top-movies__title">Топ 10 фильмов</h2>
        <div className="top-movies__wrapper">
          <ul className="top-movies__list">
            {topFilms.map((film, index) => (
              <li className="top-movies__item" key={film.id}>
                <div
                  className="top-movies__card"
                  onClick={() => handleMovieClick(film.id)}
                >
                  <span className="top-movies__card-index">{++index}</span>
                  <img
                    className="top-movies__card-poster"
                    src={film.posterUrl}
                    alt={film.title}
                    loading="lazy"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TopMovies;
